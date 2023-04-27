import { Router } from 'express'
import * as postPickingOrder from './post.pickingOrder'
import validationMiddleware from '../../../middlewares/validationMiddleware'

const router = Router()

export default () => {
	router.post(
		'/',
		validationMiddleware(postPickingOrder.schema),
		postPickingOrder.workflow
	)

	return router
}
