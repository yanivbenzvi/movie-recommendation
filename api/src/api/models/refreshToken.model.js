import crypto      from 'crypto'
import moment      from 'moment-timezone'
import {Datastore} from '@google-cloud/datastore'

const datastore = new Datastore()

export class RefreshToken {

    /**
     *
     * @param token
     * @param userId
     * @param userEmail
     * @param expires
     */
    constructor({token, userName, userEmail, expires}) {
        this.token     = token
        this.userName  = userName
        this.userEmail = userEmail
        this.expires   = expires
    }

    /**
     * Generate a refresh token object and saves it into the database
     *
     * @param {User} user
     * @returns {RefreshToken}
     */
    static async generate(user) {
        const userName  = user.name
        const userEmail = user.email
        const token     = `${userName}.${crypto.randomBytes(40).toString('hex')}`
        const expires   = moment().add(30, 'days').toDate()

        const tokenObject = new RefreshToken({
            token, userName, userEmail, expires,
        })

        await tokenObject.save()
        return tokenObject
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
     * @returns {Promise<RefreshToken>}
     */
    async save() {
        let schema    = this.toSchema()
        schema['key'] = datastore.key('refreshToken')

        try {
            await datastore.save(schema)
        } catch (err) {
            console.error('ERROR:', err)
        }

        return this
    }
}
