import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { promisify } from 'util'

import authConfig from '../../config/auth'

export default async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: 'JWT token in missing' })
  }

  const [, token] = authHeader.split(' ')

  try {
    const decoded = await promisify<any, any, any>(jwt.verify)(
      token,
      String(authConfig.secret)
    )

    req.userId = decoded.id

    return next()
  } catch (err) {
    return res.status(401).json({ error: 'Invalid JWT Token' })
  }
}
