const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const customer = 'cus_Qcb77J6xmK3a8C'
  console.log("hi")
  switch (req.method) {
    //Get the past charges of a customer
    case "GET":
        try {
            console.log("made it into the api")
            const charges = await stripe.charges.list({
            customer: customer,
            limit: 3,
            });
            res.send(charges);
        } catch (err) {
            res.status(err.statusCode || 500).json(err.message);
        }
        break;
    default:
      res.setHeader('Allow', req.method);
      res.status(405).end('Method Not Allowed');
  }
}