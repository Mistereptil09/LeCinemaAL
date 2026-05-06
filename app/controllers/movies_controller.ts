import { type HttpContext } from '@adonisjs/core/http'
import Movie from '#models/movie'
import { DateTime } from 'luxon'

export default class MoviesController {
  /**
   * @index
   * @tag Movies
   */
  async index({ response }: HttpContext) {
    const movies = await Movie.query().orderBy('title', 'asc')
    return response.ok(movies)
  }
  /**
   * @show
   * @tag Movies
   */
  async show({ params, response }: HttpContext) {
    const movie = await Movie.find(params.id)
    if (!movie) {
      return response.notFound({
        message: 'Movie not found',
      })
    }
    return response.ok(movie)
  }
  /**
   * @schedule
   * @tag Movies
   */
  async schedule({ params, request, response }: HttpContext) {
    const movie = await Movie.find(params.id)

    if (!movie) {
      return response.notFound({
        message: 'Movie not found',
      })
    }
    const startDate = request.input('startDate')
    const endDate = request.input('endDate')

    if (!startDate || !endDate) {
      return response.badRequest({
        message: 'Start date and end date are required',
      })
    }

    const startDateTime = DateTime.fromISO(startDate).startOf('day')
    const endDateTime = DateTime.fromISO(endDate).endOf('day')

    if (startDateTime > endDateTime) {
      return response.badRequest({
        message: 'Start date must be before end date',
      })
    }

    const screenings = await movie
      .related('screenings')
      .query()
      .whereBetween('start_at', [startDateTime.toSQL()!, endDateTime.toSQL()!])
      .preload('room')
      .orderBy('start_at', 'asc')
    return response.ok({
      movie,
      period: {
        startDate: startDateTime.toISODate(),
        endDate: endDateTime.toISODate(),
      },
      data: screenings,
    })
  }
  /**
   * @store
   * @tag Movies
   */
  async store({ request, response }: HttpContext) {
    const payload = request.only([
      'title',
      'description',
      'director',
      'duration',
      'minAge',
      'images',
    ])

    const movie = await Movie.create(payload)

    return response.created({
      message: 'Movie created successfully',
      data: movie,
    })
  }
  /**
   * @update
   * @tag Movies
   */
  async update({ params, request, response }: HttpContext) {
    const movie = await Movie.find(params.id)

    if (!movie) {
      return response.notFound({
        message: 'Movie not found',
      })
    }
    const payload = request.only([
      'title',
      'description',
      'director',
      'duration',
      'minAge',
      'images',
    ])
    movie.merge(payload)
    await movie.save()

    return response.ok({
      message: 'Movie updated successfully',
      data: movie,
    })
  }
  /**
   * @destroy
   * @tag Movies
   */
  async destroy({ params, response }: HttpContext) {
    const movie = await Movie.find(params.id)

    if (!movie) {
      return response.notFound({
        message: 'Movie not found',
      })
    }
    await movie.delete()

    return response.ok({
      message: 'Movie deleted successfully',
    })
  }
}
