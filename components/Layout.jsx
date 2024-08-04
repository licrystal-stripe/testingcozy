// components/Layout.js
import NavigationBar from "@/components/NavigationBar";
import FooterComponent from "@/components/FooterComponent";
import { useCart } from '@/context/CartContext';

/* Wrapper for the Main body to maintain Cart state in the Navigation Bar across pages 
*  and to maintain consistency across page layouts 
*/
export default function Layout({ children}) {
  /* Cart Context that stores the Cart state
  *  numItems -> The number of items in the Cart
  *  setNumItems -> numItems modifier
  *  productsInCart -> The actual products in the Cart
  *  setProductsInCart -> productsInCart modifier
  */
  const { numItems, setNumItems, productsInCart, setProductsInCart } = useCart();
  
  return (
    <div>
      <NavigationBar 
        numItems={numItems} 
        setNumItems={setNumItems}
        productsInCart={productsInCart} 
        setProductsInCart={setProductsInCart}
      />

      <main>{children}</main>

      <FooterComponent />
    </div>
  );
}