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
  const [showPaymentElement, setShowPaymentElement] = React.useState(true);

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
    setCreditCardFee(2)
  } else {
    setCreditCardFee(0)
  }
}, [isCreditCard])

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
        return_url:  `${req.headers.origin}/?payment_status=success`,
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

  const handleCreateConfirmationToken = async(e) => {
    e.preventDefault();
    console.log("made it in here")
    const{error: submitError} = await elements.submit();
    if (submitError) {
      handleError(submitError);
      return;
    }
    const {error, confirmationToken} = await stripe.createConfirmationToken({
      elements,
      params:{
        mode:'payment',
        currency: 'usd', 
        paymentMethodCreation: 'manual',
        setup_future_usage: 'off_session'
      }
    })
    console.log("this is the confirmation token")
    setConfirmationToken(confirmationToken.id)
    console.log(confirmationToken)
    console.log(confirmationToken.id)

  }

  const handleAddPaymentButton = async(e) => {
    console.log("made it inside the add payment button")
    e.preventDefault();

    if (!stripe || !elements) {
      return ;
    }

    const {error: submitError} = await elements.submit();

    if (submitError) {
      handleError(submitError);
      return;
    }

    const res = await fetch("/api/create-setup-intent", {
      method: "POST",
    })

    const {client_secret: clientSecret} = await res.json();

    console.log("this is the client secret")
    console.log(clientSecret)

    const confirmedPM = await stripe.confirmSetup({
      elements, 
      clientSecret, 
      redirect: 'if_required'
    })

    const paymentMethodId = confirmedPM.setupIntent.payment_method

    await fetch(`/api/get-payment-method?paymentMethodId=${paymentMethodId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setIsCreditCard(data.type==="card")
        //set card type here
    //setShowPaymentElement(false)
  });

  }

  

  const paymentElementOptions = {
    layout: "tabs",
    mode: 'setup', 
    currency: 'usd'
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
                      <form id="payment-form" onSubmit={handleAddPaymentButton}>
                        
                          <div className="p-4 mb-6 flex flex-col space-y-4">
                            {/* Show any error or success messages */}
                            {message && <div id="payment-message">{message}</div>}
                            <PaymentElement id="payment-element" options={paymentElementOptions}/>
                            <button
                                type="submit"
                                className="rounded-full bg-white w-full py-4 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                              >
                                Add Payment Method
                            </button>
                            <ExpressCheckoutElement />
                            <dt className="font-medium text-gray-900">Payment Information</dt>
                              <dd className="mt-2 space-y-2 sm:flex sm:space-x-4 sm:space-y-0">
                                <div className="flex-none">
                                  <svg width={36} height={24} viewBox="0 0 36 24" aria-hidden="true" className="h-6 w-auto">
                                    <rect rx={4} fill="#224DBA" width={36} height={24} />
                                    <path
                                      d="M10.925 15.673H8.874l-1.538-6c-.073-.276-.228-.52-.456-.635A6.575 6.575 0 005 8.403v-.231h3.304c.456 0 .798.347.855.75l.798 4.328 2.05-5.078h1.994l-3.076 7.5zm4.216 0h-1.937L14.8 8.172h1.937l-1.595 7.5zm4.101-5.422c.057-.404.399-.635.798-.635a3.54 3.54 0 011.88.346l.342-1.615A4.808 4.808 0 0020.496 8c-1.88 0-3.248 1.039-3.248 2.481 0 1.097.969 1.673 1.653 2.02.74.346 1.025.577.968.923 0 .519-.57.75-1.139.75a4.795 4.795 0 01-1.994-.462l-.342 1.616a5.48 5.48 0 002.108.404c2.108.057 3.418-.981 3.418-2.539 0-1.962-2.678-2.077-2.678-2.942zm9.457 5.422L27.16 8.172h-1.652a.858.858 0 00-.798.577l-2.848 6.924h1.994l.398-1.096h2.45l.228 1.096h1.766zm-2.905-5.482l.57 2.827h-1.596l1.026-2.827z"
                                      fill="#fff"
                                    />
                                  </svg>
                                  <p className="sr-only">Visa</p>
                                </div>
                                <div className="flex-auto">
                                  <p className="text-gray-900">Ending with 4242</p>
                                  <p>Expires 12 / 21</p>
                                </div>
                              </dd>
                          </div>

                        
                      </form>
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