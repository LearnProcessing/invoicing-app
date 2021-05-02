const courseRouter = require('express').Router()
const CourseController = require('../controllers/course_controller')

courseRouter.post('/', CourseController.addCourse)
courseRouter.get('/', CourseController.getCourses)
courseRouter.delete('/:id', CourseController.deleteCourse)
courseRouter.put('/:id', CourseController.editCourse)

module.exports = courseRouter
