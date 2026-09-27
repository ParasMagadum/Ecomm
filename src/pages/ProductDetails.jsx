import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { addCartItem, getProductDetails } from "../api/customer";
import Button from "../components/Common/Button";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    getProductDetails(id).then(setProduct).catch((err) => setError(err.response?.data?.message || "Unable to load product."));
  }, [id]);

  const addToCart = async () => {
    if (!localStorage.getItem("token")) {
      setError("Please log in before adding products to your cart.");
      return;
    }
    try {
      await addCartItem(product._id, 1);
      setNotice("Product added to cart.");
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Could not add product to cart.");
    }
  };

  if (error && !product) return <section className="p-10 text-center">{error}</section>;
  if (!product) return <section className="p-10 text-center">Loading product...</section>;

  return (
    <section className="mx-auto max-w-6xl px-5 py-10">
      <Link to="/catalogue" className="text-sm text-slate-500 hover:text-slate-900">← Back to catalogue</Link>
      <div className="mt-6 grid gap-8 md:grid-cols-2">
        <img src={product.image} alt={product.name} className="w-full rounded-2xl object-cover" />
        <div>
          <p className="text-sm text-slate-500">{product.category?.name || "Product"}</p>
          <h1 className="mt-2 text-3xl font-bold">{product.name}</h1>
          <p className="mt-4 text-2xl font-extrabold">₹{Number(product.price).toLocaleString("en-IN")}</p>
          <p className="mt-5 leading-7 text-slate-600">{product.description}</p>
          <p className="mt-4 text-sm text-slate-500">Available stock: {product.stock}</p>
          {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
          {notice && <p className="mt-4 text-sm text-green-700">{notice}</p>}
          <Button className="mt-6" onClick={addToCart}>{product.stock > 0 ? "Add to Cart" : "Out of Stock"}</Button>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
