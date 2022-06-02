const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// @desc   Register new user
// @route  POST /api/users
// @access Public
const registerUser = asyncHandler(async (inRequest, inResponse) => {
  const { name, email, password } = inRequest.body

  if (!name || !email || !password) {
    inResponse.status(400)
    throw new Error('Please fill in all fields');
  }

  // Check if user exists
  const userExists = await User.findOne({email})

  if(userExists) {
    inResponse.status(400)
    throw new Error("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword
  })

  if (user) {
    inResponse.status(201).json({
      token: generateToken(user._id)
    })
  } else {
    inResponse.status(400)
    throw new Error("Invalid user data")
  }
})

// @desc   Authenticate a user
// @route  POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (inRequest, inResponse) => {
  const {email, password} = inRequest.body

  // Check for user email
  const user = await User.findOne({email});

  if (user && (await bcrypt.compare(password, user.password))) {
    inResponse.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    inResponse.status(400)
    throw new Error("Invalid credentials")
  }
})

// @desc   Get user data
// @route  GET /api/users/me
// @access Private
const getMe = asyncHandler(async (inRequest, inResponse) => {
  inResponse.status(200).json(inRequest.user)
})

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_Secret, { expiresIn: "30d" })
}

module.exports = {
  registerUser,
  loginUser,
  getMe,
}