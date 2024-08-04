const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const productsInCart = JSON.parse(req.body.productsInCart);
  switch (req.method) {
    case "POST":
      try {
        const lineItems = Object.values(productsInCart).map((product) => {
          return {
            price_data: {
              currency: 'usd',
              unit_amount: parseInt(product.price.replace('$', '')) * 100, // Convert "$13" to 1300 (in cents)
              product_data: {
                name: product.name,
                images: [product.imageSrc],
              },
            },
            quantity: product.quantity,
          };
        });
        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
          ui_mode: 'embedded',
          line_items: lineItems,
          mode: 'payment',
          return_url: `${req.headers.origin}/?payment_status=success`, // Redirect with a success query param          
          automatic_tax: {enabled: true},
        });

        res.send({clientSecret: session.client_secret});
      } catch (err) {
        res.status(err.statusCode || 500).json(err.message);
      }
      break;
    case "GET":
      try {
        const session =
          await stripe.checkout.sessions.retrieve(req.query.session_id);

        res.send({
          status: session.status,
          customer_email: session.customer_details.email
        });
      } catch (err) {
        res.status(err.statusCode || 500).json(err.message);
      }
      break;
    default:
      res.setHeader('Allow', req.method);
      res.status(405).end('Method Not Allowed');
  }
}