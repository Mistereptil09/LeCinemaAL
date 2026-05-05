/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'auth.auth.register': {
    methods: ["POST"]
    pattern: '/api/v1/auth/register'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').signupValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').signupValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['register']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['register']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.auth.login': {
    methods: ["POST"]
    pattern: '/api/v1/auth/login'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').loginValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').loginValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['login']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['login']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.auth.refresh': {
    methods: ["POST"]
    pattern: '/api/v1/auth/refresh'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['refresh']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['refresh']>>>
    }
  }
  'auth.auth.logout': {
    methods: ["POST"]
    pattern: '/api/v1/auth/logout'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['logout']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['logout']>>>
    }
  }
  'users.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/users'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/users_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/users_controller').default['index']>>>
    }
  }
  'users.me': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/users/me'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/users_controller').default['me']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/users_controller').default['me']>>>
    }
  }
  'users.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/users/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/users_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/users_controller').default['show']>>>
    }
  }
  'users.store': {
    methods: ["POST"]
    pattern: '/api/v1/users'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/users_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/users_controller').default['store']>>>
    }
  }
  'users.update': {
    methods: ["PUT"]
    pattern: '/api/v1/users/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/users_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/users_controller').default['update']>>>
    }
  }
  'users.patch': {
    methods: ["PATCH"]
    pattern: '/api/v1/users/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/users_controller').default['patch']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/users_controller').default['patch']>>>
    }
  }
  'users.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/users/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/users_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/users_controller').default['destroy']>>>
    }
  }
  'rooms.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/rooms'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/rooms_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/rooms_controller').default['index']>>>
    }
  }
  'rooms.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/rooms/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/rooms_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/rooms_controller').default['show']>>>
    }
  }
  'rooms.schedule': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/rooms/:id/schedule'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/rooms_controller').default['schedule']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/rooms_controller').default['schedule']>>>
    }
  }
  'rooms.store': {
    methods: ["POST"]
    pattern: '/api/v1/rooms'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/rooms_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/rooms_controller').default['store']>>>
    }
  }
  'rooms.update': {
    methods: ["PUT"]
    pattern: '/api/v1/rooms/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/rooms_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/rooms_controller').default['update']>>>
    }
  }
  'rooms.patch': {
    methods: ["PATCH"]
    pattern: '/api/v1/rooms/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/rooms_controller').default['patch']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/rooms_controller').default['patch']>>>
    }
  }
  'rooms.toggle_maintenance': {
    methods: ["PATCH"]
    pattern: '/api/v1/rooms/:id/maintenance'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/rooms_controller').default['toggleMaintenance']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/rooms_controller').default['toggleMaintenance']>>>
    }
  }
  'rooms.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/rooms/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/rooms_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/rooms_controller').default['destroy']>>>
    }
  }
  'movies.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/movies'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/movies_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/movies_controller').default['index']>>>
    }
  }
  'movies.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/movies/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/movies_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/movies_controller').default['show']>>>
    }
  }
  'movies.schedule': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/movies/:id/schedule'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/movies_controller').default['schedule']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/movies_controller').default['schedule']>>>
    }
  }
  'movies.store': {
    methods: ["POST"]
    pattern: '/api/v1/movies'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/movies_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/movies_controller').default['store']>>>
    }
  }
  'movies.update': {
    methods: ["PUT"]
    pattern: '/api/v1/movies/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/movies_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/movies_controller').default['update']>>>
    }
  }
  'movies.patch': {
    methods: ["PATCH"]
    pattern: '/api/v1/movies/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/movies_controller').default['patch']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/movies_controller').default['patch']>>>
    }
  }
  'movies.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/movies/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/movies_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/movies_controller').default['destroy']>>>
    }
  }
  'screenings.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/screenings'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/screenings_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/screenings_controller').default['index']>>>
    }
  }
  'screenings.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/screenings/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/screenings_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/screenings_controller').default['show']>>>
    }
  }
  'screenings.stats': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/screenings/:id/stats'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/screenings_controller').default['stats']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/screenings_controller').default['stats']>>>
    }
  }
  'screenings.store': {
    methods: ["POST"]
    pattern: '/api/v1/screenings'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/screenings_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/screenings_controller').default['store']>>>
    }
  }
  'screenings.update': {
    methods: ["PUT"]
    pattern: '/api/v1/screenings/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/screenings_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/screenings_controller').default['update']>>>
    }
  }
  'screenings.patch': {
    methods: ["PATCH"]
    pattern: '/api/v1/screenings/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/screenings_controller').default['patch']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/screenings_controller').default['patch']>>>
    }
  }
  'screenings.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/screenings/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/screenings_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/screenings_controller').default['destroy']>>>
    }
  }
  'tickets.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/tickets'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/tickets_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/tickets_controller').default['index']>>>
    }
  }
  'tickets.my_tickets': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/tickets/me'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/tickets_controller').default['myTickets']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/tickets_controller').default['myTickets']>>>
    }
  }
  'tickets.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/tickets/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/tickets_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/tickets_controller').default['show']>>>
    }
  }
  'tickets.store': {
    methods: ["POST"]
    pattern: '/api/v1/tickets'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/tickets_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/tickets_controller').default['store']>>>
    }
  }
  'tickets.update': {
    methods: ["PUT"]
    pattern: '/api/v1/tickets/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/tickets_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/tickets_controller').default['update']>>>
    }
  }
  'tickets.patch': {
    methods: ["PATCH"]
    pattern: '/api/v1/tickets/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/tickets_controller').default['patch']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/tickets_controller').default['patch']>>>
    }
  }
  'tickets.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/tickets/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/tickets_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/tickets_controller').default['destroy']>>>
    }
  }
  'tickets.use': {
    methods: ["POST"]
    pattern: '/api/v1/tickets/:id/use'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/tickets_controller').default['use']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/tickets_controller').default['use']>>>
    }
  }
  'stats.daily': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/stats/daily'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/stats_controller').default['daily']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/stats_controller').default['daily']>>>
    }
  }
  'stats.weekly': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/stats/weekly'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/stats_controller').default['weekly']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/stats_controller').default['weekly']>>>
    }
  }
  'stats.realtime': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/stats/realtime'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/stats_controller').default['realtime']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/stats_controller').default['realtime']>>>
    }
  }
  'stats.by_period': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/stats'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/stats_controller').default['byPeriod']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/stats_controller').default['byPeriod']>>>
    }
  }
}
