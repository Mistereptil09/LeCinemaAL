import Screening from '#models/screening'
import { type HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import Room from '#models/room'
import Movie from '#models/movie'

export default class ScreeningsController {
  /**
   * @index
   * @tag Screenings
   */
  async index({ request }: HttpContext) {
    return Screening.query()
      .whereHas('room', (query) => {
        query.where('isUnderMaintenance', false) // Cacher les films si salle en maintenance
      })
      .preload('movie')
      .preload('room')
      .paginate(request.input('page', 1), 20)
  }

  /**
   * @show
   * @tag Screenings
   */
  async show({ params }: HttpContext) {
    return Screening.query()
      .where('id', params.id)
      .preload('movie')
      .preload('room')
      .preload('ticketUses')
      .firstOrFail()
  }

  /**
   * @stats
   * @tag Screenings
   */
  async stats({ params }: HttpContext) {
    const screening = await Screening.query()
      .where('id', params.id)
      .preload('room')
      .preload('movie')
      .preload('ticketUses')
      .firstOrFail()

    const usedTickets = screening.ticketUses.length
    const capacity = screening.room.capacity

    return {
      screening,
      stats: {
        capacity,
        usedTickets,
        remainingSeats: Math.max(capacity - usedTickets, 0),
        occupancyRate: capacity > 0 ? Number(((usedTickets / capacity) * 100).toFixed(2)) : 0,
      },
    }
  }

  /**
   * @store
   * @tag Screenings
   */
  async store({ request, response }: HttpContext) {
    const { movieId, roomId, startAt } = request.only(['movieId', 'roomId', 'startAt'])
    const startTime = DateTime.fromISO(startAt)

    // 1. Récupérer le film pour avoir sa durée
    const movie = await Movie.findOrFail(movieId)
    const endTime = startTime.plus({ minutes: movie.duration + 30 }) // Règle : durée + 30min

    // 2. Vérification des horaires d'ouverture (9h - 20h)
    if (
      startTime.hour < 9 ||
      startTime.hour >= 20 ||
      endTime.hour >= 20 ||
      !startTime.hasSame(endTime, 'day') ||
      (endTime.hour === 20 && endTime.minute > 0)
    ) {
      return response.badRequest('La séance doit se dérouler entre 9h et 20h.')
    }

    // 3. Vérification de la maintenance
    const room = await Room.findOrFail(roomId)
    if (room.isUnderMaintenance) {
      return response.forbidden('La salle est en maintenance.')
    }

    // 4. Vérification des chevauchements
    const conflict = await Screening.query()
      .where('roomId', roomId)
      .where((q) => {
        q.whereBetween('startAt', [startTime.toSQL()!, endTime.toSQL()!]).orWhereBetween('endAt', [
          startTime.toSQL()!,
          endTime.toSQL()!,
        ])
      })
      .first()

    if (conflict) return response.conflict('La salle est déjà occupée.')

    const screening = await Screening.create({
      movieId,
      roomId,
      startAt: startTime,
      endAt: endTime,
    })

    return response.created(screening)
  }

  /**
   * @update
   * @tag Screenings
   */
  async update({ params, request }: HttpContext) {
    const screening = await Screening.findOrFail(params.id)

    screening.merge(request.only(['movieId', 'roomId', 'startAt', 'endAt']))
    await screening.save()

    return screening
  }

  /**
   * @destroy
   * @tag Screenings
   */
  async destroy({ params, response }: HttpContext) {
    const screening = await Screening.findOrFail(params.id)
    await screening.delete()

    return response.noContent()
  }
}
