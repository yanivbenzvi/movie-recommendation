import {Datastore} from '@google-cloud/datastore'


const datastore = new Datastore()

export class Wishlist {

    /**
     * Movie constructor.
     * @param {Array<String>} list
     * @param {String} belongTo
     * @param {String} id
     */
    constructor({list, id, belongTo}) {
        this.list     = list
        this.belongTo = belongTo
        this.id       = id ? id : ''
    }

    /**
     * Add movie id to the wish list.
     * @param {String} movieId
     * @returns {Wishlist}
     */
    addMovie(movieId) {
        if (!this.list.includes(movieId)) {
            this.list.push(movieId)
        }
        return this
    }

    /**
     * Transform Object data in order to export only some of the data.
     * @returns {Object}
     */
    transform() {
        const transformed = {}
        const fields      = ['id', 'list', 'belongTo']

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
        schema['key'] = datastore.key('wishList')

        try {
            console.log(schema)
            await datastore.save(schema)
        } catch (err) {
            console.error('ERROR:', err)
        }
        return this
    }

    /**
     * Get all movies.
     * @return {Promise<Movie[]>}
     */
    static async getByUser(userEmail) {
        const query    = datastore
            .createQuery('wishList')
            .filter('belongTo', '=', userEmail)
            .limit(1)
        const wishList = (await datastore.runQuery(query))[0][0]

        if (wishList) {
            wishList['id'] = wishList[datastore.KEY].id
        }
        return wishList
    }
}
