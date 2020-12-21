import express                         from 'express'
import * as controller                 from '../../controllers/wishList.controller'
import {authorize, LOGGED_USER} from '../../middlewares/auth'

const router = express.Router()


router
    .route('/')
    /**
     * @api {get} v1/wish-list get all movies list
     * @apiDescription list all movie
     * @apiVersion 1.0.0
     * @apiName ListMovie
     * @apiGroup Movie
     *
     * @apiHeader {String} Authorization   User's access token
     *
     * @apiSuccess (Created 201) {String}  name       User's name
     * @apiSuccess (Created 201) {String}  email      User's email
     * @apiSuccess (Created 201) {Date}    created    Timestamp
     *
     * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
     * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
     * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
     */
    .get(controller.list)

    .post(controller.addItem)

module.exports = router //TODO : convert to ES6
