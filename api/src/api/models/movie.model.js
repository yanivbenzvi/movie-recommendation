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

export class Movie {

    /**
     * Movie constructor.
     * @param {String} name
     * @param {Blob}   image
     * @param {String} summary
     * @param {String} created
     */
    constructor({name, image, summary, rating}) {
        this.name    = name
        this.image   = image
        this.summary = summary
        this.rating  = rating
        this.created = Date.now()
    }

    /**
     * Transform Object data in order to export only some of the data.
     * @returns {Object}
     */
    transform() {
        const transformed = {}
        const fields      = ['name', 'image', 'summary', 'rating', 'created']

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
     * @returns {Promise<Movie>}
     */
    async save() {
        let schema    = this.toSchema()
        schema['key'] = datastore.key('movies')

        try {
            await datastore.save(schema)
        } catch (err) {
            console.error('ERROR:', err)
        }
        return this
    }

    /**
     * Find get all movies.
     * @return {Promise<Movie[]>}
     */
    static async getAll() {
        const query    = datastore
            .createQuery('movies')
        const [movies] = await datastore.runQuery(query)
        return movies?.length > 0 ? movies : []
    }
}
