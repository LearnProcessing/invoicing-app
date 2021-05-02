const xlsxFile = require('read-excel-file/node')
const { Invoice, Course, CourseSold } = require('../models')


class InvoiceController {
    static async addInvoices(req, res, next){
        try{
            const rows = await xlsxFile('./data/import.xlsx', { sheet: 'Invoice' })
            let invoiceRecords = []
            function validateEmail(email) {
                const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(String(email).toLowerCase());
            }
            rows.map((row, index) => {
                let isExist = false
                if(index > 0 && row[1] !== '' && row[2] !== '' && row[3] !== '' && row[1] && row[2] && row[3] && (row[3] === 'CREDIT_CARD' || row[3] === 'TRANSFER') && validateEmail(row[2])){
                    
                    let dateArray = row[1].split('/')
                    let stringDate = dateArray[2]+'-'+ dateArray[1]+'-'+(Number(dateArray[0]) + 1).toString()

                    for(let i = 0; i < invoiceRecords.length; i++){
                        if(stringDate === invoiceRecords[i].date && row[2] === invoiceRecords[i].users_email && row[3] === invoiceRecords[i].payment_method){
                            isExist = true
                        }
                    }
                    if(!isExist){
                        invoiceRecords.push({
                            date: stringDate,
                            users_email: row[2],
                            payment_method: row[3]
                        })
                    }
                }
            })
            await Invoice.bulkCreate(invoiceRecords)
            next()
        } catch(error){
            next(error)
        }
    }

    static async addCourseSold(req, res, next){
        try {
            const courses = await Course.findAll()
            const rows = await xlsxFile('./data/import.xlsx', { sheet: 'Courses Sold' })
            let coursesSoldRecords = []
            rows.forEach((row, index) => {
                if(index > 0 && row[0] && row[1] && row[2] && row[3] && row[4]){
                    let CourseId = 0
                    courses.forEach(course => {
                        if(course.course_name === row[1]){
                            CourseId = course.id
                        }
                    })
                    coursesSoldRecords.push({
                        InvoiceId: row[0],
                        CourseId
                    })
                }
            })
            await CourseSold.bulkCreate(coursesSoldRecords)
            res.status(201).json(coursesSoldRecords)
        } catch(error){
            next(error)
        }
    }

    static async getInvoices(req, res, next){
        try{
            const {date, page, limit} = req.query

            let splittedDate = date.split('-')
            splittedDate[2] = (Number(splittedDate[2]) + 1).toString()
            let stringDate = splittedDate.join('-')

            const invoices = await Invoice.findAll({
                where: {date: new Date(stringDate)},
                include: {model: Course},
                limit,
                offset: (page * limit) - limit
            })
            let totalCCTransaction = 0
            let totalRevenue = 0
            invoices.forEach(invoice => {
                invoice.Courses.forEach(course => {
                    if(invoice.payment_method === 'CREDIT_CARD'){
                        totalCCTransaction += course.price
                    }
                    totalRevenue += course.price * course.income_sharing
                })
            })

            res.status(200).json({invoices, totalCCTransaction, totalRevenue})
        } catch(error){
            next(error)
        }
    }
    static async deleteInvoice(req, res, next){
        try{
            const { id } = +req.params
            await Invoice.destroy({
                where: {id}
            })

            await CourseSold.destroy({
                where: {
                    InvoiceId: id
                }
            })
            res.status(200).json({message: 'invoices was deleted'})
        } catch(error){
            next(error)
        }
    }
    static async editInvoice(req, res, next){
        try{
            const { id } = +req.params
            const { date, users_email, payment_method} = req.body
            const invoice = await Invoice.update({
                date,
                users_email,
                payment_method
            }, {
                where: { id },
                returning: true
            })
            res.status(200).json(invoice)
        } catch(error){
            next(error)
        }
    }
}

module.exports = InvoiceController