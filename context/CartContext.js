// Stores the Cart Context used to main states across pages
import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

/* Cart Context that stores the Cart state
  *  numItems -> The number of items in the Cart
  *  setNumItems -> numItems modifier
  *  productsInCart -> The actual products in the Cart
  *  setProductsInCart -> productsInCart modifier
  */
export const CartProvider = ({ children }) => {
  const [numItems, setNumItems] = useState(0);
  const [productsInCart, setProductsInCart] = useState([]);

  return (
    <CartContext.Provider value={{ numItems, setNumItems, productsInCart, setProductsInCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);