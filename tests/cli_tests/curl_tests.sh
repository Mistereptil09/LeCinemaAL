#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd -- "$SCRIPT_DIR/../.." && pwd)"
COMPOSE_FILE="${COMPOSE_FILE:-$ROOT_DIR/docker/docker-compose.yaml}"
LIST_ROUTES="${LIST_ROUTES:-1}"

# 0) Voir la table de routes enregistrées par Adonis
if [ "$LIST_ROUTES" = "1" ]; then
  if ! docker compose -f "$COMPOSE_FILE" exec api node ace list:routes; then
    echo "Impossible d'afficher les routes via docker. Continue sans cette étape."
  fi
fi

if ! command -v jq >/dev/null 2>&1; then
  echo "jq est requis pour ce script."
  exit 1
fi

# 1) Prépare variables
BASE="${BASE:-http://localhost:3333}"
PREFIX="${PREFIX:-/api/v1}" # adapte si APP_VERSION != 1
KEEP_DATA="${KEEP_DATA:-1}" # 1 = conserve les données créées, 0 = supprime en fin de script
NOW="$(date +%s)"
USER_EMAIL="user+$NOW@test.com"
USER_PASS="Password123!"
ADMIN_EMAIL="${ADMIN_EMAIL:-admin@test.com}" # doit déjà exister côté DB
ADMIN_PASS="${ADMIN_PASS:-Password123!}"
USER_TICKETS_COUNT="${USER_TICKETS_COUNT:-3}"
USER_TRANSACTIONS_COUNT="${USER_TRANSACTIONS_COUNT:-3}"
EXTRA_USERS_COUNT="${EXTRA_USERS_COUNT:-3}"
ROOMS_COUNT="${ROOMS_COUNT:-3}"
MOVIES_COUNT="${MOVIES_COUNT:-4}"
SCREENINGS_COUNT="${SCREENINGS_COUNT:-4}"

extract_token() {
  jq -r '.token.token // .token.value // .token // empty'
}

fail_if_empty() {
  local value="$1"
  local label="$2"
  local response="${3:-}"

  if [ -z "$value" ] || [ "$value" = "null" ]; then
    echo "Erreur: $label est vide."
    if [ -n "$response" ]; then
      echo "Réponse API:"
      printf '%s\n' "$response"
    fi
    exit 1
  fi
}

# 2) Routes publiques
curl -i "$BASE/"
curl -i "$BASE/swagger"
curl -i "$BASE/docs"

# 3) Auth (user)
curl -i -X POST "$BASE$PREFIX/auth/register" -H "Content-Type: application/json" \
  -d "{\"email\":\"$USER_EMAIL\",\"password\":\"$USER_PASS\",\"passwordConfirmation\":\"$USER_PASS\"}"

USER_LOGIN_RESPONSE="$(curl -s -X POST "$BASE$PREFIX/auth/login" -H "Content-Type: application/json" \
  -d "{\"email\":\"$USER_EMAIL\",\"password\":\"$USER_PASS\"}")"
USER_TOKEN="$(printf '%s' "$USER_LOGIN_RESPONSE" | extract_token)"
fail_if_empty "$USER_TOKEN" "USER_TOKEN" "$USER_LOGIN_RESPONSE"
echo "USER_TOKEN=$USER_TOKEN"

# 4) Auth (admin)
ADMIN_LOGIN_RESPONSE="$(curl -s -X POST "$BASE$PREFIX/auth/login" -H "Content-Type: application/json" \
  -d "{\"email\":\"$ADMIN_EMAIL\",\"password\":\"$ADMIN_PASS\"}")"
ADMIN_TOKEN="$(printf '%s' "$ADMIN_LOGIN_RESPONSE" | extract_token)"
echo "ADMIN_TOKEN=$ADMIN_TOKEN"

# 5) /auth protégées (refresh -> nouveau token)
REFRESH_RESPONSE="$(curl -s -X POST "$BASE$PREFIX/auth/refresh" \
  -H "Authorization: Bearer $USER_TOKEN")"
