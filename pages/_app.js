// pages/_app.js

import { CartProvider } from "@/context/CartContext";
import "@/styles/globals.css";
import Layout from "@/components/Layout";
import { useCart } from "@/context/CartContext"; // Import the useCart hook

export default function App({ Component, pageProps }) {
  return (
    <CartProvider>
        <Component {...pageProps} />
    </CartProvider>
  );
}