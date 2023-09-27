const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')
const assert = require('node:assert')

// get all workouts
const getWorkouts = async (req, res) => {
    const user_id = req.user._id
    const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 })

    res.status(200).json(workouts)
}

// get a single workout
const getWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout' })
    }

    const workout = await Workout.findById(id)

    if (!workout) {
        return res.status(404).json({ error: 'No such workout' })
    }

    res.status(200).json(workout)
}

// create a new workout
const createWorkout = async (req, res) => {
    const { title, load, reps } = req.body

    // add to the database
    try {
        assert(title && load && reps, 'Please fill in all fields')
        assert(typeof title === 'string', 'title must be a string')
        assert(typeof load === 'number', 'load must be a number')
        assert(typeof reps === 'number', 'reps must be a number')
        const user_id = req.user._id
        const workout = await Workout.create({ title, load, reps, user_id })
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout' })
    }

    const workout = await Workout.findOneAndDelete({ _id: id })

    if (!workout) {
        return res.status(404).json({ error: 'No such workout' })
    }

    res.status(200).json(workout)
}

// update a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout' })
    }

    const newData = {
        reps: req.body.reps,
        load: req.body.load
    }

    if (newData.reps === undefined || typeof newData.reps !== 'number') delete newData.reps
    if (newData.load === undefined || typeof newData.load !== 'number') delete newData.load

    const workout = await Workout.findOneAndUpdate(
        { _id: id }, 
        { ...newData },
        { new: true }
    )

    if (!workout) {
        return res.status(404).json({ error: 'No such workout' })
    }

    res.status(200).json(workout)
}

module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}
