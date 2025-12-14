import mongoose from "mongoose";

const SweetSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  quantity: Number
});

export default mongoose.model("Sweet", SweetSchema);
