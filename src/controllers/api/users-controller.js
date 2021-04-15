/**
 * Module for the UsersController.
 *
 * @author Maja Hedegärd
 * @version 1.0.0
 */

import createError from 'http-errors'
import { User } from '../../models/user.js'

/**
 * Encapsulates a controller.
 */
export class UsersController {
  /**
   * Provide req.user to the route if :id is present.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @param {string} id - The value of the id for the user to load.
   */
  async loadUser (req, res, next, id) {
    try {
      // Get the user.
      const user = await User.getById(id)

      // Provide the user to req.
      req.user = user

      // Next middleware.
      next()
    } catch (error) {
      let err = error
      if (error.kind === 'ObjectId') {
        err = createError(404)
      }
      next(err)
    }
  }

  /**
   * Sends a JSON response containing a user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async find (req, res, next) {
    res.json(req.user)
  }
}
