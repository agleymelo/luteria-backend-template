import { Request, Response } from 'express'
import * as Yup from 'yup'

import jwt from 'jsonwebtoken'

import User from '../models/Users.model'

import authConfig from '../../config/auth'

class SessionController {
  /**
   * Controller responsible for user authentication in the application
   */

  public async store (req: Request, res: Response): Promise<Response | void> {
    /**
     * validation of req.body entry
     */

    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required()
    })

    /**
     * Validating that everything is according to req.body
     */

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' })
    }

    const { email, password } = req.body

    // checking if the email the user is trying to access exists
    const user = await User.findOne({ where: { email } })

    // unauthorized user
    if (!user) {
      return res.status(401).json({ error: 'User not found' })
    }

    // user password validation with the method created in the user model
    if (!(await user.checkPasswordHash(password))) {
      return res.status(401).json({ error: 'Password does not match' })
    }

    const { id, name } = user

    return res.json({
      user: {
        id,
        name,
        email
      },
      // passing the payload as a sign parameter and a unique string, and some token settings
      token: jwt.sign({ id: id }, String(authConfig.secret), {
        expiresIn: authConfig.expiresIn
      })
    })
  }
}

export default new SessionController()
