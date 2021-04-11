/**
 * Module for the AccountController.
 *
 * @author Maja Hedegärd
 * @version 1.0.0
 */
import createError from 'http-errors'
import { User } from '../../models/user.js'
import jwt from 'jsonwebtoken'

/**
 * Encapsulates a controller.
 */
export class AccountController {
  /**
   * Registers.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async register (req, res, next) {
    try {
      const user = await User.insert({
        email: req.body.email,
        password: req.body.password,
        permissionLevel: 1
      })
      res
        .status(201)
        .json({ id: user.id })
    } catch (error) {
      let err = error

      if (err.code === 11000) {
        // Duplicated keys.
        err = createError(409)
        err.innerException = error
      } else if (error.name === 'ValidationError') {
        // Validation error(s).
        err = createError(400)
        err.innerException = error
      }
      next(err)
    }
  }

  /**
   * Authenticate and log in user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async login (req, res, next) {
    const token = Buffer.from(process.env.ACCESS_TOKEN_SECRET, 'base64')
    try {
      const user = await User.authenticate(req.body.email, req.body.password)
      const payload = {
        email: user.email,
        permission_level: user.permissionLevel
      }

      // Create access token (JWT).
      const accessToken = jwt.sign(payload, token, {
        algorithm: 'RS256',
        expiresIn: process.env.ACCESS_TOKEN_LIFE
      })
      res
        .status(201)
        .json({
          access_token: accessToken
        })
    } catch (error) {
      const err = createError(401)
      err.innerException = error
      next(err)
    }
  }
}
