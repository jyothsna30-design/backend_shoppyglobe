import mongoose from "mongoose";
//defining product schema and productmodel
const productschema = new mongoose.Schema({
  name: {type:String, required:true},
  price: {type:Number, required:true},
  description: String,
  stock: {type:Number,required:true}

})

const productModel = mongoose.model("Product",productschema);
export default productModel;