'use server'

import pino, { Logger } from 'pino'
import { CustomError } from './custom-error'

const streams = [
    { stream: process.stdout },
    {
        stream: pino.destination({
            dest: 'src/log/app.log',
            append: 'stack',
        }),
    },
]

const logger: Logger = pino(
    {
        timestamp: pino.stdTimeFunctions.isoTime,
        transport: {
            target: 'pino-pretty',
            options: {
                colorize: true,
            },
        },
        level: process.env.PINO_LOG_LEVEL || 'info',
        redact: [],
    },
    pino.multistream(streams),
)

export const logError = async (err: unknown) => {
    if (err instanceof CustomError) return logger.error(err.data)
    return logger.error(err)
}