REFRESHED_USER_TOKEN="$(printf '%s' "$REFRESH_RESPONSE" | extract_token)"
fail_if_empty "$REFRESHED_USER_TOKEN" "REFRESHED_USER_TOKEN" "$REFRESH_RESPONSE"
echo "REFRESHED_USER_TOKEN=$REFRESHED_USER_TOKEN"
curl -i -X POST "$BASE$PREFIX/auth/logout" -H "Authorization: Bearer $REFRESHED_USER_TOKEN"

# Reconnexion user pour la suite des tests
USER_TOKEN="$(curl -s -X POST "$BASE$PREFIX/auth/login" -H "Content-Type: application/json" \
  -d "{\"email\":\"$USER_EMAIL\",\"password\":\"$USER_PASS\"}" | extract_token)"
fail_if_empty "$USER_TOKEN" "USER_TOKEN après reconnexion"

# 6) Routes user (auth requise)
curl -i "$BASE$PREFIX/users/me" -H "Authorization: Bearer $USER_TOKEN"
curl -i "$BASE$PREFIX/rooms" -H "Authorization: Bearer $USER_TOKEN"
curl -i "$BASE$PREFIX/movies" -H "Authorization: Bearer $USER_TOKEN"
curl -i "$BASE$PREFIX/screenings" -H "Authorization: Bearer $USER_TOKEN"
curl -i "$BASE$PREFIX/tickets/me" -H "Authorization: Bearer $USER_TOKEN"
curl -i "$BASE$PREFIX/transactions/me" -H "Authorization: Bearer $USER_TOKEN"

# Jeu de données user (plusieurs tickets + transactions)
declare -a USER_TRANSACTION_IDS=()
declare -a USER_TICKET_IDS=()

# --- 1. ON FAIT LES DÉPÔTS D'ABORD ---
for i in $(seq 1 "$USER_TRANSACTIONS_COUNT"); do
  USER_TRANSACTION_RESPONSE="$(curl -s -X POST "$BASE$PREFIX/transactions" \
    -H "Authorization: Bearer $USER_TOKEN" \
    -H "Content-Type: application/json" \
    -d "{\"type\":\"deposit\",\"amount\":\"$((i * 10 + 50)).00\",\"description\":\"Seed user tx $i\"}")"

  USER_TRANSACTION_ID="$(printf '%s' "$USER_TRANSACTION_RESPONSE" | jq -r '.data.id // .id // empty')"
  fail_if_empty "$USER_TRANSACTION_ID" "USER_TRANSACTION_ID[$i]" "$USER_TRANSACTION_RESPONSE"
  USER_TRANSACTION_IDS+=("$USER_TRANSACTION_ID")
done

# --- 2. ENSUITE, ON ACHÈTE LES BILLETS ---
for i in $(seq 1 "$USER_TICKETS_COUNT"); do
  USER_TICKET_RESPONSE="$(curl -s -X POST "$BASE$PREFIX/tickets" \
    -H "Authorization: Bearer $USER_TOKEN" \
    -H "Content-Type: application/json" \
    -d "{\"type\":\"standard\",\"remainingUses\":$((i % 3 + 1))}")"

  USER_TICKET_ID="$(printf '%s' "$USER_TICKET_RESPONSE" | jq -r '.data.id // .id // empty')"
  fail_if_empty "$USER_TICKET_ID" "USER_TICKET_ID[$i]" "$USER_TICKET_RESPONSE"
  USER_TICKET_IDS+=("$USER_TICKET_ID")
done

PRIMARY_TICKET_ID="${USER_TICKET_IDS[0]}"
fail_if_empty "$PRIMARY_TICKET_ID" "PRIMARY_TICKET_ID"
echo "PRIMARY_TICKET_ID=$PRIMARY_TICKET_ID"

# 7) Tests admin (si login admin disponible)
if [ -z "$ADMIN_TOKEN" ] || [ "$ADMIN_TOKEN" = "null" ]; then
  echo "ADMIN_TOKEN absent: sections admin ignorées (users CRUD, movies CRUD, screenings, transactions, stats)."
  echo "Astuce: export ADMIN_EMAIL='...' ADMIN_PASS='...' avec un compte admin existant pour insérer ces données."
  exit 0
fi

# /users (admin)
curl -i "$BASE$PREFIX/users" -H "Authorization: Bearer $ADMIN_TOKEN"
curl -i "$BASE$PREFIX/users/me" -H "Authorization: Bearer $ADMIN_TOKEN"

