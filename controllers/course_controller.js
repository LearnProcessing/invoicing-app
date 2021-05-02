const Course = require('../models/course')
class CourseController {
    static async addCourse(req, res, next){
        try{
            const { courseName, instructor, price, incomeSharing } = req.body
            const course = await Course.create({
                courseName,
                instructor,
                price,
                incomeSharing
            })
            res.status(201).json(course)
        } catch(error){
            console.log(error)
        }
    }
    static async getCourses(req, res, next){
        try{
            
        } catch(error){
            console.log(error)
        }
    }
    static async deleteCourse(req, res, next){
        try{

        } catch(error){
            console.log(error)
        }
    }
    static async editCourse(req, res, next){
        try{

        } catch(error){
            console.log(error)
        }
    }
}

module.exports = CourseController