import { useMemo, useState } from "react";
import products from "../data/products";
import ProductCard from "../components/Product/ProductCard";
import FilterSidebar from "../components/Filters/FilterSidebar";

const Catalogue = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const filteredProducts = useMemo(() => {
    let result =
      selectedCategory === "All"
        ? [...products]
        : products.filter(
            (product) => product.category === selectedCategory
          );

    if (sortOrder === "low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sortOrder === "high") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [selectedCategory, sortOrder]);

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);

    const updatedCart = existingItem
      ? cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [...cart, { ...product, quantity: 1 }];

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
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
          Explore electronics, clothing, shoes and accessories at prices made
          for everyday shopping.
        </p>
      </div>

      <div className="mb-7 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Catalogue</h2>

          <p className="mt-1 text-sm text-slate-500">
            Browse products and add them to your cart.
          </p>
        </div>

        <span className="hidden text-sm text-slate-500 sm:block">
          {filteredProducts.length} products
        </span>
      </div>

      <div className="grid gap-7 lg:grid-cols-[230px_1fr]">
        <FilterSidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Catalogue;