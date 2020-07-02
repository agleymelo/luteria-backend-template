import 'dotenv/config'

import express from 'express'
import cors from 'cors'

import route from './routes'

import './database'

class App {
  public app: express.Application;

  constructor () {
    this.app = express()

    this.middlaweres()
    this.routes()
  }

  private middlaweres (): void {
    this.app.use(cors())
    this.app.use(express.json())
  }

  private routes (): void {
    this.app.use(route)
  }
}

export default new App().app
