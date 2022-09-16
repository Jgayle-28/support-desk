const asyncHandler = require('express-async-handler')
const bycrypt = require('bcryptjs')
const { generateToken } = require('../helpers')

const User = require('../models/userModel')


// @desc Register new user
// @route /api/users
// @access public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  // validation
  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please include all fields')
  }

  // Find if user exists
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // hash passwords
  const salt = await bycrypt.genSalt(10)
  const hashedPassword = await bycrypt.hash(password, salt)

  // Create User
  const user = await User.create({ name, email, password: hashedPassword })

  // Send user data back
  if (user) {
    res.status(201).json({ _id: user._id, name: user.name, email: user.email, token: generateToken(user._id) })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})
// @desc Register new user
// @route /api/users/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  const passwordsMatch = await bycrypt.compare(password, user.password)

  // If user exists and passwords match
  if (user && passwordsMatch) {
    res.status(200).json({ _id: user._id, name: user.name, email: user.email, token: generateToken(user._id) })
  } else {
    res.status(401)
    throw new Error('Invalid credentials')
  }
})
// @desc Get current user
// @route /api/users/me
// @access private
const getMe = asyncHandler(async (req, res) => {
  const user = {
    id: req.user._id,
    email: req.user.email,
    name: req.user.name
  }
  res.status(200).json(user)
})

module.exports = {
  registerUser,
  loginUser,
  getMe
}