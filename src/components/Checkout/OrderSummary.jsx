import Button from "../Common/Button";

const OrderSummary = ({ items, onPlaceOrder }) => {
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-slate-900">Order Summary</h2>

      <div className="mt-6 space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-4 border-b border-slate-100 pb-4"
          >
            <div>
              <p className="text-sm font-semibold text-slate-800">
                {item.name}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Quantity: {item.quantity}
              </p>
            </div>

            <span className="text-sm font-semibold text-slate-800">
              ₹{(item.price * item.quantity).toLocaleString("en-IN")}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-4 text-sm">
        <div className="flex justify-between">
          <span className="text-slate-500">Subtotal</span>
          <span className="font-semibold">
            ₹{subtotal.toLocaleString("en-IN")}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-500">Shipping</span>
          <span className="font-semibold text-green-600">Free</span>
        </div>

        <div className="border-t border-slate-100 pt-4">
          <div className="flex justify-between">
            <span className="font-bold">Total</span>
            <span className="text-xl font-extrabold">
              ₹{subtotal.toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      </div>

      <Button onClick={onPlaceOrder} className="mt-6 w-full">
        Place Order
      </Button>
    </div>
  );
};

export default OrderSummary;