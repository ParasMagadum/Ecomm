import { Link } from "react-router-dom";
import Button from "../Common/Button";

const ProductCard = ({ product, onAddToCart, onAddToWishlist }) => {
  const category =
    typeof product.category === "object"
      ? product.category?.name
      : product.category;

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative overflow-hidden bg-slate-100">
        <Link to={`/products/${product._id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="h-60 w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </Link>

        <button
          type="button"
          onClick={() => onAddToWishlist?.(product)}
          aria-label={`Add ${product.name} to wishlist`}
          title="Add to wishlist"
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-2xl text-slate-600 shadow-md transition hover:bg-red-50 hover:text-red-500"
        >
          ♡
        </button>
      </div>

      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          {category || "Products"}
        </p>

        <Link to={`/products/${product._id}`}>
          <h3 className="mt-2 line-clamp-1 text-lg font-bold text-slate-900">
            {product.name}
          </h3>
        </Link>

        <p className="mt-2 line-clamp-2 text-sm text-slate-500">
          {product.description}
        </p>

        <div className="mt-5 flex items-center justify-between gap-3">
          <span className="text-xl font-extrabold text-slate-900">
            ₹{Number(product.price).toLocaleString("en-IN")}
          </span>

          <Button
            className="px-4 py-2 text-sm"
            onClick={() => onAddToCart(product)}
          >
            {Number(product.stock) <= 0 ? "Out of stock" : "Add"}
          </Button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;