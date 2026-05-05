import { DateTime } from 'luxon'
import { appprefix } from '#start/constants'
import User from '#models/user'
import Movie from '#models/movie'
import Room from '#models/room'
import Screening from '#models/screening'
import Ticket from '#models/ticket'
import Transaction from '#models/transaction'

let sequence = 0

export function api(path: string) {
  return `${appprefix}${path}`
}

export function body<T>(response: { body: () => unknown }) {
  return response.body() as T
}

export async function createUser(role: 'admin' | 'client' | 'superadmin' = 'admin') {
  sequence += 1

  return User.create({
    firstName: 'Test',
    lastName: `User${sequence}`,
    email: `user${sequence}@test.com`,
    password: 'password123',
    role: role,
    wallet: '100.00',
  })
}
export async function createMovie() {
  sequence += 1

  return Movie.create({
    title: `Movie ${sequence}`,
    description: 'Movie description',
    director: 'Director Name',
    duration: 120,
    minAge: 10,
    images: null,
  })
}

export async function createRoom() {
  sequence += 1

  return Room.create({
    name: `Room ${sequence}`,
    type: 'standard',
    capacity: 40,
    description: 'Room description',
    hasDisabledAccess: true,
    isUnderMaintenance: false,
    images: null,
  })
}

export async function createScreening() {
  const movie = await createMovie()
  const room = await createRoom()

  // On fixe l'heure à 14h00 pour être sûr de passer la validation d'ouverture (9h-20h)
  const startAt = DateTime.now().set({ hour: 14, minute: 0, second: 0, millisecond: 0 })
  const endAt = startAt.plus({ minutes: movie.duration + 30 })

  const screening = await Screening.create({
    movieId: movie.id,
    roomId: room.id,
    startAt,
    endAt,
  })

  return { movie, room, screening }
}

export async function createTicket(userId: number, remainingUses = 1, isUsed = false) {
  return Ticket.create({
    userId,
    type: 'standard',
    remainingUses,
    isUsed,
  })
}

export async function createTransaction(userId: number) {
  return Transaction.create({
    userId,
    type: 'deposit',
    amount: '10.00',
    description: 'Test transaction',
  })
}
