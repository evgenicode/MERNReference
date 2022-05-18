const asyncHandler = require('express-async-handler');

const Goal = require('../models/goalModel');

// @desc Get goals
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler(async (inRequest, inResponse) => {
  const goals = await Goal.find()

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

  await goal.remove();

  inResponse.status(200).json({ id: inRequest.params.id })
})

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
}