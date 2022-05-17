// @desc Get goals
// @route GET /api/goals
// @access Private
const getGoals = (inRequest, inResponse) => {
  inResponse.status(200).json({ message: 'Get goals' })
}

// @desc Set goals
// @route POST /api/goals
// @access Private
const setGoal = (inRequest, inResponse) => {
  inResponse.status(200).json({ message: 'Set goal' })
}

// @desc Update goal
// @route PUT /api/goals/:id
// @access Private
const updateGoal = (inRequest, inResponse) => {
  inResponse.status(200).json({ message: `Update goal ${inRequest.params.id}`})
}

// @desc Delete goal
// @route DELETE /api/goals/:id
// @access Private
const deleteGoal = (inRequest, inResponse) => {
  inResponse.status(200).json({ message: `Delete goal ${inRequest.params.id}`})
}

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
}