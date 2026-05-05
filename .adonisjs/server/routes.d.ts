import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth.auth.register': { paramsTuple?: []; params?: {} }
    'auth.auth.login': { paramsTuple?: []; params?: {} }
    'auth.auth.refresh': { paramsTuple?: []; params?: {} }
    'auth.auth.logout': { paramsTuple?: []; params?: {} }
    'users.index': { paramsTuple?: []; params?: {} }
    'users.me': { paramsTuple?: []; params?: {} }
    'users.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.store': { paramsTuple?: []; params?: {} }
    'users.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.patch': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'rooms.index': { paramsTuple?: []; params?: {} }
    'rooms.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'rooms.schedule': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'rooms.store': { paramsTuple?: []; params?: {} }
    'rooms.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'rooms.patch': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'rooms.toggle_maintenance': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'rooms.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'movies.index': { paramsTuple?: []; params?: {} }
    'movies.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'movies.schedule': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'movies.store': { paramsTuple?: []; params?: {} }
    'movies.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'movies.patch': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'movies.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'screenings.index': { paramsTuple?: []; params?: {} }
    'screenings.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'screenings.stats': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'screenings.store': { paramsTuple?: []; params?: {} }
    'screenings.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'screenings.patch': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'screenings.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tickets.index': { paramsTuple?: []; params?: {} }
    'tickets.my_tickets': { paramsTuple?: []; params?: {} }
    'tickets.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tickets.store': { paramsTuple?: []; params?: {} }
    'tickets.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tickets.patch': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tickets.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tickets.use': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'stats.daily': { paramsTuple?: []; params?: {} }
    'stats.weekly': { paramsTuple?: []; params?: {} }
    'stats.realtime': { paramsTuple?: []; params?: {} }
    'stats.by_period': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'auth.auth.register': { paramsTuple?: []; params?: {} }
    'auth.auth.login': { paramsTuple?: []; params?: {} }
    'auth.auth.refresh': { paramsTuple?: []; params?: {} }
    'auth.auth.logout': { paramsTuple?: []; params?: {} }
    'users.store': { paramsTuple?: []; params?: {} }
    'rooms.store': { paramsTuple?: []; params?: {} }
    'movies.store': { paramsTuple?: []; params?: {} }
    'screenings.store': { paramsTuple?: []; params?: {} }
    'tickets.store': { paramsTuple?: []; params?: {} }
    'tickets.use': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  GET: {
    'users.index': { paramsTuple?: []; params?: {} }
    'users.me': { paramsTuple?: []; params?: {} }
    'users.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'rooms.index': { paramsTuple?: []; params?: {} }
    'rooms.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'rooms.schedule': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'movies.index': { paramsTuple?: []; params?: {} }
    'movies.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'movies.schedule': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'screenings.index': { paramsTuple?: []; params?: {} }
    'screenings.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'screenings.stats': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tickets.index': { paramsTuple?: []; params?: {} }
    'tickets.my_tickets': { paramsTuple?: []; params?: {} }
    'tickets.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'stats.daily': { paramsTuple?: []; params?: {} }
    'stats.weekly': { paramsTuple?: []; params?: {} }
    'stats.realtime': { paramsTuple?: []; params?: {} }
    'stats.by_period': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'users.index': { paramsTuple?: []; params?: {} }
    'users.me': { paramsTuple?: []; params?: {} }
    'users.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'rooms.index': { paramsTuple?: []; params?: {} }
    'rooms.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'rooms.schedule': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'movies.index': { paramsTuple?: []; params?: {} }
    'movies.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'movies.schedule': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'screenings.index': { paramsTuple?: []; params?: {} }
    'screenings.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'screenings.stats': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tickets.index': { paramsTuple?: []; params?: {} }
    'tickets.my_tickets': { paramsTuple?: []; params?: {} }
    'tickets.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'stats.daily': { paramsTuple?: []; params?: {} }
    'stats.weekly': { paramsTuple?: []; params?: {} }
    'stats.realtime': { paramsTuple?: []; params?: {} }
    'stats.by_period': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'users.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'rooms.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'movies.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'screenings.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tickets.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  PATCH: {
    'users.patch': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'rooms.patch': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'rooms.toggle_maintenance': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'movies.patch': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'screenings.patch': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tickets.patch': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'users.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'rooms.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'movies.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'screenings.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tickets.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}
