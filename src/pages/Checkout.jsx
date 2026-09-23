import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeliveryDetails from "../components/Checkout/DeliveryDetails";
import OrderSummary from "../components/Checkout/OrderSummary";

const Checkout = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
  });

  const [cart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const handlePlaceOrder = () => {
    if (!formData.fullName || !formData.phone || !formData.address) {
      alert("Please complete the delivery details.");
      return;
    }

    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    const subtotal = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    orders.unshift({
      id: `EC-${Date.now().toString().slice(-6)}`,
      date: new Date().toISOString(),
      items: cart,
      total: subtotal,
      deliveryDetails: formData,
    });
    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.removeItem("cart");

    alert("Your order has been placed successfully.");

    navigate("/catalogue");
  };

  if (cart.length === 0) {
    return (
      <section className="mx-auto max-w-7xl px-5 py-24 text-center">
        <h1 className="text-2xl font-bold text-slate-900">
          No items available for checkout
        </h1>

        <button
          onClick={() => navigate("/catalogue")}
          className="mt-6 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Continue Shopping
        </button>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-semibold text-blue-600">FINAL STEP</p>

        <h1 className="mt-2 text-3xl font-extrabold text-slate-900">
          Checkout
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Confirm your delivery information and order.
        </p>
      </div>

      <div className="grid gap-7 lg:grid-cols-[1fr_380px]">
        <DeliveryDetails
          formData={formData}
          setFormData={setFormData}
        />

        <OrderSummary
          items={cart}
          onPlaceOrder={handlePlaceOrder}
        />
      </div>
    </section>
  );
};

export default Checkout;