import React, { useCallback, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
import {useRouter } from 'next/router';
import NavigationBar from '@/components/NavigationBar';
import CheckoutNavigationBar from '@/components/CheckoutNavigationBar';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function EmbeddedCheckoutSession() {
  const router = useRouter();
  const {productsInCart, itemsInCart} = router.query;

  
  const fetchClientSecret = useCallback(() => {
    // Create a Checkout Session
    return fetch("/api/embedded_checkout_sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productsInCart: productsInCart,
        itemsInCart: itemsInCart }),
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, []);

  const options = {fetchClientSecret};

  return (
    <div className="bg-gray-50">
      <CheckoutNavigationBar></CheckoutNavigationBar>
      <div id="checkout">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={options}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
      <br></br>
      
    </div>
    
  )
}