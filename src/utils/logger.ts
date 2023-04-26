
import * as winston from 'winston'
import * as path from 'path'
import WinstonDailyRotateFile from 'winston-daily-rotate-file'

import config from '../../config/default'

const logDirectory = config.server.logDirectory

const errorFileName = path.join(logDirectory, 'error-%DATE%.log')
const infoFileName = path.join(logDirectory, 'info-%DATE%.log')

// instantiate a new Winston Logger
export default winston.createLogger({
	format: winston.format.combine(
		winston.format.timestamp({
			format: 'YYYY-MM-DD HH:mm:ss'
		}),
		winston.format.printf((info: { timestamp: any; level: any; message: any }) => `${info.timestamp} ${info.level}: ${info.message}`)
	),
	transports: [
		new WinstonDailyRotateFile({
			filename: errorFileName,
			datePattern: 'YYYY-MM-DD',
			zippedArchive: false,
			level: 'error',
			maxSize: '500m',
			maxFiles: '120d'
		}),
		new WinstonDailyRotateFile({
			filename: infoFileName,
			datePattern: 'YYYY-MM-DD',
			zippedArchive: false,
			level: 'info',
			maxSize: '500m',
			maxFiles: '120d'
		})
	],
	exitOnError: false // do not exit on handled exceptions
})
