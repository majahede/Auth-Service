/**
 * API version 1 routes.
 *
 * @author Maja Hedegärd.
 * @version 1.0.0
 */

import express from 'express'
import { AccountController } from '../../../controllers/api/account-controller.js'

export const router = express.Router()

const controller = new AccountController()

router.post('/register', (req, res, next) => controller.register(req, res, next))

router.post('/login', (req, res, next) => controller.login(req, res, next))
