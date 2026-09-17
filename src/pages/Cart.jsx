import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CartItem from "../components/Cart/CartItem";
import CartSummary from "../components/Cart/CartSummary";
import Button from "../components/Common/Button";

const Cart = () => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const increaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCart((currentCart) => currentCart.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <section className="mx-auto flex max-w-7xl items-center justify-center px-5 py-24 lg:px-8">
        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-3xl">
            🛒
          </div>

          <h1 className="mt-6 text-2xl font-bold text-slate-900">
            Your cart is empty
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Add some products before proceeding to checkout.
          </p>

          <Link to="/catalogue" className="mt-6 inline-block">
            <Button>Browse Products</Button>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-semibold text-blue-600">YOUR SHOPPING BAG</p>

        <h1 className="mt-2 text-3xl font-extrabold text-slate-900">
          Shopping Cart
        </h1>
      </div>

      <div className="grid gap-7 lg:grid-cols-[1fr_340px]">
        <div className="rounded-2xl border border-slate-200 bg-white px-5 shadow-sm md:px-7">
          <div className="hidden grid-cols-[2fr_1fr_1fr_1fr] border-b border-slate-100 py-4 text-xs font-bold uppercase tracking-wider text-slate-400 md:grid">
            <span>Product</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Total</span>
          </div>

          {cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onIncrease={increaseQuantity}
              onDecrease={decreaseQuantity}
              onRemove={removeItem}
            />
          ))}
        </div>

        <CartSummary subtotal={subtotal} />
      </div>
    </section>
  );
};

export default Cart;