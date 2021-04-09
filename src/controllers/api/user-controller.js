/**
 * Module for the ImagesController.
 *
 * @author Maja Hedegärd
 * @version 1.0.0
 */
// import createError from 'http-errors'
// import { User } from '../../models/user.js'

/**
 * Encapsulates a controller.
 */
export class UserController {
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
      //
    } catch (error) {
      next(error)
    }
  }
}
