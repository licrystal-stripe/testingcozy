import Filters from "./Filters"
import ProductGrid from "./ProductGrid"
import FeaturedCollection from "./FeaturedCollection"
import { mainPageCenterText, mainPageDescriptionText } from "@/utils/constants"
import { allProducts } from "@/utils/constants"
export default function HomePage ({addToCart}) {
    return (
        <main className="pb-10 bg-[#faf7f0]">

          {/* Header */}
          <div className="relative py-24 text-center">
              {/* Home Page Header image */}
              <img 
                src="/fabric.png" 
                alt="Overlay Background" 
                className="absolute inset-0 object-cover w-full h-full" 
              />
              
              {/* Header Text overlay */}
              <div className="relative z-10"> 
                <h1 className="text-4xl font-bold tracking-tight text-white">{mainPageCenterText}</h1>
                <p className="mx-auto mt-4 text-base text-white">
                  {mainPageDescriptionText}
                </p>
              </div>
            </div>

          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            {/* Filters */}
            <Filters></Filters>

            {/* First row of featured Products */}
            <ProductGrid addToCart={addToCart} products={allProducts}></ProductGrid>
      
            {/* Banner for the Featured Colection */}
            <FeaturedCollection></FeaturedCollection>

            {/* Second row of featured Products */}
            <ProductGrid addToCart={addToCart} products={allProducts}></ProductGrid>
          </div>
        </main>
    )
}