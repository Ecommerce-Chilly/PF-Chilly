const { Router } = require('express');
const Stripe = require('stripe');
const models = require('../db');
const { checkJwt } = require('../middleware/oAuth');
const { readEnvironment } = require('../config/env');
const {
  CheckoutError,
  StripeCheckoutService,
} = require('../services/stripeCheckout');

const checkoutRoute = Router();
const { stripeSecretKey, storefrontUrl } = readEnvironment();
const checkoutService = new StripeCheckoutService({
  stripe: new Stripe(stripeSecretKey),
  models,
  storefrontUrl,
});

function sendCheckoutError(error, res) {
  if (error instanceof CheckoutError) {
    return res.status(error.status).send({ error: error.message });
  }

  console.error('Stripe Checkout error:', error);
  return res.status(502).send({ error: 'Unable to communicate with Stripe.' });
}

checkoutRoute.post('/session', checkJwt, async (req, res) => {
  try {
    const session = await checkoutService.createSession({
      items: req.body.items,
      auth0Subject: req.auth.payload.sub,
    });
    return res.status(201).send(session);
  } catch (error) {
    return sendCheckoutError(error, res);
  }
});

checkoutRoute.post('/session/:sessionId/confirm', checkJwt, async (req, res) => {
  try {
    const result = await checkoutService.confirmSession({
      sessionId: req.params.sessionId,
      auth0Subject: req.auth.payload.sub,
    });
    return res.status(200).send(result);
  } catch (error) {
    return sendCheckoutError(error, res);
  }
});

module.exports = checkoutRoute;
