import { useCart } from '@/context/CartContext';

export default function ContinueShopping () {
    const {setOpenCart} = useCart();
    return (
        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
        <p>
          or{' '}
          <button
            type="button"
            className="font-medium text-[#a99a78] hover:text-black"
            onClick={() => setOpenCart(false)}
          >
            Continue Shopping
            <span aria-hidden="true"> &rarr;</span>
          </button>
        </p>
      </div>
    )
}