declare -a ADMIN_CREATED_USER_IDS=()
for i in $(seq 1 "$EXTRA_USERS_COUNT"); do
  ADMIN_CREATED_USER_RESPONSE="$(curl -s -X POST "$BASE$PREFIX/users" \
    -H "Authorization: Bearer $ADMIN_TOKEN" \
    -H "Content-Type: application/json" \
    -d "{\"firstName\":\"Api$i\",\"lastName\":\"User$i\",\"email\":\"admin-created+$NOW-$i@test.com\",\"password\":\"Password123!\",\"role\":\"client\",\"balance\":\"$((i * 15)).00\"}")"
  ADMIN_CREATED_USER_ID="$(printf '%s' "$ADMIN_CREATED_USER_RESPONSE" | jq -r '.data.id // .id // empty')"
  fail_if_empty "$ADMIN_CREATED_USER_ID" "ADMIN_CREATED_USER_ID[$i]" "$ADMIN_CREATED_USER_RESPONSE"
  ADMIN_CREATED_USER_IDS+=("$ADMIN_CREATED_USER_ID")
done

TARGET_USER_ID="${ADMIN_CREATED_USER_IDS[0]}"
fail_if_empty "$TARGET_USER_ID" "TARGET_USER_ID"
echo "TARGET_USER_ID=$TARGET_USER_ID"

curl -i "$BASE$PREFIX/users/$TARGET_USER_ID" -H "Authorization: Bearer $ADMIN_TOKEN"
curl -i -X PUT "$BASE$PREFIX/users/$TARGET_USER_ID" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"firstName\":\"Updated\",\"lastName\":\"User\",\"email\":\"updated-user+$NOW@test.com\",\"password\":\"Password123!\",\"role\":\"client\",\"balance\":\"10.00\"}"
curl -i -X PATCH "$BASE$PREFIX/users/$TARGET_USER_ID" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"lastName":"Patched"}'

# /rooms (admin)
declare -a ROOM_IDS=()
for i in $(seq 1 "$ROOMS_COUNT"); do
  ROOM_RESPONSE="$(curl -s -X POST "$BASE$PREFIX/rooms" \
    -H "Authorization: Bearer $ADMIN_TOKEN" \
    -H "Content-Type: application/json" \
    -d "{\"name\":\"Room API $i\",\"type\":\"standard\",\"capacity\":$((18 + i * 2)),\"description\":\"Room $i from curl tests\",\"hasDisabledAccess\":true,\"isUnderMaintenance\":false}")"
  ROOM_ID="$(printf '%s' "$ROOM_RESPONSE" | jq -r '.data.id // .id // empty')"
  fail_if_empty "$ROOM_ID" "ROOM_ID[$i]" "$ROOM_RESPONSE"
  ROOM_IDS+=("$ROOM_ID")
done

PRIMARY_ROOM_ID="${ROOM_IDS[0]}"
echo "PRIMARY_ROOM_ID=$PRIMARY_ROOM_ID"
curl -i "$BASE$PREFIX/rooms/$PRIMARY_ROOM_ID" -H "Authorization: Bearer $ADMIN_TOKEN"
curl -i "$BASE$PREFIX/rooms/$PRIMARY_ROOM_ID/schedule" -H "Authorization: Bearer $ADMIN_TOKEN"

# Modifié: Capacité valide (25) pour respecter la contrainte (15 <= capacity <= 30)
curl -i -X PUT "$BASE$PREFIX/rooms/$PRIMARY_ROOM_ID" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Room API Updated","type":"vip","capacity":25,"description":"Updated room","hasDisabledAccess":true,"isUnderMaintenance":false}'

# Désactivé: La route PATCH rooms/:id n'existe pas et forçait une capacité invalide de 40
# curl -i -X PATCH "$BASE$PREFIX/rooms/$PRIMARY_ROOM_ID" \
#   -H "Authorization: Bearer $ADMIN_TOKEN" \
#   -H "Content-Type: application/json" \
#   -d '{"capacity":40}'

curl -i -X PATCH "$BASE$PREFIX/rooms/$PRIMARY_ROOM_ID/maintenance" -H "Authorization: Bearer $ADMIN_TOKEN"

