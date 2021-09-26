import mongoose from 'mongoose';

const sellerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, dropDups: true },
  sphone: { type: Number, required: true},
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: true },
});

const sellerModel = mongoose.model("Seller", sellerSchema);

export default sellerModel;