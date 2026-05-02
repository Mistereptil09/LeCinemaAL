/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'auth.auth.register': {
    methods: ["POST"],
    pattern: '/api/v1/auth/register',
    tokens: [{"old":"/api/v1/auth/register","type":0,"val":"api","end":""},{"old":"/api/v1/auth/register","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/register","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/register","type":0,"val":"register","end":""}],
    types: placeholder as Registry['auth.auth.register']['types'],
  },
  'auth.auth.login': {
    methods: ["POST"],
    pattern: '/api/v1/auth/login',
    tokens: [{"old":"/api/v1/auth/login","type":0,"val":"api","end":""},{"old":"/api/v1/auth/login","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/login","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['auth.auth.login']['types'],
  },
  'auth.auth.refresh': {
    methods: ["POST"],
    pattern: '/api/v1/auth/refresh',
    tokens: [{"old":"/api/v1/auth/refresh","type":0,"val":"api","end":""},{"old":"/api/v1/auth/refresh","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/refresh","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/refresh","type":0,"val":"refresh","end":""}],
    types: placeholder as Registry['auth.auth.refresh']['types'],
  },
  'auth.auth.logout': {
    methods: ["POST"],
    pattern: '/api/v1/auth/logout',
    tokens: [{"old":"/api/v1/auth/logout","type":0,"val":"api","end":""},{"old":"/api/v1/auth/logout","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/logout","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['auth.auth.logout']['types'],
  },
  'users.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/users',
    tokens: [{"old":"/api/v1/users","type":0,"val":"api","end":""},{"old":"/api/v1/users","type":0,"val":"v1","end":""},{"old":"/api/v1/users","type":0,"val":"users","end":""}],
    types: placeholder as Registry['users.index']['types'],
  },
  'users.me': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/users/me',
    tokens: [{"old":"/api/v1/users/me","type":0,"val":"api","end":""},{"old":"/api/v1/users/me","type":0,"val":"v1","end":""},{"old":"/api/v1/users/me","type":0,"val":"users","end":""},{"old":"/api/v1/users/me","type":0,"val":"me","end":""}],
    types: placeholder as Registry['users.me']['types'],
  },
  'users.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/users/:id',
    tokens: [{"old":"/api/v1/users/:id","type":0,"val":"api","end":""},{"old":"/api/v1/users/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/users/:id","type":0,"val":"users","end":""},{"old":"/api/v1/users/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['users.show']['types'],
  },
  'rooms.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/rooms',
    tokens: [{"old":"/api/v1/rooms","type":0,"val":"api","end":""},{"old":"/api/v1/rooms","type":0,"val":"v1","end":""},{"old":"/api/v1/rooms","type":0,"val":"rooms","end":""}],
    types: placeholder as Registry['rooms.index']['types'],
  },
  'rooms.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/rooms/:id',
    tokens: [{"old":"/api/v1/rooms/:id","type":0,"val":"api","end":""},{"old":"/api/v1/rooms/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/rooms/:id","type":0,"val":"rooms","end":""},{"old":"/api/v1/rooms/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['rooms.show']['types'],
  },
  'rooms.schedule': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/rooms/:id/schedule',
    tokens: [{"old":"/api/v1/rooms/:id/schedule","type":0,"val":"api","end":""},{"old":"/api/v1/rooms/:id/schedule","type":0,"val":"v1","end":""},{"old":"/api/v1/rooms/:id/schedule","type":0,"val":"rooms","end":""},{"old":"/api/v1/rooms/:id/schedule","type":1,"val":"id","end":""},{"old":"/api/v1/rooms/:id/schedule","type":0,"val":"schedule","end":""}],
    types: placeholder as Registry['rooms.schedule']['types'],
  },
  'rooms.store': {
    methods: ["POST"],
    pattern: '/api/v1/rooms',
    tokens: [{"old":"/api/v1/rooms","type":0,"val":"api","end":""},{"old":"/api/v1/rooms","type":0,"val":"v1","end":""},{"old":"/api/v1/rooms","type":0,"val":"rooms","end":""}],
    types: placeholder as Registry['rooms.store']['types'],
  },
  'rooms.update': {
    methods: ["PUT"],
    pattern: '/api/v1/rooms/:id',
    tokens: [{"old":"/api/v1/rooms/:id","type":0,"val":"api","end":""},{"old":"/api/v1/rooms/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/rooms/:id","type":0,"val":"rooms","end":""},{"old":"/api/v1/rooms/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['rooms.update']['types'],
  },
  'rooms.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/rooms/:id',
    tokens: [{"old":"/api/v1/rooms/:id","type":0,"val":"api","end":""},{"old":"/api/v1/rooms/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/rooms/:id","type":0,"val":"rooms","end":""},{"old":"/api/v1/rooms/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['rooms.destroy']['types'],
  },
  'rooms.toggle_maintenance': {
    methods: ["PATCH"],
    pattern: '/api/v1/rooms/:id/maintenance',
    tokens: [{"old":"/api/v1/rooms/:id/maintenance","type":0,"val":"api","end":""},{"old":"/api/v1/rooms/:id/maintenance","type":0,"val":"v1","end":""},{"old":"/api/v1/rooms/:id/maintenance","type":0,"val":"rooms","end":""},{"old":"/api/v1/rooms/:id/maintenance","type":1,"val":"id","end":""},{"old":"/api/v1/rooms/:id/maintenance","type":0,"val":"maintenance","end":""}],
    types: placeholder as Registry['rooms.toggle_maintenance']['types'],
  },
  'movies.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/movies',
    tokens: [{"old":"/api/v1/movies","type":0,"val":"api","end":""},{"old":"/api/v1/movies","type":0,"val":"v1","end":""},{"old":"/api/v1/movies","type":0,"val":"movies","end":""}],
    types: placeholder as Registry['movies.index']['types'],
  },
  'movies.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/movies/:id',
    tokens: [{"old":"/api/v1/movies/:id","type":0,"val":"api","end":""},{"old":"/api/v1/movies/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/movies/:id","type":0,"val":"movies","end":""},{"old":"/api/v1/movies/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['movies.show']['types'],
  },
  'movies.schedule': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/movies/:id/schedule',
    tokens: [{"old":"/api/v1/movies/:id/schedule","type":0,"val":"api","end":""},{"old":"/api/v1/movies/:id/schedule","type":0,"val":"v1","end":""},{"old":"/api/v1/movies/:id/schedule","type":0,"val":"movies","end":""},{"old":"/api/v1/movies/:id/schedule","type":1,"val":"id","end":""},{"old":"/api/v1/movies/:id/schedule","type":0,"val":"schedule","end":""}],
    types: placeholder as Registry['movies.schedule']['types'],
  },
  'movies.store': {
    methods: ["POST"],
    pattern: '/api/v1/movies',
    tokens: [{"old":"/api/v1/movies","type":0,"val":"api","end":""},{"old":"/api/v1/movies","type":0,"val":"v1","end":""},{"old":"/api/v1/movies","type":0,"val":"movies","end":""}],
    types: placeholder as Registry['movies.store']['types'],
  },
  'movies.update': {
    methods: ["PUT"],
    pattern: '/api/v1/movies/:id',
    tokens: [{"old":"/api/v1/movies/:id","type":0,"val":"api","end":""},{"old":"/api/v1/movies/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/movies/:id","type":0,"val":"movies","end":""},{"old":"/api/v1/movies/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['movies.update']['types'],
  },
  'movies.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/movies/:id',
    tokens: [{"old":"/api/v1/movies/:id","type":0,"val":"api","end":""},{"old":"/api/v1/movies/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/movies/:id","type":0,"val":"movies","end":""},{"old":"/api/v1/movies/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['movies.destroy']['types'],
  },
  'screenings.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/screenings',
    tokens: [{"old":"/api/v1/screenings","type":0,"val":"api","end":""},{"old":"/api/v1/screenings","type":0,"val":"v1","end":""},{"old":"/api/v1/screenings","type":0,"val":"screenings","end":""}],
    types: placeholder as Registry['screenings.index']['types'],
  },
  'screenings.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/screenings/:id',
    tokens: [{"old":"/api/v1/screenings/:id","type":0,"val":"api","end":""},{"old":"/api/v1/screenings/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/screenings/:id","type":0,"val":"screenings","end":""},{"old":"/api/v1/screenings/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['screenings.show']['types'],
  },
  'screenings.stats': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/screenings/:id/stats',
    tokens: [{"old":"/api/v1/screenings/:id/stats","type":0,"val":"api","end":""},{"old":"/api/v1/screenings/:id/stats","type":0,"val":"v1","end":""},{"old":"/api/v1/screenings/:id/stats","type":0,"val":"screenings","end":""},{"old":"/api/v1/screenings/:id/stats","type":1,"val":"id","end":""},{"old":"/api/v1/screenings/:id/stats","type":0,"val":"stats","end":""}],
    types: placeholder as Registry['screenings.stats']['types'],
  },
  'screenings.store': {
    methods: ["POST"],
    pattern: '/api/v1/screenings',
    tokens: [{"old":"/api/v1/screenings","type":0,"val":"api","end":""},{"old":"/api/v1/screenings","type":0,"val":"v1","end":""},{"old":"/api/v1/screenings","type":0,"val":"screenings","end":""}],
    types: placeholder as Registry['screenings.store']['types'],
  },
  'screenings.update': {
    methods: ["PUT"],
    pattern: '/api/v1/screenings/:id',
    tokens: [{"old":"/api/v1/screenings/:id","type":0,"val":"api","end":""},{"old":"/api/v1/screenings/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/screenings/:id","type":0,"val":"screenings","end":""},{"old":"/api/v1/screenings/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['screenings.update']['types'],
  },
  'screenings.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/screenings/:id',
    tokens: [{"old":"/api/v1/screenings/:id","type":0,"val":"api","end":""},{"old":"/api/v1/screenings/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/screenings/:id","type":0,"val":"screenings","end":""},{"old":"/api/v1/screenings/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['screenings.destroy']['types'],
  },
  'tickets.my_tickets': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/tickets/me',
    tokens: [{"old":"/api/v1/tickets/me","type":0,"val":"api","end":""},{"old":"/api/v1/tickets/me","type":0,"val":"v1","end":""},{"old":"/api/v1/tickets/me","type":0,"val":"tickets","end":""},{"old":"/api/v1/tickets/me","type":0,"val":"me","end":""}],
    types: placeholder as Registry['tickets.my_tickets']['types'],
  },
  'tickets.store': {
    methods: ["POST"],
    pattern: '/api/v1/tickets',
    tokens: [{"old":"/api/v1/tickets","type":0,"val":"api","end":""},{"old":"/api/v1/tickets","type":0,"val":"v1","end":""},{"old":"/api/v1/tickets","type":0,"val":"tickets","end":""}],
    types: placeholder as Registry['tickets.store']['types'],
  },
  'tickets.use': {
    methods: ["POST"],
    pattern: '/api/v1/tickets/:id/use',
    tokens: [{"old":"/api/v1/tickets/:id/use","type":0,"val":"api","end":""},{"old":"/api/v1/tickets/:id/use","type":0,"val":"v1","end":""},{"old":"/api/v1/tickets/:id/use","type":0,"val":"tickets","end":""},{"old":"/api/v1/tickets/:id/use","type":1,"val":"id","end":""},{"old":"/api/v1/tickets/:id/use","type":0,"val":"use","end":""}],
    types: placeholder as Registry['tickets.use']['types'],
  },
  'stats.daily': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/stats/daily',
    tokens: [{"old":"/api/v1/stats/daily","type":0,"val":"api","end":""},{"old":"/api/v1/stats/daily","type":0,"val":"v1","end":""},{"old":"/api/v1/stats/daily","type":0,"val":"stats","end":""},{"old":"/api/v1/stats/daily","type":0,"val":"daily","end":""}],
    types: placeholder as Registry['stats.daily']['types'],
  },
  'stats.weekly': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/stats/weekly',
    tokens: [{"old":"/api/v1/stats/weekly","type":0,"val":"api","end":""},{"old":"/api/v1/stats/weekly","type":0,"val":"v1","end":""},{"old":"/api/v1/stats/weekly","type":0,"val":"stats","end":""},{"old":"/api/v1/stats/weekly","type":0,"val":"weekly","end":""}],
    types: placeholder as Registry['stats.weekly']['types'],
  },
  'stats.realtime': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/stats/realtime',
    tokens: [{"old":"/api/v1/stats/realtime","type":0,"val":"api","end":""},{"old":"/api/v1/stats/realtime","type":0,"val":"v1","end":""},{"old":"/api/v1/stats/realtime","type":0,"val":"stats","end":""},{"old":"/api/v1/stats/realtime","type":0,"val":"realtime","end":""}],
    types: placeholder as Registry['stats.realtime']['types'],
  },
  'stats.by_period': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/stats',
    tokens: [{"old":"/api/v1/stats","type":0,"val":"api","end":""},{"old":"/api/v1/stats","type":0,"val":"v1","end":""},{"old":"/api/v1/stats","type":0,"val":"stats","end":""}],
    types: placeholder as Registry['stats.by_period']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
