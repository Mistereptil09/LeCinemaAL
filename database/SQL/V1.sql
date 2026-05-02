-- Users
CREATE TABLE users (
                     id SERIAL PRIMARY KEY,
                     email VARCHAR(255) NOT NULL UNIQUE,
                     password VARCHAR(255) NOT NULL,
                     role VARCHAR(20) NOT NULL DEFAULT 'client' CHECK (role IN ('client', 'admin', 'superadmin')),
                     first_name VARCHAR(255) NOT NULL,
                     last_name VARCHAR(255) NOT NULL,
                     balance DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
                     created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                     updated_at TIMESTAMP
);

-- Movies
CREATE TABLE movies (
                      id SERIAL PRIMARY KEY,
                      title VARCHAR(255) NOT NULL UNIQUE,
                      description TEXT NOT NULL,
                      duration INTEGER NOT NULL,
                      director VARCHAR(255) NOT NULL,
                      min_age INTEGER NOT NULL DEFAULT 0,
                      images JSONB NOT NULL DEFAULT '[]',
                      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                      updated_at TIMESTAMP
);

-- Rooms
CREATE TABLE rooms (
                     id SERIAL PRIMARY KEY,
                     name VARCHAR(255) NOT NULL UNIQUE,
                     description TEXT NOT NULL,
                     type VARCHAR(20) NOT NULL DEFAULT 'standard' CHECK (type IN ('standard', 'imax', '4dx', 'vip')),
                     capacity INTEGER NOT NULL CHECK (capacity >= 15 AND capacity <= 30),
                     has_disabled_access BOOLEAN NOT NULL DEFAULT false,
                     is_under_maintenance BOOLEAN NOT NULL DEFAULT false,
                     images JSONB NOT NULL DEFAULT '[]',
                     created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                     updated_at TIMESTAMP
);

-- Screenings
CREATE TABLE screenings (
                          id SERIAL PRIMARY KEY,
                          room_id INTEGER NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
                          movie_id INTEGER NOT NULL REFERENCES movies(id) ON DELETE CASCADE,
                          start_at TIMESTAMP NOT NULL,
                          end_at TIMESTAMP NOT NULL,
                          created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                          updated_at TIMESTAMP
);

-- Tickets
CREATE TABLE tickets (
                       id SERIAL PRIMARY KEY,
                       user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                       type VARCHAR(20) NOT NULL CHECK (type IN ('standard', 'super')),
                       remaining_uses INTEGER NOT NULL DEFAULT 1,
                       is_used BOOLEAN NOT NULL DEFAULT false,
                       created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                       updated_at TIMESTAMP
);

-- Ticket uses
CREATE TABLE ticket_uses (
                           id SERIAL PRIMARY KEY,
                           ticket_id INTEGER NOT NULL REFERENCES tickets(id) ON DELETE CASCADE,
                           screening_id INTEGER NOT NULL REFERENCES screenings(id) ON DELETE CASCADE,
                           used_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Transactions
CREATE TABLE transactions (
                            id SERIAL PRIMARY KEY,
                            user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                            type VARCHAR(20) NOT NULL CHECK (type IN ('deposit', 'withdraw', 'purchase')),
                            amount DECIMAL(10, 2) NOT NULL,
                            description VARCHAR(255),
                            created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Index
CREATE INDEX idx_screenings_room_id ON screenings(room_id);
CREATE INDEX idx_screenings_movie_id ON screenings(movie_id);
CREATE INDEX idx_screenings_start_at ON screenings(start_at);
CREATE INDEX idx_tickets_user_id ON tickets(user_id);
CREATE INDEX idx_ticket_uses_ticket_id ON ticket_uses(ticket_id);
CREATE INDEX idx_ticket_uses_screening_id ON ticket_uses(screening_id);
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
