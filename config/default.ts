import { IServerConfig, IWarehouseServiceConfig, IConfig } from '../src/types/interfaces'

export default {
	server: <IServerConfig>{
		port: 3000,
		domain: process.env.DOMAIN || 'http://localhost:3000',
		logDirectory: 'logs'
	},
	warehouseService: <IWarehouseServiceConfig>{
		apiUrl: process.env.API_URL || 'https://dev.aux.boxpi.com',
		apiKey: process.env.API_KEY
	}
} as IConfig
