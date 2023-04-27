import { Router } from 'express'

import PickingOrderRouter from './pickingOrder'

const router = Router()

export default () => {
	router.use('/picking-order', PickingOrderRouter())

	return router
}
