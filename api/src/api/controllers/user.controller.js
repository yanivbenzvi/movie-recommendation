import httpStatus from 'http-status'
import {User}       from '../models/user.model'

/**
 * Get user
 * @public
 */
export const get = (req, res) => res.json(req.locals.user.transform())

/**
 * Get logged in user info
 * @public
 */
export const loggedIn = (req, res) => res.json(req.user.transform())

/**
 * Create new user
 * @public
 */
export const create = async (req, res, next) => {
    try {
        const user      = new User(req.body)
        await user.save()
        res.status(httpStatus.CREATED)
        res.json(user.transform())
    } catch (error) {
        next(error)
    }
}

/**
 * Get user list
 * @public
 */
export const list = async (req, res, next) => {
    try {
        const users            = await User.list(req.query)
        const transformedUsers = users.map(user => user.transform())
        res.json(transformedUsers)
    } catch (error) {
        next(error)
    }
}
