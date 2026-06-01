const Course = require("../models/course")

// Create Course
exports.createCourse = async (req, res) => {
    try {

        const { title, description } = req.body

        const course = await Course.create({
            title,
            description,
            teacher: req.user.id
        })

        res.status(201).json({
            success: true,
            course
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

// Get All Courses
exports.getCourses = async (req, res) => {
    try {

        const courses = await Course.find()
            .populate("teacher", "name email")

        res.status(200).json({
            success: true,
            courses
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}