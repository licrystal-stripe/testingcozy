import Layout from "@/components/Layout";
import {useRouter } from 'next/router';
import ReviewStars from '@/components/ProductDetailComponents/ReviewStars';
import SizePicker from '@/components/ProductDetailComponents/SizePicker';
import ColorPicker from '@/components/ProductDetailComponents/ColorPicker';
import Reviews from '@/components/ProductDetailComponents/Reviews';
import RelatedProducts from '@/components/ProductDetailComponents/RelatedProducts';
import Policies from '@/components/ProductDetailComponents/Policies';
import ProductDetails from "@/components/ProductDetailComponents/ProductDetails";

export default function ProductPage() {
  const router = useRouter();
  const {productClicked} = router.query

  if (typeof productClicked !== 'string') {
    console.error("productClicked is not a string:", productClicked);
    return <p>Loading...</p>;  // Or handle the loading state differently
  }
  
  let productToBuyJSON;
  try {
      productToBuyJSON = JSON.parse(productClicked);
  } catch (error) {
      console.error("Failed to parse productClicked:", error);
      return <p>There was an error processing the product.</p>; // Inform user
  }

  const productValues = Object.values(productToBuyJSON)
  const finalProduct = productValues[0]

  const handleEmbeddedComponent = (e) => {
    e.preventDefault();
    router.push({
      pathname: '/embedded-checkout',
      query: {
        productsInCart: productClicked, 
        numItems: 1
      }
    });
  };

  return (
    <Layout>
      <div className="bg-[#fffefa]">
        <main className="mx-auto pt-8 max-w-2xl px-4 pb-16 sm:px-6 sm:pb-24 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
            <div className="lg:col-span-5 lg:col-start-8">
              <div className="flex justify-between">
                <h1 className="text-xl font-medium text-gray-900">{finalProduct.name}</h1>
                <p className="text-xl font-medium text-gray-900">{finalProduct.price}</p>
              </div>
              {/* Reviews */}
              <ReviewStars></ReviewStars>
            </div>

            {/* Image gallery */}
            <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
              <h2 className="sr-only">Images</h2>
              
              {/*If you ever want to add more images change it to this style */}
              {/*<div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">*/}
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <img
                    src={finalProduct.imageSrc}
                    className={ 'lg:col-span-2 lg:row-span-2'}
                  />
                
              </div>
            </div>

            {/** Informaiton on the Product and the "Buy now" button */}
            <div className="mt-8 lg:col-span-5">
              <form>
                {/* Color picker */}
                <ColorPicker></ColorPicker>

                {/* Size picker */}
                <SizePicker></SizePicker>
              </form>
              
              {/*This will take the user to a page to pay with Embedded Checkout, quicker checkout flow */}
              <form onSubmit = {handleEmbeddedComponent}>
                <section>
                    <button 
                    type="submit" 
                    role="link"
                    className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-[#1e2525] px-8 py-3 text-base font-medium text-white hover:bg-[#565c5c] focus:outline-none focus:ring-2 focus:ring-[#e2d2ac] focus:ring-offset-2">
                      Buy Now
                    </button>
                </section>
                </form>

              {/** Product Description */}
              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Description</h2>

                <div
                  dangerouslySetInnerHTML={{ __html: finalProduct.description }}
                  className="prose prose-sm mt-4 text-gray-500"
                />
              </div>

              {/* Product details */}
              <ProductDetails></ProductDetails>

              {/* Policies */}
              <Policies></Policies>
              
            </div>
          </div>

          {/* Reviews */}
          <Reviews></Reviews>

          {/* Related products */}
          <RelatedProducts></RelatedProducts>
        
        </main>
      </div>
    </Layout>
  )
}


