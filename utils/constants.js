{/**Constant file to declutter the code on the main pages */}
export const topRowProducts = [
    {
      id: 1,
      name: 'Eli Oversized Shirt',
      href: '#',
      price: '$148',
      description: 'Designed to be oversized and relaxed fit throughout',
      imageSrc: './eliTop.png',
      imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
      unitPrice: 148, 
      quantity: 1
    },
    {
      id: 2,
      name: 'Classic Crew Tee',
      href: '#',
      price: '$64',
      description: 'Designed to have a relaxed fit.',
      imageSrc: './crewTee.png',
      imageAlt: 'Paper card sitting upright in walnut card holder on desk.',
      unitPrice: 64,
      quantity: 1
    },
    {
      id: 3,
      name: 'Frankie Dress',
      href: '#',
      price: '$298',
      description: 'back smocking, non-adjustable straps, square neckline, back slit',
      imageSrc: './frankieDress.png',
      imageAlt: 'Textured gray felt pouch for paper cards with snap button flap and elastic pen holder loop.',
      unitPrice: 298, 
      quantity: 1
    },
    
]

export const middleRowProducts = [
  {
    id: 4,
    name: 'Val 90s Mid Rise Straight Jeans',
    href: '#',
    price: '$168',
    description: 'Designed to be slouchy below the natural waist, thighs, and legs with fitted hips',
    imageSrc: './valJeans.png',
    imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
    unitPrice: 168, 
    quantity: 1
  },
  {
    id: 5,
    name: 'Minette Top',
    href: '#',
    price: '$168',
    description: 'Crepe woven fabric designed to be fitted throughout',
    imageSrc: './minetteTop.png',
    imageAlt: 'Paper card sitting upright in walnut card holder on desk.',
    unitPrice: 168,
    quantity: 1
  },
  {
    id: 6,
    name: 'Carlotta Bag',
    href: '#',
    price: '$398',
    description: 'High-quality tumbled leather grain leather with subtle shine',
    imageSrc: './carlottaBag.png',
    imageAlt: 'Textured gray felt pouch for paper cards with snap button flap and elastic pen holder loop.',
    unitPrice: 398, 
    quantity: 1
  },
]

export const bottomRowProducts = [
  {
    id: 7,
    name: 'Bess Linen Top',
    href: '#',
    price: '$148',
    description: 'High-quality light weight linen fabric with a relaxed fit',
    imageSrc: './vivTop.png',
    
    imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
    unitPrice: 148, 
    quantity: 1
  },
  {
    id: 8,
    name: 'Medium Vittoria Tote Bag',
    href: '#',
    price: '$64',
    description: 'a slouchy leather tote with a magnetic closure, features a decorative tie detail, and inside zip pocket with a card holder',
    imageSrc: './bucketBag.png',
    imageAlt: 'Paper card sitting upright in walnut card holder on desk.',
    unitPrice: 64,
    quantity: 1
  },
  {
    id: 9,
    name: 'Mina Top',
    href: '#',
    price: '$32',
    description: 'Designed to have a relaxed fit throughout',
    imageSrc: './minaTop.png',
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

export const filters = [
  {
    id: 'category',
    name: 'Category',
    options: [
      { value: 'tees', label: 'Tees' },
      { value: 'crewnecks', label: 'Crewnecks' },
      { value: 'hats', label: 'Hats' },
      { value: 'bundles', label: 'Bundles' },
      { value: 'carry', label: 'Carry' },
      { value: 'objects', label: 'Objects' },
    ],
  },
  {
    id: 'brand',
    name: 'Brand',
    options: [
      { value: 'clothing-company', label: 'Clothing Company' },
      { value: 'fashion-inc', label: 'Fashion Inc.' },
      { value: 'shoes-n-more', label: "Shoes 'n More" },
      { value: 'supplies-n-stuff', label: "Supplies 'n Stuff" },
    ],
  },
  {
    id: 'color',
    name: 'Color',
    options: [
      { value: 'white', label: 'White' },
      { value: 'black', label: 'Black' },
      { value: 'grey', label: 'Grey' },
      { value: 'blue', label: 'Blue' },
      { value: 'olive', label: 'Olive' },
      { value: 'tan', label: 'Tan' },
    ],
  },
  {
    id: 'sizes',
    name: 'Sizes',
    options: [
      { value: 'xs', label: 'XS' },
      { value: 's', label: 'S' },
      { value: 'm', label: 'M' },
      { value: 'l', label: 'L' },
      { value: 'xl', label: 'XL' },
      { value: '2xl', label: '2XL' },
    ],
  },
]

export const sortOptions = [
  { name: 'Most Popular', href: '#' },
  { name: 'Best Rating', href: '#' },
  { name: 'Newest', href: '#' },
  { name: 'Price: Low to High', href: '#' },
  { name: 'Price: High to Low', href: '#' },
]

export const footerNavigationItems = {
  products: [
    { name: 'Bags', href: '#' },
    { name: 'Tees', href: '#' },
    { name: 'Objects', href: '#' },
    { name: 'Home Goods', href: '#' },
    { name: 'Accessories', href: '#' },
  ],
  company: [
    { name: 'Who we are', href: '#' },
    { name: 'Sustainability', href: '#' },
    { name: 'Press', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Terms & Conditions', href: '#' },
    { name: 'Privacy', href: '#' },
  ],
  customerService: [
    { name: 'Contact', href: '#' },
    { name: 'Shipping', href: '#' },
    { name: 'Returns', href: '#' },
    { name: 'Warranty', href: '#' },
    { name: 'Secure Payments', href: '#' },
    { name: 'FAQ', href: '#' },
    { name: 'Find a store', href: '#' },
  ],
}

export const mainPageCenterText = "Sustainability Collection Fall 2024";
export const mainPageDescriptionText = "Thoughtfully designed objects for the workspace, home, and travel."
export const featuredCollectionName = "Workspace Collection"
export const featuredCollectionDescription = "Upgrade your desk with objects that keep you organized and clear-minded."
export const featuredCollectionButtonText = "View the collection"
export const quickAddButtonText = "Quick add"