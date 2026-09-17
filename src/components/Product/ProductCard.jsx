import { Link } from "react-router-dom";
import Button from "../Common/Button";

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative overflow-hidden bg-slate-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-60 w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <button className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg text-slate-600 shadow-sm transition hover:text-red-500">
          ♡
        </button>
      </div>

      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
          {product.category}
        </p>

        <Link to="/catalogue">
          <h3 className="mt-2 line-clamp-1 text-lg font-bold text-slate-900">
            {product.name}
          </h3>
        </Link>

        <div className="mt-2 flex items-center gap-2">
          <span className="text-sm font-medium text-amber-500">
            ★ {product.rating}
          </span>
          <span className="text-xs text-slate-400">Customer rating</span>
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <span className="text-xl font-extrabold text-slate-900">
            ₹{product.price.toLocaleString("en-IN")}
          </span>

          <Button
            className="px-4 py-2 text-sm"
            onClick={() => onAddToCart(product)}
          >
            Add
          </Button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;