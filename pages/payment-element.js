import React, {useEffect} from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useElements } from "@stripe/react-stripe-js";

import CustomCheckoutForm from "../components/CustomCheckoutForm";
import {useRouter } from 'next/router';
import { PlusIcon, MinusIcon } from '@heroicons/react/20/solid'

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

import { LockClosedIcon } from '@heroicons/react/20/solid'

const discount = { code: 'SPECIAL', amount: '$0.00' }
const taxes = '$0.00'
const shipping = '$0.00'

export default function PaymentElement() {
  const [clientSecret, setClientSecret] = React.useState("");
  const router = useRouter();
  const {productsInCart, subtotal} = router.query;
  const parsedProducts = productsInCart ? JSON.parse(productsInCart):[]
  const finalAmount = `${subtotal}.00`

  React.useEffect(() => {
    // Create PaymentIntent as soon as the page loads
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
    <>
      <main className="lg:flex lg:min-h-full lg:flex-row-reverse lg:overflow-hidden background-color: white">
        
        

        <h1 className="sr-only">Checkout</h1>

        {/* Order summary */}
        <section aria-labelledby="summary-heading" className="hidden w-full max-w-md flex-col bg-gray-50 lg:flex">
          <h2 id="summary-heading" className="sr-only">
            Order summary
          </h2>

          <ul role="list" className="flex-auto divide-y divide-gray-200 overflow-y-auto px-6">
            {Object.values(parsedProducts).map((product) => (
              <li key={product.id} className="flex space-x-6 py-6">
                <img
                  src={product.imageSrc}
                  className="h-40 w-40 flex-none rounded-md bg-gray-200 object-cover object-center"
                />
                <div className="flex flex-col justify-between space-y-4">
                  <div className="space-y-1 text-sm font-medium">
                    <h3 className="text-gray-900">{product.name}</h3>
                    <p className="text-gray-900">{product.price}</p>
                    <p className="text-gray-500">{product.description}</p>
                    <p className="text-gray-500">{product.quantity}</p>
                    <span className="isolate inline-flex rounded-md shadow-sm">
                  </span>
                  </div>
                  <div className="flex space-x-4">
                  <button
                      type="button"
                      className="relative inline-flex items-center rounded-l-md bg-white px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
                    >
                      <span className="sr-only">Previous</span>
                      <PlusIcon aria-hidden="true" className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      className="relative -ml-px inline-flex items-center rounded-r-md bg-white px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
                    >
                      <span className="sr-only">Next</span>
                      <MinusIcon aria-hidden="true" className="h-5 w-5" />
                    </button>
                    <div className="flex border-l border-gray-300 pl-4">
                      <button type="button" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="sticky bottom-0 flex-none border-t border-gray-200 bg-gray-50 p-6">
            <form>
              <label htmlFor="discount-code" className="block text-sm font-medium text-gray-700">
                Discount code
              </label>
              <div className="mt-1 flex space-x-4">
                <input
                  id="discount-code"
                  name="discount-code"
                  type="text"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <button
                  type="submit"
                  className="rounded-md bg-gray-200 px-4 text-sm font-medium text-gray-600 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  Apply
                </button>
              </div>
            </form>

            <dl className="mt-10 space-y-6 text-sm font-medium text-gray-500">
              <div className="flex justify-between">
                <dt>Subtotal</dt>
                <dd className="text-gray-900">${finalAmount}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="flex">
                  Discount
                  <span className="ml-2 rounded-full bg-gray-200 px-2 py-0.5 text-xs tracking-wide text-gray-600">
                    {discount.code}
                  </span>
                </dt>
                <dd className="text-gray-900">-{discount.amount}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Taxes</dt>
                <dd className="text-gray-900">{taxes}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Shipping</dt>
                <dd className="text-gray-900">{shipping}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-6 text-gray-900">
                <dt className="text-base">Total</dt>
                <dd className="text-base">${finalAmount}</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* Checkout form */}
        <section
          aria-labelledby="payment-heading"
          className="flex-auto overflow-y-auto px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pb-24 lg:pt-0"
          style={{backgroundColor: 'white'}}
        >
          <div className="mx-auto max-w-lg">

             {/* Logo */}
             <div className="hidden pb-16 pt-10 lg:flex">
             <div className="hidden lg:flex lg:flex-1 lg:items-center lg:gap-4">
                <a href="/">
                  <span className="sr-only">Your Company</span>
                  <svg width="49" height="24" viewBox="0 0 49 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.19225 9.24055C5.63937 8.69407 6.08649 8.14759 6.55846 7.65078C7.15462 9.93608 8.8686 12.1965 10.4832 13.8112C12.7437 16.0965 15.6748 17.9346 17.9601 19.276C18.1092 19.3754 18.904 19.8225 19.3512 19.7976C19.5002 19.7976 19.6244 19.7231 19.7238 19.6238C19.8231 19.5244 19.8976 19.3754 19.8976 19.2263C19.8976 19.1021 19.9225 18.8786 19.525 18.5805C19.4257 18.506 19.3015 18.4314 19.1524 18.3321C18.2582 17.7111 16.7181 16.6926 14.0354 13.7366C10.4832 9.81188 9.63864 6.28457 9.43992 5.01772C9.96157 4.62028 10.4832 4.24767 11.0297 3.89991C11.0545 5.39032 11.601 7.30302 12.5449 9.24055C14.4825 13.1901 17.3888 16.1213 19.4505 17.7856C20.3944 18.5308 20.4938 18.6798 20.4938 19.276C20.4938 19.425 20.4441 19.5989 20.3448 19.7728C20.2702 19.897 20.2206 19.9964 20.1212 20.0709C20.0467 20.1454 19.9473 20.2199 19.8231 20.2944C19.6492 20.369 19.5002 20.4186 19.3263 20.4435C18.755 20.4683 17.513 19.8722 17.513 19.8722C14.8302 18.5805 12.6195 17.2888 10.8061 15.9226C7.4527 13.2895 5.86293 10.6316 5.19225 9.24055ZM20.1709 22.0084C20.6429 21.8594 21.09 21.611 21.4377 21.2632C21.7855 20.9154 22.0587 20.4683 22.1829 19.9964C22.5307 18.8289 22.1333 17.6614 21.0155 16.5436C20.8416 16.3697 20.6429 16.1958 20.469 15.9971C19.7238 15.3016 18.904 14.5067 18.606 13.5379C18.2582 12.4201 18.9537 11.8488 19.6244 11.2775C20.1709 10.8303 20.469 10.2342 20.469 9.61316C20.469 8.99215 20.1709 8.39599 19.6244 7.92402C19.3015 7.65078 17.4385 6.43361 17.041 6.08585C15.7245 4.89352 15.4264 3.50247 16.3952 1.26685C15.6997 1.51525 15.0041 1.78849 14.3583 2.08658C14.1596 3.10503 14.085 4.27251 14.5322 5.24128C15.7742 7.99854 19.1276 8.47051 19.2021 9.58832C19.2518 10.1596 18.8047 10.4826 18.4321 10.7806L18.4072 10.8055C17.7117 11.3271 17.3888 12.0475 17.4136 12.8175C17.4881 14.2583 18.4569 15.1525 19.5996 16.171C19.8231 16.3697 20.0715 16.5933 20.2951 16.8168L20.3448 16.8665C20.8416 17.3385 21.3881 17.8601 21.6116 18.5556C21.86 19.3008 21.6116 20.2199 21.0155 20.8161C20.6429 21.1887 20.146 21.4371 19.5002 21.5116C18.8295 21.5613 17.8111 21.2632 17.2397 21.0645C15.9729 20.6174 7.2043 17.9346 2.70823 13.1405C2.3853 13.7863 2.06238 14.457 1.78914 15.1277C6.88138 19.1021 15.1283 21.2881 16.9168 21.7849C18.0098 22.1078 19.1773 22.3065 20.1709 22.0084ZM32.8146 10.7806C31.4483 12.6188 30.1566 14.8048 28.865 17.4875C28.865 17.4875 28.2688 18.7295 28.2936 19.3008C28.2936 19.4747 28.3433 19.6238 28.4427 19.7976C28.5172 19.9218 28.5669 20.0212 28.6662 20.0957C28.7408 20.1702 28.8401 20.2448 28.9643 20.3193C29.1382 20.4186 29.2872 20.4435 29.4611 20.4683C30.0573 20.4683 30.2063 20.369 30.9515 19.425C32.591 17.3633 35.5221 14.457 39.4717 12.4946C41.4093 11.5259 43.322 10.9794 44.8124 10.9794C44.4646 10.4329 44.092 9.91124 43.6946 9.3896C42.4277 9.58832 38.9004 10.4329 34.9756 13.985C32.0197 16.6678 31.0012 18.2079 30.3802 19.1021C30.2808 19.2512 30.2063 19.3754 30.1318 19.4747C29.8586 19.8722 29.6102 19.8473 29.486 19.8473C29.3369 19.8473 29.2127 19.7728 29.0885 19.6734C28.9892 19.5741 28.9146 19.425 28.9146 19.3008C28.8898 18.8537 29.3369 18.0588 29.4363 17.9098C30.7777 15.6245 32.591 12.6933 34.8763 10.408C36.4909 8.81827 38.7514 7.1043 41.0367 6.48329C40.515 6.01133 39.9934 5.53936 39.4469 5.11708C38.0558 5.76293 35.3979 7.3527 32.8146 10.7806ZM26.679 20.0709C26.8281 20.5428 27.0765 20.99 27.4242 21.3377C27.772 21.6855 28.2191 21.9587 28.6911 22.0829C29.8586 22.4307 31.0261 22.0333 32.1439 20.9154C32.3177 20.7416 32.4916 20.5428 32.6904 20.369C33.3859 19.6238 34.1808 18.804 35.1495 18.506C36.2673 18.1582 36.8387 18.8537 37.41 19.5244C37.8571 20.0709 38.4533 20.369 39.0743 20.369C39.6953 20.369 40.2915 20.0709 40.7634 19.5244C41.0367 19.2015 42.2538 17.3385 42.6016 16.941C43.7939 15.6245 45.185 15.3264 47.4206 16.2952C47.1722 15.5996 46.8989 14.9041 46.6009 14.2583C45.5824 14.0596 44.4149 13.985 43.4462 14.4322C40.6889 15.6742 40.2418 19.0276 39.0991 19.127C38.5278 19.1766 38.2049 18.7295 37.9068 18.3569L37.882 18.3321C37.3603 17.6365 36.6399 17.3136 35.8699 17.3385C34.4292 17.413 33.5349 18.3817 32.5165 19.5244C32.3177 19.748 32.0942 19.9964 31.8706 20.2199L31.8209 20.2696C31.349 20.7664 30.8273 21.3129 30.1318 21.5365C29.3866 21.7849 28.4675 21.5365 27.8713 20.9403C27.4987 20.5677 27.2503 20.0709 27.1758 19.425C27.1261 18.7544 27.4242 17.7359 27.6229 17.1646C28.0701 15.8977 30.7528 7.12914 35.547 2.63306C34.9011 2.31014 34.2304 1.98722 33.5598 1.71397C29.5853 6.80622 27.3994 15.0532 26.9026 16.8665C26.6045 17.9098 26.4058 19.1021 26.679 20.0709ZM21.09 23.5982C21.6365 23.3746 22.1581 23.0517 22.5804 22.6294C23.0027 22.2071 23.3256 21.6855 23.5492 21.139C23.8969 20.2448 23.9714 19.3754 23.8969 18.4314C23.8472 17.7359 22.3568 2.80694 22.1084 0.0496806C21.4626 0.099361 20.8167 0.198722 20.1957 0.298083C20.8167 3.37827 23.1517 17.9346 23.2262 18.6798C23.3008 19.3257 23.3256 20.1702 23.0027 20.9403C22.8039 21.4123 22.5307 21.8594 22.1581 22.232C21.7855 22.5797 21.3384 22.8778 20.8664 23.0765C20.0964 23.3995 19.2518 23.3746 18.606 23.3001C17.8856 23.2256 3.67699 20.9403 0.348408 20.2944C0.249047 20.9154 0.149687 21.5613 0.100006 22.2071C3.25471 22.5052 17.662 23.946 18.3576 23.9956C19.3263 24.0205 20.1709 23.946 21.09 23.5982ZM25.2383 21.139C25.4619 21.6855 25.7848 22.2071 26.2071 22.6294C26.6293 23.0517 27.1261 23.3746 27.6975 23.5982C28.5917 23.9708 29.4611 24.0205 30.4051 23.946C31.1006 23.8963 45.6321 22.4307 48.6626 22.1575C48.6129 21.5116 48.5136 20.8906 48.4142 20.2448C45.1353 20.8906 30.877 23.1759 30.1566 23.2504C29.5108 23.325 28.6662 23.3498 27.8962 23.0269C27.4242 22.8281 26.9771 22.5549 26.6045 22.1823C26.2567 21.8097 25.9587 21.3626 25.7599 20.8906C25.437 20.1206 25.4619 19.276 25.5364 18.6302C25.6109 17.9098 27.9459 3.37827 28.5669 0.248402C27.9459 0.149041 27.3 0.0496804 26.6542 0C26.3809 2.88146 24.9154 17.6862 24.8657 18.3817C24.816 19.3754 24.8905 20.2448 25.2383 21.139ZM21.09 23.5982C21.6365 23.3746 22.1581 23.0517 22.5804 22.6294C23.0027 22.2071 23.3256 21.6855 23.5492 21.139C23.8969 20.2448 23.9714 19.3754 23.8969 18.4314C23.8472 17.7359 22.3568 2.80694 22.1084 0.0496806C21.4626 0.099361 20.8167 0.198722 20.1957 0.298083C20.8167 3.37827 23.1517 17.9346 23.2262 18.6798C23.3008 19.3257 23.3256 20.1702 23.0027 20.9403C22.8039 21.4123 22.5307 21.8594 22.1581 22.232C21.7855 22.5797 21.3384 22.8778 20.8664 23.0765C20.0964 23.3995 19.2518 23.3746 18.606 23.3001C17.8856 23.2256 3.67699 20.9403 0.348408 20.2944C0.249047 20.9154 0.149687 21.5613 0.100006 22.2071C3.25471 22.5052 17.662 23.946 18.3576 23.9956C19.3263 24.0205 20.1709 23.946 21.09 23.5982ZM25.2383 21.139C25.4619 21.6855 25.7848 22.2071 26.2071 22.6294C26.6293 23.0517 27.1261 23.3746 27.6975 23.5982C28.5917 23.9708 29.4611 24.0205 30.4051 23.946C31.1006 23.8963 45.6321 22.4307 48.6626 22.1575C48.6129 21.5116 48.5136 20.8906 48.4142 20.2448C45.1353 20.8906 30.877 23.1759 30.1566 23.2504C29.5108 23.325 28.6662 23.3498 27.8962 23.0269C27.4242 22.8281 26.9771 22.5549 26.6045 22.1823C26.2567 21.8097 25.9587 21.3626 25.7599 20.8906C25.437 20.1206 25.4619 19.276 25.5364 18.6302C25.6109 17.9098 27.9459 3.37827 28.5669 0.248402C27.9459 0.149041 27.3 0.0496804 26.6542 0C26.3809 2.88146 24.9154 17.6862 24.8657 18.3817C24.816 19.3754 24.8905 20.2448 25.2383 21.139Z" fill="currentColor"></path>
</svg>
                </a>
                <div> Cozy Threads</div>
                
              </div>
              </div>

            <div className="App">
              
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                  <CustomCheckoutForm/>
                </Elements>
              )}

            </div>
            <form className="mt-6">

              

              <p className="mt-6 flex justify-center text-sm font-medium text-gray-500">
                <LockClosedIcon aria-hidden="true" className="mr-1.5 h-5 w-5 text-gray-400" />
                Payment details stored in plain text
              </p>
            </form>
          </div>
        </section>


      </main>
    </>
  )
}

