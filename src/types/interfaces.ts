export interface IServerConfig {
	port: number
	domain: string
	logDirectory: string
}

export interface IWarehouseServiceConfig {
	apiUrl: string
	apiKey: string
}

export interface IErrorBuilderItem {
	message: string
	type: string
	path?: string
}

export interface IConfig {
	server: IServerConfig
	warehouseService: IWarehouseServiceConfig
}

export interface IProductPosition {
	productId: string
	positionId: string
	x: number
	y: number
	z: number
	quantity: number
}

export interface IProduct {
	productId: string
}

export interface IPickingOrder {
	productId: string
	positionId: string
}
