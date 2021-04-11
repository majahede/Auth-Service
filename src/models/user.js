/**
 * Mongoose model User.
 *
 * @author Maja Hedegärd
 * @version 1.0.0
 */
// import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
// import validator from 'validator'

// Create a schema.
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'User email required.']
  },
  password: {
    type: String,
    required: [true, 'User password required.'],
    minLength: 10,
    maxLength: 1000
  }
})

// create a model using the schema.
export const User = mongoose.model('User', userSchema)
