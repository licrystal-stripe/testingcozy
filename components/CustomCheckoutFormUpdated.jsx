import React from 'react'
import CheckoutNavigationBar from '@/components/CheckoutNavigationBar';
import { useEffect } from 'react'

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
import { useCart } from '@/context/CartContext';
import { calculateSubtotal } from '@/utils/helperFunctions';

export default function CheckoutForm({subtotal}) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = React.useState(null);
  const [newSubtotal, setNewSubtotal] = React.useState(subtotal)
  const { productsInCart, numItems, setNumItems } = useCart();
  const [creditCardFee, setCreditCardFee] = React.useState(0);
  const [errorMessage, setErrorMessage] = React.useState(false);
  const [loading, setLoading]  = React.useState(false);
  const [isCreditCard, setIsCreditCard] = React.useState(false);
  const [confirmationToken, setConfirmationToken] = React.useState();

  {/** If a new payment is made we check the status of that payment intent */}
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
  }, [stripe, productsInCart]);


  useEffect(() => {
    // Recalculate the items in the Cart
    setNumItems(numItems);

    //Recalculate the Subtotal
    const cartProducts = Object.values(productsInCart);
    // Calculate the subtotal by reducing the cart products
    const subtotal = calculateSubtotal(cartProducts)
    // Update the subtotal state
    setNewSubtotal(subtotal);
}, [numItems, productsInCart]);


useEffect(() => {
  if (isCreditCard) {
    "made it to the setCreditCardFee"
    setCreditCardFee((0.1*newSubtotal).toFixed(2))
  } else {
    "wrong part of useEffect"
    setCreditCardFee(0)
  }
}, [isCreditCard, newSubtotal])

  {/** When "Confirm Order" has been clicked, we then confirm the Payment Intent and redirect to the home page */}
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
        return_url: `${window.location.origin}/?payment_status=success`,
        //confirmation_token: confirmationToken
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

  const handleError = (error) => {
    setLoading(false);
    setErrorMessage(error.message);
  }

  const handlePaymentElementChange = async(e) => {
    if (e.value.type == "card" ) {
        console.log("made it in here")
       setIsCreditCard(true)
    } else {
        console.log("didn't make it")
        setIsCreditCard(false)
    }
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
                <div className="App">
                  
                  {/** Address Element */}
                  
                    <h2 className="text-lg font-medium text-gray-900">Shipping Information</h2>
                    <fieldset aria-label="Delivery method" className="mt-4">
                    <Elements stripe={stripe}>
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
                        
                          <div className="p-4 mb-6 flex flex-col space-y-4">
                          <ExpressCheckoutElement />
                            {/* Show any error or success messages */}
                            {message && <div id="payment-message">{message}</div>}
                            <PaymentElement id="payment-element" onChange={handlePaymentElementChange}/>
                          </div>                        
                    </fieldset>                
                  </div>
              </div>
            </div>
          </div>

          {/* Order summary of what is in the Cart */}
          <OrderSummary parsedProducts={productsInCart} subtotal={newSubtotal} handleSubmit={handleSubmit} creditCardFee={creditCardFee}></OrderSummary>

          </div>
        </div>
      </main>
      <FooterComponent></FooterComponent>
    </div>
    
  );
}