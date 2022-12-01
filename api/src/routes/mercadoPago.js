const { Router } = require("express");
const PaymentController = require('../controllers/mercadoPago')
const PaymentServices = require('../services/mercadoPago')
const mercadoPago = Router()
const paymentInstace = new PaymentController(new PaymentServices())

mercadoPago.post('/', async (req, res) => {
  paymentInstace.getPaymentLink(req, res)
})


module.exports = mercadoPago