Promise = require('bluebird') // make bluebird default Promise
import {port, env} from './config/vars'
import logger      from './config/logger'
import app    from './config/express'

// listen to requests
app.listen(port, () => logger.info(`server started on port ${port} (${env})`))

/**
 * Exports express
 * @public
 */
module.exports = app
