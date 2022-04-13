import dotenv from 'dotenv'
dotenv.config()

import config from 'config'
import log from './utils/logger'
import server from './app/server'

const port = config.get<number>('port')
const node_env = config.get<string>('node_env')

;(async () => {
    // log server
    await new server()
        .start(port)
        .then(() =>
            log.info(
                `@ App started at http://localhost:${port} in ${node_env} mode.`
            )
        )
        .catch((error) => log.error(error))
})()
