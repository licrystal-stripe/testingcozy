import { useRouter } from 'next/router';
import { quickAddButtonText } from '@/utils/constants';
export default function ProductGrid ({addToCart, products}) {
  const router = useRouter();

{/* If the customer clicks the product image they'll be taken
  * to the Product page for that item where they can then buy 
  * that singular item via Embedded Checkout
  */}
const handleImageClick = (clickedProduct) => {
  // If they click the image they're taken to that item's product page
  router.push({
    pathname: '/product-page',
    query: {
      /* Because embedded-checkout takes the products in the format
      * {id: product} we reformat it instead of directly passing in
      * product 
      */
      productClicked: JSON.stringify({[clickedProduct.id]:clickedProduct}),
    }
  });
};  
  
  return (
        <section aria-labelledby="products-heading" className="mt-8">
              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                {/*
                * For each product you display the image, "Add to Cart" button, name, price, and description
                */}
                {products.map((product) => (
                  <div key={product.id} className="group relative">
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg sm:aspect-h-3 sm:aspect-w-2">
                      
                      {/* Product Image, if the product is clicked then handleImageClick is called */}
                      <img
                        src={product.imageSrc}
                        alt={product.imageAlt}
                        className="h-full w-full object-cover object-center group-hover:opacity-75"
                        onClick={() =>handleImageClick(product)}
                      />

                      {/* Add to Cart Overlay Button */}
                      <a
                        href={product.href}
                        onClick={() => addToCart(product)}
                        className="absolute left-1/2 flex items-center justify-center bg-[#1e2525] text-white rounded-md h-12 w-3/4 transform -translate-x-1/2  -translate-y-1/2 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                        style={{ bottom: '100px' }}
                        >
                        {quickAddButtonText} <span className="sr-only">, {product.name}</span>
                      </a>
                    </div>

                    {/* Product Name and Price */}
                    <div className="mt-4 flex items-center justify-between">
                      <h3 className="text-base font-small text-gray-900">{product.name}</h3>
                      <p className = "text-base font-medium text-gray-900">{product.price}</p>
                    </div>

                    {/* Product Description */}
                    <p className="mt-1 text-sm italic text-gray-500">{product.description}</p>
                  </div>
                ))}
              </div>
            </section>
    )
}