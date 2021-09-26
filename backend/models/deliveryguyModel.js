import mongoose from 'mongoose';

const deliverySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, dropDups: true },
  password: { type: String, required: true },
  contactno: { type: Number, required: true },
});

const deliveryModel = mongoose.model('deliveryGuy', deliverySchema);

export default deliveryModel;
