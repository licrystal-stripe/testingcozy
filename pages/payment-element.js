import React from 'react'
import { loadStripe } from "@stripe/stripe-js";
import CustomCheckoutForm from "../components/CustomCheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import {useRouter } from 'next/router';
import { useCart } from '@/context/CartContext';
import { calculateSubtotal } from '@/utils/constants';
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function PaymentElementUpdated() {
  const [clientSecret, setClientSecret] = React.useState("");
  const router = useRouter();
  //const parsedProducts = productsInCart ? JSON.parse(productsInCart):[]
  const { productsInCart } = useCart();
  const [subtotal, setSubtotal] = React.useState(0)
  
  // Create PaymentIntent as soon as the page loads
  React.useEffect(() => {
    const cartProducts = Object.values(productsInCart);
    // Calculate the subtotal by reducing the cart products

    const subtotal = calculateSubtotal(cartProducts)
    
    //setSubtotal(subtotal)
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        orderAmount: subtotal,
        payment_method_configuration: "pmc_1PkYqWBYfGa6aRCPvMi8WqOX"
      }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [productsInCart]);

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
        <Elements key = {clientSecret} options={options} stripe={stripePromise}>
          <CustomCheckoutForm subtotal={subtotal}/>
        </Elements>
      )}
    </div>
  )
}
