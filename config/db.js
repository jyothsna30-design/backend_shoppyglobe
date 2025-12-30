import mongoose from "mongoose";

export default async function connectDB(){

    try{ //connection to mongodb
      await mongoose.connect("mongodb://localhost:27017/shoppyglobe");
      console.log("Database connected")}
    catch(error)
    {(console.log("Database not connected",error))};
}
