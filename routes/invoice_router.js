const invoiceRouter = require('express').Router()
const InvoiceController = require('../controllers/invoice_controller')

invoiceRouter.get('/', InvoiceController.getInvoices)
invoiceRouter.post('/', InvoiceController.addInvoices, InvoiceController.addCourseSold)
invoiceRouter.delete('/:id', InvoiceController.deleteInvoice)
invoiceRouter.put('/:id', InvoiceController.editInvoice)

module.exports = invoiceRouter