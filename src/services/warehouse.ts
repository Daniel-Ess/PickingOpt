// eslint-disable-next-line import/no-extraneous-dependencies
import request from 'request'
import config from 'config'
import { map } from 'lodash'

import ErrorBuilder from '../utils/ErrorBuilder'
import { IProductPosition, IWarehouseServiceConfig } from '../types/interfaces'

const warehouseServiceConfig: IWarehouseServiceConfig = config.get('warehouseService')
const { apiUrl, apiKey } = warehouseServiceConfig

const getProductPositions = (productId: string): Promise<{ body: IProductPosition[] }> => new Promise((resolve, reject) => {
	request({
		url: `${apiUrl}/case-study/products/${productId}/positions`,
		method: 'GET',
		headers: {
			'x-api-key': apiKey
		},
		json: true
	}, (err, response, body) => {
		if (err) {
			return reject(err)
		}
		if (response.statusCode !== 200) {
			return reject(new ErrorBuilder(401, 'Unauthorized'))
		}
		return resolve({ body })
	})
})

// Get all products positions
export default async (productIds: string[]) => map(await Promise.all(
	map(productIds, (productId) => getProductPositions(productId))
), (position) => position.body)
