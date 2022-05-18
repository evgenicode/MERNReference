const asyncHandler = require('express-async-handler')

// @desc Get goals
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler(async (inRequest, inResponse) => {
  inResponse.status(200).json({ message: 'Get goals' })
})

// @desc Set goals
// @route POST /api/goals
// @access Private
const setGoal = asyncHandler(async (inRequest, inResponse) => {
  if (!inRequest.body.text) {
    inResponse.status(400)
    throw new Error("Please add a text field")
  }

  inResponse.status(200).json({ message: 'Set goal' })
})

// @desc Update goal
// @route PUT /api/goals/:id
// @access Private
const updateGoal = asyncHandler(async (inRequest, inResponse) => {
  inResponse.status(200).json({ message: `Update goal ${inRequest.params.id}`})
})

// @desc Delete goal
// @route DELETE /api/goals/:id
// @access Private
const deleteGoal = asyncHandler(async (inRequest, inResponse) => {
  inResponse.status(200).json({ message: `Delete goal ${inRequest.params.id}`})
})

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
}