import mongoose from 'mongoose'

// Create a schema.
const accountSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    minLength: 10,
    maxLength: 1000
  }
})

// create a model using the schema.
export const Account = mongoose.model('Account', accountSchema)
