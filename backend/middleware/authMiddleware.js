const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (inRequest, inResponse, next) => {
  let token

  if (inRequest.headers.authorization && inRequest.headers.authorization.startsWith('Bearer')){
    try {
      // Get token from header
      token = inRequest.headers.authorization.split(' ')[1]
      
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Get user from the token
      inRequest.user = await User.findById(decoded.id).select('-password')
      
      next()
    } catch (error) {
      console.log(error)
      inResponse.status(401)
      throw new Error ("Not authorized")
    }
  }

  if (!token) {
    inResponse.status(401)
    throw new Error("Not authorized, no token")
  }
})

module.exports = { protect }