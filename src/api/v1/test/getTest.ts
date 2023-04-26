import { Request, Response, NextFunction } from 'express'
import Joi from '@hapi/joi'

import ErrorBuilder from '../../../utils/ErrorBuilder'

export const schema = Joi.object({
	body: Joi.object(),
	query: Joi.object(),
	params: Joi.object()
})

export const workflow = async (req: Request, res: Response, next: NextFunction) => {
	try {
		return res.json({
			test: true,
		})
	} catch (error) {
		return next(error)
	}
}
