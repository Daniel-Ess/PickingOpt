import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

import getProductsWithPositions from '../../../services/warehouse'
import getOptimizedPickingOrder from '../../../utils/warehouse'

export const schema = Joi.object({
	body: Joi.object({
		products: Joi.array().items(
			Joi.string().max(255).required()
		).optional().default([])
	}),
	query: Joi.object(),
	params: Joi.object()
})

export const workflow = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { body } = req
		const products = await getProductsWithPositions(body.products)
		const pickingOrder = getOptimizedPickingOrder(products)

		return res.json({
			pickingOrder: pickingOrder.positions,
			distance: pickingOrder.distance
		})
	} catch (error) {
		return next(error)
	}
}
