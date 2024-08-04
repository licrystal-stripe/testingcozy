export const allProducts = [
    {
      id: 1,
      name: 'Focus Paper Refill',
      href: '#',
      price: '$13',
      description: 'High-quality refill for enhanced focus and productivity',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-01.jpg',
      imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
      unitPrice: 13, 
      quantity: 1
    },
    {
      id: 2,
      name: 'Focus Card Holder',
      href: '#',
      price: '$64',
      description: 'Stylish card holder to keep you organized and focused',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-02.jpg',
      imageAlt: 'Paper card sitting upright in walnut card holder on desk.',
      unitPrice: 64,
      quantity: 1
    },
    {
      id: 3,
      name: 'Focus Carry Pouch',
      href: '#',
      price: '$32',
      description: 'Compact pouch for organized storage and on-the-go convenience',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-03.jpg',
      imageAlt: 'Textured gray felt pouch for paper cards with snap button flap and elastic pen holder loop.',
      unitPrice: 32, 
      quantity: 1
    },
  ]

export const navigation = {
    categories: [
        {
        name: 'Women',
        featured: [
            {
            name: 'New Arrivals',
            href: '#',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
            imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
            },
            {
            name: 'Basic Tees',
            href: '#',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
            imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
            },
            {
            name: 'Accessories',
            href: '#',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-03.jpg',
            imageAlt: 'Model wearing minimalist watch with black wristband and white watch face.',
            },
            {
            name: 'Carry',
            href: '#',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-04.jpg',
            imageAlt: 'Model opening tan leather long wallet with credit card pockets and cash pouch.',
            },
        ],
        },
        {
        name: 'Men',
        featured: [
            {
            name: 'New Arrivals',
            href: '#',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-01.jpg',
            imageAlt: 'Hats and sweaters on wood shelves next to various colors of t-shirts on hangers.',
            },
            {
            name: 'Basic Tees',
            href: '#',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-02.jpg',
            imageAlt: 'Model wearing light heather gray t-shirt.',
            },
            {
            name: 'Accessories',
            href: '#',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-03.jpg',
            imageAlt:
                'Grey 6-panel baseball hat with black brim, black mountain graphic on front, and light heather gray body.',
            },
            {
            name: 'Carry',
            href: '#',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-04.jpg',
            imageAlt: 'Model putting folded cash into slim card holder olive leather wallet with hand stitching.',
            },
        ],
        },
    ],
    pages: [
        { name: 'Company', href: '#' },
        { name: 'Stores', href: '#' },
    ],
    }

export const productPageDetails = {
      colors: [
        { name: 'Black', bgColor: 'bg-gray-900', selectedColor: 'ring-gray-900' },
        { name: 'Heather Grey', bgColor: 'bg-gray-400', selectedColor: 'ring-gray-400' },
      ],
      sizes: [
        { name: 'XXS', inStock: true },
        { name: 'XS', inStock: true },
        { name: 'S', inStock: true },
        { name: 'M', inStock: true },
        { name: 'L', inStock: true },
        { name: 'XL', inStock: false },
      ],
      details: [
        'Only the best materials',
        'Ethically and locally made',
        'Pre-washed and pre-shrunk',
        'Machine wash cold with similar colors',
      ],
    }


export const reviews = {
  average: 3.9,
  totalCount: 512,
  featured: [
    {
      id: 1,
      title: "Can't say enough good things",
      rating: 5,
      content: `
        <p>I was really pleased with the overall shopping experience. My order even included a little personal, handwritten note, which delighted me!</p>
        <p>The product quality is amazing, it looks and feel even better than I had anticipated. Brilliant stuff! I would gladly recommend this store to my friends. And, now that I think of it... I actually have, many times!</p>
      `,
      author: 'Risako M',
      date: 'May 16, 2021',
      datetime: '2021-01-06',
    },
    // More reviews...
  ],
}
export const relatedProducts = [
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-02.jpg',
    imageAlt: "Front of men's Basic Tee in white.",
    price: '$35',
    color: 'Aspen White',
  },
  // More products...
]
export function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
} 

export const mainPageCenterText = "New Arrivals";
export const mainPageDescriptionText = "Thoughtfully designed objects for the workspace, home, and travel."
export const featuredCollectionName = "Workspace Collection"
export const featuredCollectionDescription = "Upgrade your desk with objects that keep you organized and clear-minded."
export const featuredCollectionButtonText = "View the collection"
export const quickAddButtonText = "Quick add"