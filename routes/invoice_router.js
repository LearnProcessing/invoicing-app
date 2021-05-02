const invoiceRouter = require('express').Router()
const InvoiceController = require('../controllers/invoice_controller')

invoiceRouter.post('/', InvoiceController.addInvoice)
invoiceRouter.get('/', InvoiceController.getInvoices)
invoiceRouter.delete('/:id', InvoiceController.deleteInvoice)
invoiceRouter.put('/:id', InvoiceController.editInvoice)

module.exports = invoiceRouter