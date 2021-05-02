const { Course } = require('../models')
class CourseController {
    static async addCourse(req, res, next){
        try{
            const { course_name, instructor, price, income_sharing } = req.body
            const course = await Course.create({
                course_name,
                instructor,
                price,
                income_sharing
            })
            res.status(201).json(course)
        } catch(error){
            console.log(error)
        }
    }
    static async getCourses(req, res, next){
        try{
            const courses = await Course.findAll()
            res.status(200).json(courses)
        } catch(error){
            console.log(error)
        }
    }
    static async deleteCourse(req, res, next){
        try{
            const { id } = +req.params
            await Course.destroy({where: {id}})
            res.status(200).json({message: 'a course was deleted'})
        } catch(error){
            console.log(error)
        }
    }
    static async editCourse(req, res, next){
        try{
            const { course_name, instructor, price, income_sharing } = req.body
            const course = await Course.update({
                course_name,
                instructor,
                price,
                income_sharing
            }, {
                where: { id },
                returning: true
            })
            res.status(200).json(course)
        } catch(error){
            console.log(error)
        }
    }
}

module.exports = CourseController