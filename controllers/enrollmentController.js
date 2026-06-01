const Enrollment = require("../models/enrollment")

exports.enrollCourse = async (req, res) => {
    try {

        const { courseId } = req.body

        const enrollment = await Enrollment.create({
            student: req.user.id,
            course: courseId
        })

        res.status(201).json({
            success: true,
            enrollment
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}