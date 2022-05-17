const express = require('express');
const router = express.Router();
const { getGoals, setGoal, updateGoal, deleteGoal } = require('../controllers/goalController');

router.route('/').get(getGoals).post(setGoal)
//router.get('/', getGoals); //replaced by router.route('/').get(getGoals).post(setGoal)
//router.post('/', setGoal); //replaced by router.route('/').get(getGoals).post(setGoal)

router.route('/:id').delete(deleteGoal).put(updateGoal)
//router.put('/:id', updateGoal);     //replaced by router.route('/:id').delete(deleteGoal).put(updateGoal)
//router.delete('/:id', deleteGoal);  //replaced by router.route('/:id').delete(deleteGoal).put(updateGoal)

module.exports = router;