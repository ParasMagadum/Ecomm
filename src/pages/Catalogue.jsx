import { useEffect, useMemo, useState } from "react";
import {
  getCatalogue,
  addCartItem,
  addWishlistItem,
} from "../api/customer";
import ProductCard from "../components/Product/ProductCard";
import FilterSidebar from "../components/Filters/FilterSidebar";

const Catalogue = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    getCatalogue()
      .then(setProducts)
      .catch((err) =>
        setError(
          err.response?.data?.message ||
            "Unable to load products. Check that the backend is running."
        )
      );
  }, []);

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const categoryName =
        typeof product.category === "object"
          ? product.category?.name
          : product.category;

      return (
        (selectedCategory === "All" ||
          categoryName === selectedCategory) &&
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    });

    if (sortOrder === "low") {
      result = [...result].sort((a, b) => a.price - b.price);
    }

    if (sortOrder === "high") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, selectedCategory, sortOrder, search]);

  const handleAdd = async (product) => {
    if (!localStorage.getItem("token")) {
      setError("Please log in before adding products to your cart.");
      setNotice("");
      return;
    }

    try {
      await addCartItem(product._id, 1);
      setNotice(`${product.name} added to your cart.`);
      setError("");
    } catch (err) {
      setError(
        err.response?.data?.message || "Could not add product to cart."
      );
      setNotice("");
    }
  };

  const handleAddToWishlist = async (product) => {
    if (!localStorage.getItem("token")) {
      setError("Please log in before adding products to your wishlist.");
      setNotice("");
      return;
    }

    try {
      await addWishlistItem(product._id);
      setNotice(`${product.name} added to your wishlist.`);
      setError("");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Could not add product to your wishlist."
      );
      setNotice("");
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
      <div className="mb-8 rounded-xl bg-slate-100 px-6 py-8 md:px-10">
        <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
          Discover something new
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
          Shop your favourites
        </h1>

        <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">
          Browse available products and add your selections to the cart.
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="w-full rounded-lg border border-slate-200 px-4 py-3 sm:max-w-md"
        />

        <span className="self-center text-sm text-slate-500">
          {filteredProducts.length} products
        </span>
      </div>

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

      <div className="grid gap-7 lg:grid-cols-[230px_1fr]">
        <FilterSidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />

        {filteredProducts.length ? (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onAddToCart={handleAdd}
                onAddToWishlist={handleAddToWishlist}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500">No products found.</p>
        )}
      </div>
    </section>
  );
};

export default Catalogue;