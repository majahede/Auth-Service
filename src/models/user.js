/**
 * Mongoose model User.
 *
 * @author Maja Hedegärd
 * @version 1.0.0
 */
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import validator from 'validator'

const { isEmail } = validator

// Create a schema.
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'User email required.'],
    validate: isEmail
  },
  password: {
    type: String,
    required: [true, 'User password required.'],
    minLength: 10,
    maxLength: 1000
  },
  permissionLevel: Number
}, {
  timestamps: true,
  versionKey: false,
  toJSON: {
    /**
     * Performs a transformation of the resulting object to remove sensitive information.
     *
     * @param {object} doc - The mongoose document which is being converted.
     * @param {object} ret - The plain object representation which has been converted.
     */
    transform: function (doc, ret) {
      delete ret._id
    },
    virtuals: true // ensure virtual fields are serialized
  }
})

userSchema.virtual('id').get(function () {
  return this._id.toHexString()
})

// Salts and hashes password before save.
userSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 10)
})

/**
 * Authenticates a user.
 *
 * @param {string} email - ...
 * @param {string} password - ...
 * @returns {Promise<User>} ...
 */
userSchema.statics.authenticate = async function (email, password) {
  const user = await this.findOne({ email })

  // If no user found or password is wrong, throw an error.
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid username or password.')
  }

  // User found and password correct, return the user.
  return user
}

/**
 * Gets a user by ID.
 *
 * @param {string} id - The value of the id for the user to get.
 * @returns {Promise<User>} The Promise to be fulfilled.
 */
userSchema.statics.getById = async function (id) {
  return this.findOne({ _id: id })
}

/**
 * Inserts a new user.
 *
 * @param {object} userData - ...
 * @param {string} userData.email - ...
 * @param {string} userData.password - ...
 * @param {number} userData.permissionLevel - ...
 * @returns {Promise<User>} - ...
 */
userSchema.statics.insert = async function (userData) {
  const user = new User(userData)
  return user.save()
}

// create a model using the schema.
export const User = mongoose.model('User', userSchema)
