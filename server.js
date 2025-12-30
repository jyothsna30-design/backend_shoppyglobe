import express from "express";
import connectDB from "./config/db.js";
import cartrouter from "./routes/cartRoutes.js";
import productrouter from "./routes/productRoutes.js";
import authrouter from "./routes/authRoutes.js";


const app = express();
app.use(express.json());
//starting server with port 8080
app.listen("8080", ()=>{console.log("Server is running at port 8080")});
//defining routes
app.use("/products", productrouter);
app.use("/cart", cartrouter);
app.use("/", authrouter);

//middleware to handle any errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});
//connection to database
connectDB();