import express from "express";
import cartModel from "../models/Cartmodel.js";
import authMiddleware from "../middleware/authMiddleware.js";
import productModel from "../models/Productmodel.js";
import mongoose from "mongoose";
const cartrouter = express.Router();

// Add to cart
cartrouter.post("/", authMiddleware, async (req, res) => {
  const { productId, quantity } = req.body;

  const product = await productModel.findById(productId);
  if (!product) return res.status(404).json({ message: "Product not found" });

  const cartItem = new cartModel({
    user: req.user,
    product: productId,
    quantity
  });

  await cartItem.save();
  res.status(201).json(cartItem);
});

// Update cart
cartrouter.put("/:id", authMiddleware, async (req, res) => {
  const {id} = req.params;
  const {quantity} = req.body;
   if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid cart ID" });
  }
  const cartItem = await cartModel.findByIdAndUpdate(id,{quantity},{ new: true });
   if (!cartItem) {
    return res.status(404).json({ message: "Cart item not found" });
  }
  res.json(cartItem);
});

// Delete cart item
cartrouter.delete("/:id", authMiddleware, async (req, res) => {

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid cart ID" });
  }
  
  await cartModel.findByIdAndDelete(req.params.id);
  res.json({ message: "Item removed from cart" });
});

export default cartrouter;


