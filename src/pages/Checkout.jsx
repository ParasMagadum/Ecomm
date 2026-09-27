import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCart, placeOrder } from "../api/customer";
import DeliveryDetails from "../components/Checkout/DeliveryDetails";
import OrderSummary from "../components/Checkout/OrderSummary";

const Checkout = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [formData, setFormData] = useState({ fullName: "", phone: "", address: "", city: "", state: "", pinCode: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(true);

  useEffect(() => {
    getCart()
      .then((data) => setCart((data.items || []).filter((item) => item.product).map((item) => ({
        id: item._id,
        name: item.product.name,
        image: item.product.image,
        price: item.product.price,
        quantity: item.quantity
      }))))
      .catch((err) => setError(err.response?.data?.message || "Please log in to checkout."))     
      .finally(() => setCartLoading(false));
  }, []);

  const handlePlaceOrder = async () => {
    const { fullName, phone, address, city, state, pinCode } = formData;
    if (![fullName, phone, address, city, state, pinCode].every((value) => value.trim())) {
      setError("Please complete all delivery details.");
      return;
    }
    if (!localStorage.getItem("token")) {
      setError("Please log in before placing an order.");
      return;
    }
    setLoading(true);
    setError("");
    const shipping_address = `${fullName}, ${phone}, ${address}, ${city}, ${state} - ${pinCode}`;
    try {
      await placeOrder(shipping_address);
      alert("Order placed successfully. Payment method: Cash on Delivery.");
      navigate("/profile");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to place order.");
    } finally {
      setLoading(false);
    }
  };

  if (cartLoading) return <section className="p-12 text-center">Loading checkout...</section>;
  if (!cart.length) return <section className="mx-auto max-w-4xl p-10 text-center"><p>{error || "Your cart is empty."}</p><button onClick={() => navigate("/catalogue")} className="mt-5 rounded-lg bg-slate-900 px-5 py-3 text-white">Continue shopping</button></section>;

  return (
    <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
      <div className="mb-8"><p className="text-sm font-semibold text-slate-500">FINAL STEP</p><h1 className="mt-2 text-3xl font-extrabold">Checkout</h1><p className="mt-2 text-sm text-slate-500">Cash on Delivery is available for this order.</p></div>
      {error && <p className="mb-5 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      <div className="grid gap-7 lg:grid-cols-[1fr_380px]">
        <DeliveryDetails formData={formData} setFormData={setFormData} />
        <div><OrderSummary items={cart} onPlaceOrder={handlePlaceOrder} /></div>
      </div>
    </section>
  );
};

export default Checkout;
