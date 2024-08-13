// This is your test secret API key.
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const { order } = req.body;

  await stripe.refunds.create({
    charge: order.id,
  });

  res.send({
    message: "refund successful"
  });

};