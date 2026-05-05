/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  auth: {
    auth: {
      register: typeof routes['auth.auth.register']
      login: typeof routes['auth.auth.login']
      refresh: typeof routes['auth.auth.refresh']
      logout: typeof routes['auth.auth.logout']
    }
  }
  users: {
    index: typeof routes['users.index']
    me: typeof routes['users.me']
    show: typeof routes['users.show']
    store: typeof routes['users.store']
    update: typeof routes['users.update']
    patch: typeof routes['users.patch']
    destroy: typeof routes['users.destroy']
  }
  rooms: {
    index: typeof routes['rooms.index']
    show: typeof routes['rooms.show']
    schedule: typeof routes['rooms.schedule']
    store: typeof routes['rooms.store']
    update: typeof routes['rooms.update']
    patch: typeof routes['rooms.patch']
    toggleMaintenance: typeof routes['rooms.toggle_maintenance']
    destroy: typeof routes['rooms.destroy']
  }
  movies: {
    index: typeof routes['movies.index']
    show: typeof routes['movies.show']
    schedule: typeof routes['movies.schedule']
    store: typeof routes['movies.store']
    update: typeof routes['movies.update']
    patch: typeof routes['movies.patch']
    destroy: typeof routes['movies.destroy']
  }
  screenings: {
    index: typeof routes['screenings.index']
    show: typeof routes['screenings.show']
    stats: typeof routes['screenings.stats']
    store: typeof routes['screenings.store']
    update: typeof routes['screenings.update']
    patch: typeof routes['screenings.patch']
    destroy: typeof routes['screenings.destroy']
  }
  tickets: {
    index: typeof routes['tickets.index']
    myTickets: typeof routes['tickets.my_tickets']
    show: typeof routes['tickets.show']
    store: typeof routes['tickets.store']
    update: typeof routes['tickets.update']
    patch: typeof routes['tickets.patch']
    destroy: typeof routes['tickets.destroy']
    use: typeof routes['tickets.use']
  }
  stats: {
    daily: typeof routes['stats.daily']
    weekly: typeof routes['stats.weekly']
    realtime: typeof routes['stats.realtime']
    byPeriod: typeof routes['stats.by_period']
  }
}
