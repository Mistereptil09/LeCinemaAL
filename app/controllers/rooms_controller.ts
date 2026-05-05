import Room from '#models/room'
import Screening from '#models/screening'
import { type HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

export default class RoomsController {
  /**
   * @index
   * @tag Rooms
   */
  async index({ request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 20)

    return Room.query().orderBy('name', 'asc').paginate(page, limit)
  }

  /**
   * @show
   * @tag Rooms
   */
  async show({ params }: HttpContext) {
    return Room.findOrFail(params.id)
  }

  /**
   * @schedule
   * @tag Rooms
   */
  async schedule({ params, request }: HttpContext) {
    // Le sujet demande une période choisie (passée ou future)[cite: 7]
    const start = request.input('start')
    const end = request.input('end')

    const query = Screening.query().where('roomId', params.id).preload('movie')

    if (start && end) {
      // Conversion en ISO-8601 pour le schéma ScreeningSchema
      const startDate = DateTime.fromISO(start).toSQL()!
      const endDate = DateTime.fromISO(end).toSQL()!
      query.whereBetween('startAt', [startDate, endDate])
    }

    return query.orderBy('startAt', 'asc')
  }
  /**
   * @store
   * @tag Rooms
   */
  async store({ request, response }: HttpContext) {
    const payload = request.only([
      'name',
      'type',
      'capacity',
      'description',
      'images',
      'hasDisabledAccess',
      'isUnderMaintenance',
    ])

    // Validation de la capacité : entre 15 et 30 places
    if (payload.capacity < 15 || payload.capacity > 30) {
      return response.badRequest({
        message: 'La capacité de la salle doit être comprise entre 15 et 30 places.',
      })
    }

    const room = await Room.create(payload)
    return response.created(room)
  }

  /**
   * @update
   * @tag Rooms
   */
  async update({ params, request, response }: HttpContext) {
    const room = await Room.findOrFail(params.id)
    const payload = request.only([
      'name',
      'type',
      'capacity',
      'description',
      'images',
      'hasDisabledAccess',
      'isUnderMaintenance',
    ])

    // Validation de la capacité lors de la mise à jour
    if (payload.capacity !== undefined && (payload.capacity < 15 || payload.capacity > 30)) {
      return response.badRequest({
        message: 'La capacité doit rester entre 15 et 30 places.',
      })
    }

    room.merge(payload)
    await room.save()
    return room
  }

  /**
   * @destroy
   * @tag Rooms
   */
  async destroy({ params, response }: HttpContext) {
    // Contrainte : Il est nécessaire d'avoir au moins 10 salles au total
    const roomsCount = await Room.query().count('* as total')
    const total = Number(roomsCount[0].$extras.total)

    if (total <= 10) {
      return response.badRequest({
        message: 'Impossible de supprimer la salle. Le cinéma doit comporter au moins 10 salles.',
      })
    }

    const room = await Room.findOrFail(params.id)
    await room.delete()

    return response.noContent()
  }

  /**
   * @toggleMaintenance
   * @tag Rooms
   */
  async toggleMaintenance({ params }: HttpContext) {
    const room = await Room.findOrFail(params.id)
    room.isUnderMaintenance = !room.isUnderMaintenance

    // Note : La logique d'empêcher les séances se trouve dans ScreeningsController
    // en vérifiant cet attribut avant le store ou l'index
    await room.save()

    return room
  }
}
