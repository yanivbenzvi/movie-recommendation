import express    from 'express'
import userRoutes from './user.route'
import authRoutes from './auth.route'
import movieRoutes from './movie.route'

const router = express.Router()
/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'))

/**
 * GET v1/docs
 */
router.use('/docs', express.static('docs'))

router.use('/users', userRoutes)
router.use('/auth', authRoutes)
router.use('/movie', movieRoutes)

module.exports = router
