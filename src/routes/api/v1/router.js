/**
 * API version 1 routes.
 *
 * @author Maja Hedegärd.
 * @version 1.0.0
 */

import express from 'express'
import { router as userRouter } from './user-router.js'

export const router = express.Router()

router.get('/', (req, res) => res.json({ message: 'Hooray! Welcome to version 1 of this very simple RESTful API! (Picture it - Auth' }))
router.use('/users', userRouter)
