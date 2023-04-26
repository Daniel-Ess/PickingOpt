export interface IServerConfig {
	port: number
	domain: string
	logDirectory: string
}

export interface IExtServiceConfig {
	apiUrl: string
	apiKey: string
}

export interface IErrorBuilderItem {
	message: string,
	type: string,
	path?: string
}

export interface IConfig {
	server: IServerConfig,
	extService: IExtServiceConfig
}
