const { Router } = require("express");
<<<<<<< HEAD
const PaymentController = require('../controllers/mercadoPago')
const PaymentServices = require('../services/mercadoPago')
const mercadoPago = Router()
const paymentInstace = new PaymentController(new PaymentServices())
const { checkJwt } = require('../middleware/oAuth')

mercadoPago.post('/', checkJwt, async (req, res) => {
  paymentInstace.getPaymentLink(req, res)
})
=======
const PaymentController = require("../controllers/mercadoPago");
const PaymentServices = require("../services/mercadoPago");
const mercadoPago = Router();
const paymentInstace = new PaymentController(new PaymentServices());

mercadoPago.post("/", async (req, res) => {
  paymentInstace.getPaymentLink(req, res);
});
>>>>>>> f860e4b98399a789a276228d77fbcadd32c4d545

module.exports = mercadoPago;
