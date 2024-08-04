import React from 'react'
import { loadStripe } from "@stripe/stripe-js";
import CustomCheckoutForm from "../components/CustomCheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import {useRouter } from 'next/router';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function PaymentElementUpdated() {
  const [clientSecret, setClientSecret] = React.useState("");
  const router = useRouter();
  const {productsInCart, subtotal} = router.query;
  const parsedProducts = productsInCart ? JSON.parse(productsInCart):[]

  // Create PaymentIntent as soon as the page loads
  React.useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        orderAmount: subtotal
      }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };
  
  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CustomCheckoutForm parsedProducts={parsedProducts} subtotal={subtotal}/>
        </Elements>
      )}
    </div>
  )
}
