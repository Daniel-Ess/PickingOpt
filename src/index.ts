import http from 'http'
import app from './app'
import config from '../config/default'

const serverConfig = config.server
const httpServer = http.createServer(app)

httpServer.listen(serverConfig.port).on('listening', () => {
	console.log(`Server started at port ${serverConfig.port}`)
})

export default httpServer
