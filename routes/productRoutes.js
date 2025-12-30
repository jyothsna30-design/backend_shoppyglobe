import express from "express";
import productModel from "../models/Productmodel.js";
import mongoose from "mongoose";

const productrouter = express.Router();

// GET all products
productrouter.get("/", async (req, res) => {
  const products = await productModel.find();
  res.json(products);
});

// GET product by ID
productrouter.get("/:id", async (req, res) => {
 
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }
   const product = await productModel.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
});

export default productrouter;