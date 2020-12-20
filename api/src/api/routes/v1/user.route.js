import express                         from 'express'
import validate                        from 'express-validation'
import * as controller                 from '../../controllers/user.controller'
import {authorize, ADMIN, LOGGED_USER} from '../../middlewares/auth'
import {createUser}                    from '../../validations/user.validation'

const router = express.Router()


router
    .route('/')
    /**
     * @api {post} v1/users Create User
     * @apiDescription Create a new user
     * @apiVersion 1.0.0
     * @apiName CreateUser
     * @apiGroup User
     *
     * @apiHeader {String} Authorization   User's access token
     *
     * @apiParam  {String}             email     User's email
     * @apiParam  {String{..128}}      [name]    User's name
     * @apiParam  {String{6..128}}     password  User's password
     *
     * @apiSuccess (Created 201) {String}  name       User's name
     * @apiSuccess (Created 201) {String}  email      User's email
     * @apiSuccess (Created 201) {Date}    created    Timestamp
     *
     * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
     * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
     * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
     */
    .post(validate(createUser), controller.create)


router
    .route('/profile')
    /**
     * @api {get} v1/users/profile User Profile
     * @apiDescription Get logged in user profile information
     * @apiVersion 1.0.0
     * @apiName UserProfile
     * @apiGroup User
     * @apiPermission user
     *
     * @apiHeader {String} Authorization   User's access token
     *
     * @apiSuccess {String}  id         User's id
     * @apiSuccess {String}  name       User's name
     * @apiSuccess {String}  email      User's email
     * @apiSuccess {String}  role       User's role
     * @apiSuccess {Date}    createdAt  Timestamp
     *
     * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
     */
    .get(authorize(), controller.loggedIn)


module.exports = router //TODO : convert to ES6
