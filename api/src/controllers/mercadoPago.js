class PaymentController {
  constructor(subscriptionService) {
    this.subscriptionService = subscriptionService;
  }

  async getPaymentLink(req, res) {
    try {
      let { items } = req.body;
      let { email } = req.body;
      let cart = items.map((e) => {
        return {
          title: e.name,
          description: e.name,
          picture_url: e.image,
          category_id: e.categoryName,
          quantity: e.quantity,
          unit_price: Math.ceil(e.price),
        };
      });
      const payment = await this.subscriptionService.createPayment({
        email: email,
        items: cart,
      });
      return res.json(payment);
    } catch (error) {
      console.log(error.response.data);

      return res
        .status(500)
        .json({ error: true, msg: 'Failed to create payment' });
    }
  }
}

module.exports = PaymentController;
