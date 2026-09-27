import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getWishlist,
  removeWishlistItem,
  addCartItem,
} from "../api/customer";

const Wishlist = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const loadWishlist = async () => {
    try {
      const data = await getWishlist();
      setProducts(data.products || []);
      setError("");
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to load your wishlist."
      );
    }
  };

  useEffect(() => {
    loadWishlist();
  }, []);

  const handleRemove = async (productId) => {
    try {
      await removeWishlistItem(productId);
      setProducts((current) =>
        current.filter((product) => product._id !== productId)
      );
      setNotice("Product removed from wishlist.");
      setError("");
    } catch (err) {
      setError(
        err.response?.data?.message || "Could not remove product."
      );
    }
  };

  const handleAddToCart = async (product) => {
    try {
      await addCartItem(product._id, 1);
      setNotice(`${product.name} added to your cart.`);
      setError("");
    } catch (err) {
      setError(
        err.response?.data?.message || "Could not add product to cart."
      );
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
      <h1 className="mb-2 text-3xl font-bold text-slate-900">My Wishlist</h1>
      <p className="mb-6 text-sm text-slate-500">
        Products you have saved for later.
      </p>

      {error && (
        <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
          {error}
        </p>
      )}

      {notice && (
        <p className="mb-4 rounded-lg bg-green-50 p-3 text-sm text-green-700">
          {notice}
        </p>
      )}

      {products.length === 0 && !error ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
          <p className="text-lg font-semibold text-slate-800">
            Your wishlist is empty
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Add products using the heart button.
          </p>
          <Link
            to="/catalogue"
            className="mt-5 inline-block rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-700"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article
              key={product._id}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
            >
              <Link to={`/products/${product._id}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-56 w-full object-cover"
                />
              </Link>

              <div className="p-5">
                <Link to={`/products/${product._id}`}>
                  <h2 className="text-lg font-bold text-slate-900">
                    {product.name}
                  </h2>
                </Link>

                <p className="mt-2 text-xl font-extrabold text-slate-900">
                  ₹{Number(product.price).toLocaleString("en-IN")}
                </p>

                <div className="mt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => handleAddToCart(product)}
                    disabled={Number(product.stock) <= 0}
                    className="flex-1 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {Number(product.stock) <= 0
                      ? "Out of stock"
                      : "Add to Cart"}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRemove(product._id)}
                    className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default Wishlist;