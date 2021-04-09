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
   * Registers user to database.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async register (req, res, next) {
    try {
    //
    } catch (error) {
      next(error)
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
    try {
      const user = await User.authenticate(req.body.email, req.body.password)
      const payload = {
        email: user.email,
        permission_level: user.permissionLevel
      }

      const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        algorithm: 'HS256',
        expiresIn: '1h'
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
