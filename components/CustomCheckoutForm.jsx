import React from 'react'
import CheckoutNavigationBar from '@/components/CheckoutNavigationBar';

import {
  PaymentElement,
  useStripe,
  useElements,
  Elements
} from "@stripe/react-stripe-js";

import {AddressElement} from '@stripe/react-stripe-js';


import {
  Radio,
  RadioGroup,
} from '@headlessui/react'

import { CheckCircleIcon, TrashIcon } from '@heroicons/react/20/solid'

export default function CheckoutForm({parsedProducts, subtotal}) {
  const stripe = useStripe();
  const elements = useElements();
  const deliveryMethods = [
    { id: 1, title: 'Standard', turnaround: '4–10 business days', price: '$5.00' },
    { id: 2, title: 'Express', turnaround: '2–5 business days', price: '$16.00' },
  ]


  const [message, setMessage] = React.useState(null);
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = React.useState(deliveryMethods[0])


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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
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

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  const options = {

  }


  return (
    <div className="bg-gray-50">
      <CheckoutNavigationBar></CheckoutNavigationBar>
      <main className="mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <h1 className="sr-only">Checkout</h1>

          <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
            <div>
              {/*Add in payment element*/}
              <div className="mx-auto max-w-lg">
             
            
            <div className="App">

            <div className="mt-10 border-t border-gray-200 pt-10">
                <h2 className="text-lg font-medium text-gray-900">Shipping Information</h2>
                <fieldset aria-label="Delivery method" className="mt-4">
                <Elements stripe={stripe} options={options}>
                    <form>
                      <h3>Shipping</h3>
                      <AddressElement options={{mode: 'shipping'}} />
                    </form>
                </Elements>
                </fieldset>
                
              </div>

            <div className="mt-10 border-t border-gray-200 pt-10">
                <h2 className="text-lg font-medium text-gray-900">Delivery method</h2>

                <fieldset aria-label="Delivery method" className="mt-4">
                  <RadioGroup
                    value={selectedDeliveryMethod}
                    onChange={setSelectedDeliveryMethod}
                    className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4"
                  >
                    {deliveryMethods.map((deliveryMethod) => (
                      <Radio
                        key={deliveryMethod.id}
                        value={deliveryMethod}
                        aria-label={deliveryMethod.title}
                        aria-description={`${deliveryMethod.turnaround} for ${deliveryMethod.price}`}
                        className="group relative flex cursor-pointer rounded-lg border border-gray-300 bg-white p-4 shadow-sm focus:outline-none data-[checked]:border-transparent data-[focus]:ring-2 data-[focus]:ring-indigo-500"
                      >
                        <span className="flex flex-1">
                          <span className="flex flex-col">
                            <span className="block text-sm font-medium text-gray-900">{deliveryMethod.title}</span>
                            <span className="mt-1 flex items-center text-sm text-gray-500">
                              {deliveryMethod.turnaround}
                            </span>
                            <span className="mt-6 text-sm font-medium text-gray-900">{deliveryMethod.price}</span>
                          </span>
                        </span>
                        <CheckCircleIcon
                          aria-hidden="true"
                          className="h-5 w-5 text-indigo-600 [.group:not([data-checked])_&]:hidden"
                        />
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute -inset-px rounded-lg border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-indigo-500"
                        />
                      </Radio>
                    ))}
                  </RadioGroup>
                </fieldset>
              </div>

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

            {/* Order summary */}
            <div className="mt-10 lg:mt-0">
              <h2 className="text-lg font-medium text-gray-900">Order summary</h2>

              <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
                <h3 className="sr-only">Items in your cart</h3>
                <ul role="list" className="divide-y divide-gray-200">
                  {Object.values(parsedProducts).map((product) => (
                    <li key={product.id} className="flex px-4 py-6 sm:px-6">
                      <div className="flex-shrink-0">
                        <img alt={product.imageAlt} src={product.imageSrc} className="w-20 rounded-md" />
                      </div>

                      <div className="ml-6 flex flex-1 flex-col">
                            <div className="flex">
                              <div className="min-w-0 flex-1">
                                <h4 className="text-sm">
                                  <a href={product.imageSrc} className="font-medium text-gray-700 hover:text-gray-800">
                                    {product.name}
                                  </a>
                                </h4>
                                <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                <p className="mt-1 text-sm text-gray-500">{product.size}</p>
                              </div>

                              <div className="ml-4 flow-root flex-shrink-0">
                                  <button
                                    type="button"
                                    className="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500"
                                  >
                                    <span className="sr-only">Remove</span>
                                    <TrashIcon aria-hidden="true" className="h-5 w-5" />
                                  </button>
                              </div>
                            </div>

                            <div className="flex flex-1 items-end justify-between pt-2">
                              <p className="mt-1 text-sm font-medium text-gray-900">{product.price}</p>

                                <div className="flex space-x-4">
                                  <p className="text-gray-500">{product.quantity}</p>
                                </div>
                            </div>
                        </div>
                    </li>
                  ))}
                </ul>
                <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex items-center justify-between">
                    <dt className="text-sm">Subtotal</dt>
                    <dd className="text-sm font-medium text-gray-900">${subtotal}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-sm">Shipping</dt>
                    <dd className="text-sm font-medium text-gray-900">$0.00</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-sm">Taxes</dt>
                    <dd className="text-sm font-medium text-gray-900">$0.00</dd>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                    <dt className="text-base font-medium">Total</dt>
                    <dd className="text-base font-medium text-gray-900">${subtotal}</dd>
                  </div>
                </dl>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <button
                    type="submit"
                    className="w-full rounded-md border border-transparent px-4 py-3 text-base font-medium text-black shadow-sm hover:bg-[#ece1c7] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 bg-[#e2d2ac]"
                    onClick={handleSubmit}
                  >
                    Confirm order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

    </div>
    
  );
}