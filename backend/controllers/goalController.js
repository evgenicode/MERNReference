const asyncHandler = require('express-async-handler');

const Goal = require('../models/goalModel');
const User = require('../models/userModel');

// @desc Get goals
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler(async (inRequest, inResponse) => {
  const goals = await Goal.find({ user: inRequest.user.id })

  inResponse.status(200).json(goals)
})

// @desc Set goals
// @route POST /api/goals
// @access Private
const setGoal = asyncHandler(async (inRequest, inResponse) => {
  if (!inRequest.body.text) {
    inResponse.status(400)
    throw new Error("Please add a text field")
  }

  const goal = await Goal.create({
    text: inRequest.body.text,
    user: inRequest.user.id,
  })
  
  inResponse.status(200).json(goal)
})

// @desc Update goal
// @route PUT /api/goals/:id
// @access Private
const updateGoal = asyncHandler(async (inRequest, inResponse) => {
  const goal = await Goal.findById(inRequest.params.id)

  if (!goal) {
    inResponse.status(400)
    throw new Error('Goal not found')
  }


  // Check for user
  if (!inRequest.user) {
    inResponse.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  if (goal.user.toString() !== inRequest.user.id) {
    inResponse.status(401)
    throw new Error("User not authorized")
  }


  const updatedGoal = await Goal.findByIdAndUpdate(inRequest.params.id, inRequest.body, {
    new: true,
  })

  inResponse.status(200).json(updatedGoal)
})

// @desc Delete goal
// @route DELETE /api/goals/:id
// @access Private
const deleteGoal = asyncHandler(async (inRequest, inResponse) => {
  const goal = await Goal.findById(inRequest.params.id)

  if (!goal) {
    inResponse.status(400)
    throw new Error('Goal not found')
  }


  // Check for user
  if (!inRequest.user) {
    inResponse.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  if (goal.user.toString() !== inRequest.user.id) {
    inResponse.status(401)
    throw new Error("User not authorized")
  }

  await goal.remove();

  inResponse.status(200).json({ id: inRequest.params.id })
})

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
}