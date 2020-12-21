import {Datastore}                             from '@google-cloud/datastore'
import httpStatus                              from 'http-status'
import bcrypt                                  from 'bcryptjs'
import moment                                  from 'moment-timezone'
import jwt                                     from 'jwt-simple'
import APIError                                from '../utils/APIError'
import {env, jwtSecret, jwtExpirationInterval} from '../../config/vars'
import * as fs                                 from 'fs'
import * as path                               from 'path'

const datastore = new Datastore()

export class User {

    /**
     * Users constructor.
     * @param {String} name
     * @param {String} email
     * @param {String} password
     * @param {String} key
     */
    constructor({name, email, password}) {
        this.name     = name
        this.email    = email
        this.password = password
        this.created  = Date.now()
    }

    /**
     * Transform Object data in order to export only some of the data
     * @returns {Object}
     */
    transform() {
        const transformed = {}
        const fields      = ['id', 'name', 'email', 'created']

        fields.forEach((field) => {
            transformed[field] = this[field]
        })

        return transformed
    }

    /**
     * Retrieve object schema
     * @returns {Object}
     */
    toSchema() {
        let schema = {data: []}

        Object.keys(this).forEach(property => {
            schema['data'].push({
                name:  property.toString(),
                value: this[property],
            })
        })

        return schema
    }

    /**
     * Save Model to Datastore.
     * @returns {Promise<User>}
     */
    async save() {
        const isDuplicate = await User.isDuplicateEmail(this.email)
        if (isDuplicate) {
            throw new APIError({
                message:  'Validation Error',
                errors:   [
                    {
                        field:    'email',
                        location: 'body',
                        messages: ['"email" already exists'],
                    },
                ],
                status:   httpStatus.CONFLICT,
                isPublic: true,
            })
        }

        const rounds  = env === 'test' ? 1 : 10
        this.password = await bcrypt.hash(this.password, rounds)
        let schema    = this.toSchema()
        schema['key'] = datastore.key('users')

        try {
            await datastore.save(schema)
        } catch (err) {
            console.error('ERROR:', err)
        }

        return this
    }

    /**
     * Get a specific users by his id.
     * @param {String} Key
     * @returns {Promise<User>}
     */
    static async findByKey(Key) {
        const userKey  = datastore.key('users')
        const [entity] = await datastore.get(userKey)

        return new User(entity)
    }

    /**
     * Find user by email.
     * @param {String} email
     * @return {Promise<User>}
     */
    static async findByEmail(email) {
        const query  = datastore
            .createQuery('users')
            .filter('email', '=', email)
            .limit(1)
        const [user] = await datastore.runQuery(query)
        return !!user[0] ? new User(user[0]) : undefined
    }

    /**
     * Seed database with mock data.
     * @return {Promise<void>}
     */
    static async fetchMultiUsers() {
        const rawData     = fs.readFileSync(path.resolve(__dirname, '../seeds/users.json'))
        const seedersData = JSON.parse(rawData)
        let users         = []

        console.log('starting fetch users mock data.')
        seedersData.forEach(userSeed => {
            users.push(new User(userSeed).save())
        })
        await Promise.all(users)
    }

    /**
     * check if login password is match to user password.
     * @param password
     * @return {Promise<Boolean>}
     */
    async isPasswordMatches(password) {
        return await bcrypt.compare(password, this.password)
    }

    token() {
        const playload = {
            exp: moment().add(jwtExpirationInterval, 'minutes').unix(),
            iat: moment().unix(),
            sub: this.name,
        }
        return jwt.encode(playload, jwtSecret)
    }

    /**
     * Return new validation error
     * if error is a mongoose duplicate key error
     *
     * @param {String} email
     * @returns {Error|APIError}
     */
    static async isDuplicateEmail(email) {
        const user = await User.findByEmail(email)
        return !!user
    }

    /**
     *
     * @param options
     * @return {Promise<{accessToken: string, user: User}>}
     */
    static async findAndGenerateToken(options) {
        const {email, password, refreshObject} = options

        if (!email) {
            throw new APIError({message: 'An email is required to generate a token'})
        }

        const user = await User.findByEmail(email)
        const err  = {
            status:   httpStatus.UNAUTHORIZED,
            isPublic: true,
        }

        if (password) {
            if (user && await user.isPasswordMatches(password)) {
                return {user, accessToken: user.token()}
            }

            err.message = 'Incorrect email or password'
        } else if (refreshObject && refreshObject.userEmail === email) {

            if (moment(refreshObject.expires).isBefore()) {
                err.message = 'Invalid refresh token.'
            }
            else {
                return {user, accessToken: user.token()}
            }
        } else {
            err.message = 'Incorrect email or refreshToken'
        }
        throw new APIError(err)
    }
}
