export function calculateSubtotal(cartProducts) {
    return (cartProducts.reduce((total, product) => {
      return total + (product.unitPrice * product.quantity);
    }, 0))
  }

export function quantityChange (product, newQuantity, parsedProducts) {
    const updatedProductsInCart = { ...parsedProducts, [product.id]: { ...product, quantity: newQuantity } };
    return updatedProductsInCart;
  };