# /movies (admin)
declare -a MOVIE_IDS=()
for i in $(seq 1 "$MOVIES_COUNT"); do
  MOVIE_RESPONSE="$(curl -s -X POST "$BASE$PREFIX/movies" \
    -H "Authorization: Bearer $ADMIN_TOKEN" \
    -H "Content-Type: application/json" \
    -d "{\"title\":\"Movie API $i\",\"description\":\"Movie $i from curl tests\",\"director\":\"Director API\",\"duration\":$((90 + i * 10)),\"minAge\":12}")"
  MOVIE_ID="$(printf '%s' "$MOVIE_RESPONSE" | jq -r '.data.id // .id // empty')"
  fail_if_empty "$MOVIE_ID" "MOVIE_ID[$i]" "$MOVIE_RESPONSE"
  MOVIE_IDS+=("$MOVIE_ID")
done

PRIMARY_MOVIE_ID="${MOVIE_IDS[0]}"
echo "PRIMARY_MOVIE_ID=$PRIMARY_MOVIE_ID"
curl -i "$BASE$PREFIX/movies/$PRIMARY_MOVIE_ID" -H "Authorization: Bearer $ADMIN_TOKEN"
curl -i "$BASE$PREFIX/movies/$PRIMARY_MOVIE_ID/schedule" -H "Authorization: Bearer $ADMIN_TOKEN"
curl -i -X PUT "$BASE$PREFIX/movies/$PRIMARY_MOVIE_ID" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Movie API Updated","description":"Updated movie","director":"Director API","duration":125,"minAge":14}'
curl -i -X PATCH "$BASE$PREFIX/movies/$PRIMARY_MOVIE_ID" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Movie API Patched"}'

# /screenings (admin)
declare -a SCREENING_IDS=()
for i in $(seq 1 "$SCREENINGS_COUNT"); do
  ROOM_ID="${ROOM_IDS[$(((i - 1) % ${#ROOM_IDS[@]}))]}"
  MOVIE_ID="${MOVIE_IDS[$(((i - 1) % ${#MOVIE_IDS[@]}))]}"
  DAY="$((10 + i))"
  DATE_PREFIX="$(printf '2026-06-%02d' "$DAY")"
  SCREENING_RESPONSE="$(curl -s -X POST "$BASE$PREFIX/screenings" \
    -H "Authorization: Bearer $ADMIN_TOKEN" \
    -H "Content-Type: application/json" \
    -d "{\"movieId\":$MOVIE_ID,\"roomId\":$ROOM_ID,\"startAt\":\"${DATE_PREFIX}T10:00:00.000Z\",\"endAt\":\"${DATE_PREFIX}T12:00:00.000Z\"}")"
  SCREENING_ID="$(printf '%s' "$SCREENING_RESPONSE" | jq -r '.data.id // .id // empty')"
  fail_if_empty "$SCREENING_ID" "SCREENING_ID[$i]" "$SCREENING_RESPONSE"
  SCREENING_IDS+=("$SCREENING_ID")
done

PRIMARY_SCREENING_ID="${SCREENING_IDS[0]}"
echo "PRIMARY_SCREENING_ID=$PRIMARY_SCREENING_ID"
curl -i "$BASE$PREFIX/screenings/$PRIMARY_SCREENING_ID" -H "Authorization: Bearer $ADMIN_TOKEN"
curl -i "$BASE$PREFIX/screenings/$PRIMARY_SCREENING_ID/stats" -H "Authorization: Bearer $ADMIN_TOKEN"
curl -i -X PUT "$BASE$PREFIX/screenings/$PRIMARY_SCREENING_ID" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"movieId\":$PRIMARY_MOVIE_ID,\"roomId\":$PRIMARY_ROOM_ID,\"startAt\":\"2026-06-20T13:00:00.000Z\",\"endAt\":\"2026-06-20T15:00:00.000Z\"}"
curl -i -X PATCH "$BASE$PREFIX/screenings/$PRIMARY_SCREENING_ID" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"startAt":"2026-06-21T10:00:00.000Z","endAt":"2026-06-21T12:00:00.000Z"}'

