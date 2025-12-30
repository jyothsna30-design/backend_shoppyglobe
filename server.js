import express from "express";
import connectDB from "./config/db.js";
import cartrouter from "./routes/cartRoutes.js";
import productrouter from "./routes/productRoutes.js";
import authrouter from "./routes/authRoutes.js";


const app = express();
app.use(express.json());

app.listen("8080", ()=>{console.log("Server is running at port 8080")});

app.use("/products", productrouter);
app.use("/cart", cartrouter);
app.use("/", authrouter);

/* Global Error Handler (optional but recommended) */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

connectDB();