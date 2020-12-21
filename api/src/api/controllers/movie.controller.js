import httpStatus from 'http-status'
import {Movie}       from '../models/movie.model'

/**
 * Get movie list
 * @public
 */
export const list = async (req, res, next) => {
    try {
        const movies            = await Movie.getAll()
        const transformedUsers = movies.map(movie => new Movie(movie).transform())

        res.json(transformedUsers)
    } catch (error) {
        next(error)
    }
}
