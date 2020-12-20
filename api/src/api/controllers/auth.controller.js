import httpStatus              from 'http-status'
import {User}                  from '../models/user.model'
import {RefreshToken}          from '../models/refreshToken.model'
import moment                  from 'moment-timezone'
import {jwtExpirationInterval} from '../../config/vars'

/**
 * Returns a formatted object with tokens.
 * @param {User} user
 * @param {String} accessToken
 * @private
 */
async function generateTokenResponse(user, accessToken) {
    const tokenType    = 'Bearer'
    const refreshToken = (await RefreshToken.generate(user)).token
    const expiresIn    = moment().add(jwtExpirationInterval, 'minutes')

    return {
        tokenType,
        accessToken,
        refreshToken,
        expiresIn,
    }
}

/**
 * Returns jwt token if registration was successful
 * @public
 */
exports.register = async (req, res, next) => {
    try {
        const userData        = req.body
        const user            = await new User(userData).save()
        const userTransformed = user.transform()
        const token           = await generateTokenResponse(user, user.token())
        console.log(token)
        res.status(httpStatus.CREATED)
        return res.json({token, user: userTransformed})
    } catch (error) {
        return next(error)
    }
}

/**
 * Returns jwt token if valid username and password is provided
 * @public
 */
exports.login = async (req, res, next) => {
    try {
        const {user, accessToken} = await User.findAndGenerateToken(req.body)
        const token               = await generateTokenResponse(user, accessToken)
        const userTransformed     = user.transform()
        return res.json({token, user: userTransformed})
    } catch (error) {
        return next(error)
    }
}

/**
 * login with an existing user or creates a new one if valid accessToken token
 * Returns jwt token
 * @public
 */
exports.oAuth = async (req, res, next) => {
    try {
        const {user}          = req
        const accessToken     = user.token()
        const token           = generateTokenResponse(user, accessToken)
        const userTransformed = user.transform()
        return res.json({token, user: userTransformed})
    } catch (error) {
        return next(error)
    }
}

/**
 * Returns a new jwt when given a valid refresh token
 * @public
 */
exports.refresh = async (req, res, next) => {
    try {
        const {email, refreshToken} = req.body
        const refreshObject         = await RefreshToken.findOneAndRemove({
            userEmail: email,
            token:     refreshToken,
        })
        const {user, accessToken}   = await User.findAndGenerateToken({email, refreshObject})
        const response              = generateTokenResponse(user, accessToken)
        return res.json(response)
    } catch (error) {
        return next(error)
    }
}
