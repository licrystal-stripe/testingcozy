{/* Tailwind default file for the Featured Collection
  * TODO: Change out the photo for something better
  */}

export default function FeaturedCollection () {
    return (
        <section aria-labelledby="featured-heading" className="relative mt-16 overflow-hidden rounded-lg lg:h-96">
              <div className="absolute inset-0">
                <img
                  src="./newArrivals.png"
                  alt=""
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div aria-hidden="true" className="relative h-96 w-full lg:hidden" />
              
            </section>
    )
}