// pages/api/create-intent.js
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Use environment variables for security

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const customerId = req.body.customerId; // Get customer ID from the request body

      const intent = await stripe.setupIntents.create({
        customer: customerId, // Provide the Customer ID
        automatic_payment_methods: { enabled: true },
      });
      console.log(intent);

      return res.status(200).json({ client_secret: intent.client_secret });
    } catch (error) {
      console.error('Error creating setup intent:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    // Handle any other HTTP methods
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}