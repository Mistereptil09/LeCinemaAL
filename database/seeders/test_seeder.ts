// database/seeders/test_seeder.ts
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { DateTime } from 'luxon'

import User from '#models/user'
import Movie from '#models/movie'
import Room from '#models/room'
import Screening from '#models/screening'
import Ticket from '#models/ticket'
import TicketUse from '#models/ticket_use'
import Transaction from '#models/transaction'

export default class TestSeeder extends BaseSeeder {
  static environment = ['testing']

  public async run() {
    const users = await User.createMany([
      {
        email: 'superadmin@test.com',
        password: 'password',
        role: 'superadmin',
        firstName: 'Super',
        lastName: 'Admin',
        balance: '500.00',
      },
      {
        email: 'admin@test.com',
        password: 'password',
        role: 'admin',
        firstName: 'Main',
        lastName: 'Admin',
        balance: '250.00',
      },
      {
        email: 'alice@test.com',
        password: 'password',
        role: 'client',
        firstName: 'Alice',
        lastName: 'Martin',
        balance: '120.00',
      },
      {
        email: 'bob@test.com',
        password: 'password',
        role: 'client',
        firstName: 'Bob',
        lastName: 'Durand',
        balance: '95.00',
      },
      {
        email: 'claire@test.com',
        password: 'password',
        role: 'client',
        firstName: 'Claire',
        lastName: 'Bernard',
        balance: '80.00',
      },
      {
        email: 'david@test.com',
        password: 'password',
        role: 'client',
        firstName: 'David',
        lastName: 'Petit',
        balance: '140.00',
      },
      {
        email: 'emma@test.com',
        password: 'password',
        role: 'client',
        firstName: 'Emma',
        lastName: 'Robert',
        balance: '60.00',
      },
      {
        email: 'farid@test.com',
        password: 'password',
        role: 'client',
        firstName: 'Farid',
        lastName: 'Moreau',
        balance: '110.00',
      },
      {
        email: 'gina@test.com',
        password: 'password',
        role: 'client',
        firstName: 'Gina',
        lastName: 'Simon',
        balance: '75.00',
      },
      {
        email: 'hugo@test.com',
        password: 'password',
        role: 'client',
        firstName: 'Hugo',
        lastName: 'Laurent',
        balance: '130.00',
      },
      {
        email: 'ines@test.com',
        password: 'password',
        role: 'client',
        firstName: 'Ines',
        lastName: 'Michel',
        balance: '90.00',
      },
      {
        email: 'jade@test.com',
        password: 'password',
        role: 'client',
        firstName: 'Jade',
        lastName: 'Garcia',
        balance: '105.00',
      },
    ])

    const movies = await Movie.createMany([
      {
        title: 'Interstellar',
        description: 'Space exploration and time dilation.',
        duration: 169,
        director: 'Christopher Nolan',
        minAge: 10,
        images: [],
      },
      {
        title: 'Dune Part One',
        description: 'Political conflict on Arrakis.',
        duration: 155,
        director: 'Denis Villeneuve',
        minAge: 12,
        images: [],
      },
      {
        title: 'Blade Runner 2049',
        description: 'A detective uncovers a buried secret.',
        duration: 164,
        director: 'Denis Villeneuve',
        minAge: 12,
        images: [],
      },
      {
        title: 'The Dark Knight',
        description: 'Batman faces the Joker.',
        duration: 152,
        director: 'Christopher Nolan',
        minAge: 12,
        images: [],
      },
      {
        title: 'Arrival',
        description: 'Linguistics meets first contact.',
        duration: 116,
        director: 'Denis Villeneuve',
        minAge: 10,
        images: [],
      },
      {
        title: 'Mad Max Fury Road',
        description: 'A relentless desert chase.',
        duration: 120,
        director: 'George Miller',
        minAge: 16,
        images: [],
      },
      {
        title: 'Inception',
        description: 'Dream infiltration thriller.',
        duration: 148,
        director: 'Christopher Nolan',
        minAge: 12,
        images: [],
      },
      {
        title: 'The Matrix',
        description: 'Reality is not what it seems.',
        duration: 136,
        director: 'Wachowski Sisters',
        minAge: 12,
        images: [],
      },
      {
        title: 'Avatar',
        description: 'A marine enters Pandora.',
        duration: 162,
        director: 'James Cameron',
        minAge: 10,
        images: [],
      },
      {
        title: 'Gladiator',
        description: 'A general seeks justice in Rome.',
        duration: 155,
        director: 'Ridley Scott',
        minAge: 14,
        images: [],
      },
    ])

    const rooms = await Room.createMany([
      {
        name: 'Room A',
        description: 'Standard projection room',
        type: 'standard',
        capacity: 20,
        hasDisabledAccess: true,
        isUnderMaintenance: false,
        images: [],
      },
      {
        name: 'Room B',
        description: 'IMAX projection room',
        type: 'imax',
        capacity: 30,
        hasDisabledAccess: true,
        isUnderMaintenance: false,
        images: [],
      },
      {
        name: 'Room C',
        description: '4DX experience room',
        type: '4dx',
        capacity: 18,
        hasDisabledAccess: false,
        isUnderMaintenance: false,
        images: [],
      },
      {
        name: 'Room D',
        description: 'VIP premium room',
        type: 'vip',
        capacity: 16,
        hasDisabledAccess: true,
        isUnderMaintenance: false,
        images: [],
      },
      {
        name: 'Room E',
        description: 'Secondary standard room',
        type: 'standard',
        capacity: 24,
        hasDisabledAccess: true,
        isUnderMaintenance: false,
        images: [],
      },
    ])

    const baseDate = DateTime.fromISO('2026-05-11T10:00:00')
    const screeningRows: Array<{
      roomId: number
      movieId: number
      startAt: DateTime
      endAt: DateTime
    }> = []

    for (let day = 0; day < 7; day++) {
      for (const [roomIndex, room] of rooms.entries()) {
        const movie = movies[(day + roomIndex) % movies.length]
        const startAt = baseDate.plus({ days: day, hours: roomIndex * 2 })
        const endAt = startAt.plus({ minutes: movie.duration + 20 })

        screeningRows.push({
          roomId: room.id,
          movieId: movie.id,
          startAt,
          endAt,
        })
      }
    }

    const screenings = await Promise.all(screeningRows.map((row) => Screening.create(row)))

    const clientUsers = users.filter((user) => user.role === 'client')

    const ticketRows: Array<{
      userId: number
      type: 'standard' | 'super'
      remainingUses: number
      isUsed: boolean
    }> = []

    for (const [index, user] of clientUsers.entries()) {
      ticketRows.push({
        userId: user.id,
        type: 'standard',
        remainingUses: 1,
        isUsed: false,
      })

      ticketRows.push({
        userId: user.id,
        type: 'super',
        remainingUses: 1,
        isUsed: false,
      })

      ticketRows.push({
        userId: user.id,
        type: 'standard',
        remainingUses: 0,
        isUsed: true,
      })

      if (index % 2 === 0) {
        ticketRows.push({
          userId: user.id,
          type: 'super',
          remainingUses: 0,
          isUsed: true,
        })
      }
    }

    const tickets = await Promise.all(ticketRows.map((row) => Ticket.create(row)))

    const transactionRows: Array<{
      userId: number
      type: 'deposit' | 'withdraw' | 'purchase'
      amount: string
      description: string
    }> = []

    for (const [index, user] of clientUsers.entries()) {
      transactionRows.push({
        userId: user.id,
        type: 'deposit',
        amount: `${60 + index * 10}.00`,
        description: 'Initial CI wallet top-up',
      })

      transactionRows.push({
        userId: user.id,
        type: 'purchase',
        amount: `${12 + (index % 4) * 2}.50`,
        description: 'Ticket purchase in CI seed',
      })

      if (index % 3 === 0) {
        transactionRows.push({
          userId: user.id,
          type: 'withdraw',
          amount: '10.00',
          description: 'Refund or manual withdrawal example',
        })
      }
    }

    await Transaction.createMany(transactionRows)

    const usedTickets = tickets.filter((ticket) => ticket.isUsed)

    const ticketUseRows = usedTickets.map((ticket, index) => {
      const screening = screenings[index % screenings.length]

      return {
        ticketId: ticket.id,
        screeningId: screening.id,
        usedAt: screening.startAt.minus({ minutes: 15 }),
      }
    })

    await TicketUse.createMany(ticketUseRows)
  }
}
