import mongoose from "mongoose";
//defining cartschema
 const cartschema = new mongoose.Schema(
    //referring to user and product ids
    {user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
     quantity: Number});
//defining model
 const cartModel = new mongoose.model("Cart",cartschema);
 export default cartModel;

