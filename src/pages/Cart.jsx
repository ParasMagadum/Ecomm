import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCart, updateCartItem, removeCartItem } from "../api/customer";
import Button from "../components/Common/Button";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const loadCart = async () => {
    try {
      setLoading(true);
      const data = await getCart();
      setItems((data.items || []).filter((item) => item.product).map((item) => ({
        id: item._id,
        productId: item.product._id,
        name: item.product.name,
        image: item.product.image,
        category: item.product.category?.name || "",
        price: item.product.price,
        stock: item.product.stock,
        quantity: item.quantity
      })));
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load cart. Please log in.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadCart(); }, []);

  const changeQuantity = async (item, quantity) => {
    try {
      if (quantity < 1) await removeCartItem(item.id);
      else await updateCartItem(item.id, quantity);
      await loadCart();
    } catch (err) {
      setError(err.response?.data?.message || "Could not update cart.");
    }
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (loading) return <section className="p-12 text-center text-slate-500">Loading cart...</section>;
  if (!items.length) return <section className="mx-auto max-w-7xl px-5 py-24 text-center">{error && <p className="mb-4 text-sm text-red-700">{error}</p>}<h1 className="text-2xl font-bold">Your cart is empty</h1><Link to="/catalogue" className="mt-6 inline-block"><Button>Browse Products</Button></Link></section>;

  return (
    <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
      <h1 className="mb-6 text-3xl font-extrabold text-slate-900">Shopping Cart</h1>
      {error && <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      <div className="grid gap-7 lg:grid-cols-[1fr_340px]">
        <div className="rounded-2xl border border-slate-200 bg-white px-5 shadow-sm md:px-7">
          {items.map((item) => <div key={item.id} className="flex flex-wrap items-center gap-4 border-b border-slate-100 py-5 last:border-0">
            <img src={item.image} alt={item.name} className="h-20 w-20 rounded-xl object-cover" />
            <div className="min-w-0 flex-1"><p className="font-semibold">{item.name}</p><p className="text-sm text-slate-500">₹{item.price.toLocaleString("en-IN")} each</p><button onClick={() => changeQuantity(item, 0)} className="mt-2 text-xs text-red-600">Remove</button></div>
            <div className="flex items-center gap-3"><button onClick={() => changeQuantity(item, item.quantity - 1)} className="h-8 w-8 rounded border">−</button><span>{item.quantity}</span><button disabled={item.quantity >= item.stock} onClick={() => changeQuantity(item, item.quantity + 1)} className="h-8 w-8 rounded border disabled:opacity-40">+</button></div>
            <strong>₹{(item.price * item.quantity).toLocaleString("en-IN")}</strong>
          </div>)}
        </div>
        <div className="h-fit rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-bold">Order Summary</h2>
          <div className="mt-5 flex justify-between"><span>Subtotal</span><strong>₹{subtotal.toLocaleString("en-IN")}</strong></div>
          <div className="mt-3 flex justify-between"><span>Shipping</span><span className="text-green-600">Free</span></div>
          <div className="mt-4 flex justify-between border-t pt-4"><strong>Total</strong><strong>₹{subtotal.toLocaleString("en-IN")}</strong></div>
          <Link to="/checkout" className="mt-6 block"><Button className="w-full">Proceed to Checkout</Button></Link>
        </div>
      </div>
    </section>
  );
};

export default Cart;
