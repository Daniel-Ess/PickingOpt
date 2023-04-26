import { Router } from 'express'
import * as getTest from './getTest'

const router = Router()

export default () => {
	router.get('/', getTest.workflow)

	return router
}
