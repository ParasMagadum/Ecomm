import { Link } from "react-router-dom";
import Button from "../Common/Button";

const CartSummary = ({ subtotal }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold text-slate-900">Order Summary</h2>

      <div className="mt-6 space-y-4 text-sm">
        <div className="flex justify-between">
          <span className="text-slate-500">Subtotal</span>
          <span className="font-semibold text-slate-800">
            ₹{subtotal.toLocaleString("en-IN")}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-500">Shipping</span>
          <span className="font-semibold text-green-600">Free</span>
        </div>

        <div className="border-t border-slate-100 pt-4">
          <div className="flex justify-between">
            <span className="font-bold text-slate-900">Total</span>
            <span className="text-xl font-extrabold text-slate-900">
              ₹{subtotal.toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      </div>

      <Link to="/checkout" className="mt-6 block">
        <Button className="w-full">Proceed to Checkout</Button>
      </Link>
    </div>
  );
};

export default CartSummary;