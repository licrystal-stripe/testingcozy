// Stores the Cart Context used to main states across pages
import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

/* Cart Context that stores the Cart state
  *  numItems -> The number of items in the Cart
  *  setNumItems -> numItems modifier
  *  productsInCart -> The actual products in the Cart
  *  setProductsInCart -> productsInCart modifier
  *  openCart -> whether or not the cart should be open
  *  setOpenCart -> openCart modifier
  */
export const CartProvider = ({ children }) => {
  const [numItems, setNumItems] = useState(0);
  const [productsInCart, setProductsInCart] = useState([]);
  const [openCart, setOpenCart] = useState(false)

  return (
    <CartContext.Provider value={{ numItems, setNumItems, productsInCart, setProductsInCart, openCart, setOpenCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);