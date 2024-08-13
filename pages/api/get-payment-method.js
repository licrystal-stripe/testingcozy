// pages/api/get-payment-method.js
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Use environment variables for security

export default async function handler(req, res) {
    // Only handle GET requests
    if (req.method === 'GET') {
        // Extract paymentMethodId from query parameters
        const { paymentMethodId } = req.query;

        if (!paymentMethodId) {
            return res.status(400).json({ error: 'Payment Method ID is required.' });
        }

        try {
            // Retrieve the payment method from Stripe
            const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);
            return res.status(200).json(paymentMethod); // Send back the payment method data
        } catch (err) {
            console.error('Error retrieving payment method:', err);
            return res.status(err.statusCode || 500).json({ error: err.message });
        }
    } else {
        // Handle any other HTTP methods
        res.setHeader('Allow', ['GET']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}