# /transactions
curl -i "$BASE$PREFIX/transactions" -H "Authorization: Bearer $ADMIN_TOKEN"
curl -i "$BASE$PREFIX/transactions/me" -H "Authorization: Bearer $ADMIN_TOKEN"
ADMIN_TRANSACTION_RESPONSE="$(curl -s -X POST "$BASE$PREFIX/transactions" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"type":"deposit","amount":"99.00","description":"Admin seed transaction"}')"
ADMIN_TRANSACTION_ID="$(printf '%s' "$ADMIN_TRANSACTION_RESPONSE" | jq -r '.data.id // .id // empty')"
fail_if_empty "$ADMIN_TRANSACTION_ID" "ADMIN_TRANSACTION_ID" "$ADMIN_TRANSACTION_RESPONSE"
echo "ADMIN_TRANSACTION_ID=$ADMIN_TRANSACTION_ID"
curl -i "$BASE$PREFIX/transactions/$ADMIN_TRANSACTION_ID" -H "Authorization: Bearer $ADMIN_TOKEN"
curl -i -X PUT "$BASE$PREFIX/transactions/$ADMIN_TRANSACTION_ID" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"type":"purchase","amount":"14.50","description":"Updated admin transaction"}'
curl -i -X PATCH "$BASE$PREFIX/transactions/$ADMIN_TRANSACTION_ID" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"description":"Patched admin transaction"}'

# /tickets
curl -i "$BASE$PREFIX/tickets" -H "Authorization: Bearer $ADMIN_TOKEN"
curl -i "$BASE$PREFIX/tickets/$PRIMARY_TICKET_ID" -H "Authorization: Bearer $ADMIN_TOKEN"
curl -i -X POST "$BASE$PREFIX/tickets/$PRIMARY_TICKET_ID/use" \
  -H "Authorization: Bearer $USER_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"screeningId\":$PRIMARY_SCREENING_ID}"
curl -i -X PUT "$BASE$PREFIX/tickets/$PRIMARY_TICKET_ID" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"type":"super","remainingUses":2,"isUsed":false}'
curl -i -X PATCH "$BASE$PREFIX/tickets/$PRIMARY_TICKET_ID" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"remainingUses":1}'

# /stats (admin only)
curl -i "$BASE$PREFIX/stats" -H "Authorization: Bearer $ADMIN_TOKEN"
curl -i "$BASE$PREFIX/stats/daily" -H "Authorization: Bearer $ADMIN_TOKEN"
curl -i "$BASE$PREFIX/stats/weekly" -H "Authorization: Bearer $ADMIN_TOKEN"
curl -i "$BASE$PREFIX/stats/realtime" -H "Authorization: Bearer $ADMIN_TOKEN"

if [ "$KEEP_DATA" = "0" ]; then
  # Nettoyage (admin)
  curl -i -X DELETE "$BASE$PREFIX/transactions/$ADMIN_TRANSACTION_ID" -H "Authorization: Bearer $ADMIN_TOKEN"

  for id in "${USER_TRANSACTION_IDS[@]}"; do
    curl -i -X DELETE "$BASE$PREFIX/transactions/$id" -H "Authorization: Bearer $ADMIN_TOKEN"
  done

  for id in "${USER_TICKET_IDS[@]}"; do
    curl -i -X DELETE "$BASE$PREFIX/tickets/$id" -H "Authorization: Bearer $ADMIN_TOKEN"
  done

  for id in "${SCREENING_IDS[@]}"; do
    curl -i -X DELETE "$BASE$PREFIX/screenings/$id" -H "Authorization: Bearer $ADMIN_TOKEN"
  done

  for id in "${MOVIE_IDS[@]}"; do
    curl -i -X DELETE "$BASE$PREFIX/movies/$id" -H "Authorization: Bearer $ADMIN_TOKEN"
  done

  for id in "${ROOM_IDS[@]}"; do
    curl -i -X DELETE "$BASE$PREFIX/rooms/$id" -H "Authorization: Bearer $ADMIN_TOKEN"
  done

  for id in "${ADMIN_CREATED_USER_IDS[@]}"; do
    curl -i -X DELETE "$BASE$PREFIX/users/$id" -H "Authorization: Bearer $ADMIN_TOKEN"
  done
else
  echo "Données conservées (KEEP_DATA=$KEEP_DATA)."
fi
