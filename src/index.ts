import express from 'express'
import cors from 'cors'
import path from 'path'
import http from 'http'
import fs from 'fs'
import helmet from 'helmet'
import * as bodyParser from 'body-parser'

// config
import config from '../config/default'

// middlewares
import errorMiddleware from './middlewares/errorMiddleware'
import requestMiddleware from './middlewares/requestMiddleware'

// API
import v1 from './api/v1'

const serverConfig = config.server

// ensure log directory exists
const logDirectory = path.resolve(process.cwd(), serverConfig.logDirectory)
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

const app = express()

app.use(helmet())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/apidoc', express.static('apidoc'))
app.use(requestMiddleware)
app.use('/api/v1', v1())
app.use(errorMiddleware)

const httpServer = http.createServer(app)

httpServer.listen(serverConfig.port).on('listening', () => {
	console.log(`Server started at port ${serverConfig.port}`)
})

export default httpServer