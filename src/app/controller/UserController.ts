import { Request, Response } from 'express'

import * as Yup from 'yup'

import User from '../models/Users.model'

class UserController {
  /**
   * method to register a new user in the application
   */

  public async store (req: Request, res: Response): Promise<Response | void> {
    /**
     * validation of req.body entry
     */

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6)
    })

    /**
     * Validating that everything is according to req.body
     */

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' })
    }

    const userExist = await User.findOne({ where: { email: req.body.email } })

    if (userExist) {
      return res.status(400).json({ error: 'User already exist.' })
    }

    const { id, name, email } = await User.create(req.body)

    return res.json({
      id,
      name,
      email
    })
  }
}

export default new UserController()
