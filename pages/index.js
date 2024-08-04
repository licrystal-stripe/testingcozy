// pages/index.js (HomePage)
import { useCart } from '@/context/CartContext';
import HomePage from '@/components/HomePage';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import PaymentSuccessfulBanner from '@/components/PaymentSuccessfulBanner';
import {useState } from 'react'

export default function index() {
  const { setNumItems, setProductsInCart } = useCart();
  const [showBanner, setShowBanner] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check for the payment_status query parameter
    if (router.query.payment_status === 'success') {
      // Display success popup or notification
      setShowBanner(true)
      // Optionally clear the query params to avoid showing the popup again on refresh
      router.replace(router.pathname); 
    }
  }, [router.query]);
  
  //Function to add products to the Cart
  const addToCart = (product) => {
    /*
    * React will give you back the prev state as an argument so
    * we're just updating the state from the prev state
    */
    setNumItems((prevCount) => prevCount + 1);
    setProductsInCart((prevProducts) => {
      const existingProduct = prevProducts[product.id];
      /* If the product already exists in our list of products
      *  then we just update it's quantity, we don't want to 
      *  add it again
      */
      if (existingProduct) {
        return {
          ...prevProducts,
          [product.id]: {
            ...existingProduct,
            quantity: existingProduct.quantity + 1
          }
        };
      /* If the product doesn't exist then we add it to 
      *  our list of products. 
      *  Ex: [{1}:{id:"1", name: "productName"...}]
      */
      } else {
        return {
          ...prevProducts,
          [product.id]: product
        };
      }
    });
  };

  return (
    <Layout>
      <div className="relative">
        {showBanner && <PaymentSuccessfulBanner></PaymentSuccessfulBanner>}
        <HomePage 
          addToCart={addToCart} 
        />
      </div>
    </Layout>
  );
}

