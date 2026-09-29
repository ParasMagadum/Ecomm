const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const wishlistRoutes = require("./routes/wishlistRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.json({ message: "E-Commerce API is running" }));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/admin/products", require("./routes/productRoutes"));
app.use("/api/admin/categories", require("./routes/categoryRoutes"));
app.use("/api/admin/inventory", require("./routes/inventoryRoutes"));
app.use("/api/admin/users", require("./routes/userRoutes"));
app.use("/api/admin/orders", require("./routes/adminOrderRoutes"));
app.use("/api/admin/returns", require("./routes/returnRoutes"));

app.use("/api/products", require("./routes/customerProductRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/wishlist", require("./routes/wishlistRoutes"));
app.use("/api/profile", require("./routes/profileRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
