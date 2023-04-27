import supertest from 'supertest'
import Joi from 'joi'

import app from '../../../../src/app'

const endpoint = '/api/v1/picking-order'

const validationScheme = Joi.object({
	pickingOrder: Joi.array().items(Joi.object({
		productId: Joi.string().max(100).required(),
		positionId: Joi.string().max(100).required()
	})).required(),
	distance: Joi.number().min(0).required(),
})

describe(`[POST] ${endpoint})`, () => {
	const request = supertest(app)

	it('Response should return code 200', async () => {
		const response = await request.post(endpoint)
			.set('Content-Type', 'application/json')
		expect(response.status).toBe(200)
		expect(response.type).toBe('application/json')

		const validationResult = validationScheme.validate(response.body)
		expect(validationResult.error).toBeUndefined()
	})
})
