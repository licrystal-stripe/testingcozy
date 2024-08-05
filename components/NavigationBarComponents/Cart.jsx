import { useState, useEffect } from 'react'
import { useRouter } from 'next/router';

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Popover,
  PopoverButton,
  Transition,
  TransitionChild,
} from '@headlessui/react'
import {
  ShoppingBagIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

// Maintains the Cart state including what products are in the cart & subtotal
export default function Cart ({numItems, productsInCart, setProductsInCart, setNumItems}) {
  const [openCart, setOpenCart] = useState(false)
  const [subtotal, setSubtotal] = useState(0)
  const router = useRouter();

  /*
  * Anytime a product is added to the cart, we have to recalculate the subtotal and 
  * the number of items that are in the cart (to display next to the shopping cart
  * icon)
  */
  useEffect(() => {
      // Recalculate the items in the Cart
      setNumItems(numItems);

      //Recalculate the Subtotal
      const cartProducts = Object.values(productsInCart);
      // Calculate the subtotal by reducing the cart products
      const subtotal = cartProducts.reduce((total, product) => {
        return total + (product.unitPrice * product.quantity);
      }, 0);
      // Update the subtotal state
      setSubtotal(subtotal);
  }, [numItems, productsInCart]);

  /*
  * When the Button to Checkout is clicked we navigate to the Checkout page
  * with the Payment Element
  */ 
  const handlePaymentElement = (e) => {
    e. preventDefault(); 
    setOpenCart(false)
    router.push({
      pathname: '/payment-element',
    })
  }

  /*
  * When the Remove button is clicked we need to delete the corresponding
  * product from the Cart and update the # items in the cart
  */
  const handleRemoveButton = (product) => {
    //Delete the product from the Cart
    const updatedProductsInCart = {...productsInCart}
    delete updatedProductsInCart[product.id];
    setProductsInCart(updatedProductsInCart);

    //Delete the number of items in the Cart
    setNumItems(numItems - product.quantity);         
  }

  /*
  * Updates the product quantity
  */
  const handleQuantityChange = (product, newQuantity) => {
    const updatedProductsInCart = { ...productsInCart, [product.id]: { ...product, quantity: newQuantity } };
    setProductsInCart(updatedProductsInCart);

    // Recalculate total items and subtotal
    /**const totalItems = Object.values(updatedProductsInCart).reduce((acc, item) => acc + item.quantity, 0);
    setNumItems(totalItems);

    const subtotal = Object.values(updatedProductsInCart).reduce((total, product) => total + (product.unitPrice * product.quantity), 0);
    setSubtotal(subtotal);**/
};


  return (
    // The Cart opens as a Popover
    <Popover className="ml-4 flow-root text-sm lg:relative lg:ml-8">
      {/*When the Cart is closed you only see the Number of items in the Cart and the shopping Icon */}
      <PopoverButton 
        className="group -m-2 flex items-center p-2"
        onClick={() => setOpenCart(true)}>
          <ShoppingBagIcon
            className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
            aria-hidden="true"
          />
          <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{numItems}</span>
          <span className="sr-only">items in cart, view bag</span>
      </PopoverButton>

      {/*The Carts states that are determined if the openCart state is True */}
      <Transition show={openCart}>
        <Dialog className="relative z-10" onClose={setOpenCart}>
          {/* This blurs the background */}
          <TransitionChild
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-white bg-opacity-75 transition-opacity" />
          </TransitionChild>

          {/* This is the body of the Cart */}
          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <TransitionChild
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <DialogPanel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">

                      {/* Top Section of the Cart above the line */}
                      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                        {/* Shopping cart header - Title and "x" button */}
                        <div className="flex items-start justify-between">
                          <DialogTitle className="text-lg font-medium text-gray-900">Shopping cart</DialogTitle>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                              onClick={() => setOpenCart(false)}
                            >
                              <span className="absolute -inset-0.5" />
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>

                        {/*The Products that are in the Cart */}
                        <div className="mt-8">
                          <div className="flow-root">
                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                              {Object.values(productsInCart).map((product) => (
                                <li key={product.id} className="flex py-6">

                                  {/*The Product Image */}
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      src={product.imageSrc}
                                      alt={product.imageAlt}
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>

                                  {/*The Product details */}
                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          <a href={product.href}>{product.name}</a>
                                        </h3>
                                        <p className="ml-4">{product.price}</p>
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      
                                    <div className="flex flex-1 items-center text-sm">
                                      <p className="text-gray-500 mr-2">Qty.</p>
                                      <select
                                          value={product.quantity}
                                          onChange={(e) => handleQuantityChange(product, parseInt(e.target.value))}
                                          className="w-14 rounded-md border border-gray-300 py-2.5 text-left text-base font-medium leading-5 text-gray-700 focus:border-[#a99a78] focus:outline-none focus:ring-1 focus:ring-[#a99a78] sm:text-sm"
                                      >
                                          {[...Array(8)].map((_, index) => (
                                              <option key={index} value={index + 1}>{index + 1}</option>
                                          ))}
                                      </select>
                                  </div>

                                      <div className="flex">
                                        <button
                                          type="button"
                                          className="font-medium text-[#a99a78] hover:text-black underline"
                                          onClick={() => handleRemoveButton(product)}
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      {/*Bottom section of the Cart, below the line, subtotal and checkout button */}
                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">

                        {/*Subtotal */}
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Subtotal</p>
                          <p>{'$' + subtotal.toFixed(2)}</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>

                        {/* Checkout Button that redirects to the Payment page with the Payement Element */}
                        <div className="mt-6">
                          <form onSubmit = {handlePaymentElement}>
                          <section>
                              <button 
                                type="submit" 
                                role="link"
                                disabled={subtotal === 0}
                                className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-[#1e2525] px-8 py-3 text-base font-medium text-white hover:bg-[#565c5c] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                  Checkout
                                </button>
                          </section>
                          </form>
                        </div>
                        
                        {/* Essentially another way to close the Cart by clicking "continue shopping" */}
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                          <p>
                            or{' '}
                            <button
                              type="button"
                              className="font-medium text-[#a99a78] hover:text-black"
                              onClick={() => setOpenCart(false)}
                            >
                              Continue Shopping
                              <span aria-hidden="true"> &rarr;</span>
                            </button>
                          </p>
                        </div>
                      </div>
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </Popover>
    )
}