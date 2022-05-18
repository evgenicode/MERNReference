const errorHandler = (error, inRequest, inResponse, next) => {
  const statusCode = inResponse.statusCode ? inResponse.statusCode : 500

  inResponse.status(statusCode)

  inResponse.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? null : error.stack
  })
}

module.exports = {
  errorHandler,
}