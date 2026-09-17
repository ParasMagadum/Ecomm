import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-16 bg-slate-900 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <h2 className="text-lg font-bold text-white">E-COMMERCE</h2>
          <p className="mt-4 max-w-xs text-sm leading-6 text-slate-400">
            A simple and modern shopping experience built for everyday online
            purchases.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-white">Quick Links</h3>

          <div className="mt-4 space-y-3 text-sm">
            <Link to="/catalogue" className="block hover:text-white">
              Products
            </Link>
            <Link to="/cart" className="block hover:text-white">
              Cart
            </Link>
            <Link to="/login" className="block hover:text-white">
              Login
            </Link>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-white">Customer Service</h3>

          <div className="mt-4 space-y-3 text-sm">
            <p>FAQs</p>
            <p>Return Policy</p>
            <p>Order Support</p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-white">Contact</h3>

          <div className="mt-4 space-y-3 text-sm text-slate-400">
            <p>support@ecommerce.com</p>
            <p>+91 98765 43210</p>
            <p>India</p>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 py-5 text-center text-sm text-slate-500">
        © 2026 E-Commerce. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;