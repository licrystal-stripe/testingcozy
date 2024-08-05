import React from 'react'
import CheckoutNavigationBar from '@/components/CheckoutNavigationBar';

import {
  PaymentElement,
  useStripe,
  useElements,
  Elements
} from "@stripe/react-stripe-js";

import {AddressElement} from '@stripe/react-stripe-js';
import { DeliveryMethod } from './CustomPaymentFormComponents/DeliveryMethod';
import OrderSummary from './CustomPaymentFormComponents/OrderSummary';
import FooterComponent from './FooterComponent'
import {ExpressCheckoutElement} from '@stripe/react-stripe-js';

export default function CheckoutForm({parsedProducts, subtotal}) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = React.useState(null);

  {/** If a new payment is made we check the status of that payemnt intent */}
  React.useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  {/** When "Confirm Order" has been clicked, we then confirm the Payemnt Intent and redirect to the home page */}
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Used to disable form submission until Stripe.js has loaded.
      return;
    }


    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000",
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  //If you wanted to customize the payment element you could add those customizations into here
  const options = {

  }

  return (
    <div className="bg-[#faf7f0]">
      <CheckoutNavigationBar></CheckoutNavigationBar>
      <main className="mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <h1 className="sr-only">Checkout</h1>

          {/** Information Customer needs to fill out - Shipping Information, Delivery Method, Payment method */}
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
            <div>
              <div className="mx-auto max-w-lg">
              
              {/** Stripe express Checkout Element */}
              <ExpressCheckoutElement />

                {/** The Divider with the "or" in the center */}
                <div className="App">
                  <div class="relative my-4">
                    <div class="absolute inset-0 flex items-center" aria-hidden="true">
                      <div class = "w-full border-t border-brand-dark2"></div>
                    </div>
                    <div class="relative flex justify-center">
                      <span class="bg-[#faf7f0] px-4 text-sm font-bold text-brand-dark2">or</span>
                    </div>
                  </div>
                  
                  {/** Address Element */}
                  
                    <h2 className="text-lg font-medium text-gray-900">Shipping Information</h2>
                    <fieldset aria-label="Delivery method" className="mt-4">
                    <Elements stripe={stripe} options={options}>
                        <form>
                          <AddressElement options={{mode: 'shipping'}} />
                        </form>
                    </Elements>
                    </fieldset>
                    
                  {/** Delivery Methods - standard or express */}
                  <DeliveryMethod></DeliveryMethod>

                  {/** Payment Element */}
                  <div className="mt-10 border-t border-gray-200 pt-10">
                    <h2 className="text-lg font-medium text-gray-900">Payment method</h2>
                    <fieldset aria-label="Delivery method" className="mt-4">
                      <form id="payment-form" onSubmit={handleSubmit}>

                        <PaymentElement id="payment-element" options={paymentElementOptions} />

                        {/* Show any error or success messages */}
                        {message && <div id="payment-message">{message}</div>}
                      </form>
                    </fieldset>                
                </div>
              </div>
            </div>
          </div>

          {/* Order summary of what is in the Cart */}
          <OrderSummary parsedProducts={parsedProducts} subtotal={subtotal} handleSubmit={handleSubmit}></OrderSummary>

          </div>
        </div>
      </main>
      <FooterComponent></FooterComponent>
    </div>
    
  );
}