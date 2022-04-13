import logger from 'pino'
import day from 'dayjs'

const log = logger({
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true,
        },
    },
    timestamp: () => `,"time":"${day().format()}"`,
})

export default log
