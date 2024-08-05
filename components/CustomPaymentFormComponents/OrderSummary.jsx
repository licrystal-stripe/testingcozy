import { useCart } from '@/context/CartContext';
import { quantityChange } from '@/utils/helperFunctions';

export default function OrderSummary ({parsedProducts, subtotal, handleSubmit}) {
  const { setProductsInCart  } = useCart();

  {/** code to update the product in the cart based on the new quantity */}
  const handleQuantityChange = (product, newQuantity) => {
    const updatedProductsInCart = quantityChange(product, newQuantity, parsedProducts)
    setProductsInCart(updatedProductsInCart);
  };

    return (
        <div className="mt-10 lg:mt-0">
              <h2 className="text-lg font-medium text-gray-900">Order summary</h2>

              {/** Div that holds the product title, image, and price */}
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
                                  </button>
                              </div>
                            </div>

                          {/** This is the div that holds both the price and adjustable quantity of the product */}
                            <div className="flex flex-1 items-end justify-between pt-2">
                              <p className="mt-1 text-sm font-medium text-gray-900">{product.price}</p>
                                
                                <div className="flex space-x-4">
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
                                </div>
                            </div>
                        </div>
                    </li>
                  ))}
                </ul>

              {/** Eventually I want to implement Tax so that I can show customers how easy it is to show up */}
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
              
              {/** Button the customer clicks to confirm the order and redirect to the main page */}
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
    )
}