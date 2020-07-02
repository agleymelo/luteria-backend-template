import { Router } from 'express'

import SessionController from './app/controller/SessionController'
import UserController from './app/controller/UserController'

import authenticateMiddleware from './app/middlewares/authenticate'

const routes = Router()

routes.post('/session', SessionController.store)
routes.post('/user', UserController.store)

routes.use(authenticateMiddleware)

routes.get('/', (req, res) => {
  return res.json({ ok: true })
})

export default routes
