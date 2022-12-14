const axios = require('axios');

class PaymentService {
  async createPayment(variable) {
    const url = 'https://api.mercadopago.com/checkout/preferences';
    // [
    //   {
    //     title: "Dummy Title",
    //     description: "Dummy description",
    //     picture_url: "http://www.myapp.com/myimage.jpg",
    //     category_id: "category123",
    //     quantity: 1,
    //     unit_price: 10
    //   }
    // ],
    const body = {
      payer_email: variable.email,
      items: variable.items,
      back_urls: {
        failure: 'https://chilly-production.up.railway.app/paymentfailure',
        pending: 'https://chilly-production.up.railway.app/paymentpending',
        success: 'https://chilly-production.up.railway.app/paymentsuccess',
      },
    };
    const payment = await axios.post(url, body, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
    });

    return payment.data;
  }
}

module.exports = PaymentService;
