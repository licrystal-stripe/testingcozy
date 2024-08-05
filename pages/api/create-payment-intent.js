// This is your test secret API key.
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const { orderAmount } = req.body;
  let paymentIntent = undefined;

  if ((process.env.PAYMENT_METHOD_CONFIGURATION) && orderAmount > 500) {
    paymentIntent = await stripe.paymentIntents.create({
      amount: orderAmount*100,
      currency: "usd",
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      },
      payment_method_configuration: (process.env.PAYMENT_METHOD_CONFIGURATION)
    });
  
  } else {
    paymentIntent = await stripe.paymentIntents.create({
      amount: orderAmount*100,
      currency: "usd",
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      },
    });
  }
  // Create a PaymentIntent with the order amount and currency

  res.send({
    clientSecret: paymentIntent.client_secret,
  });

};