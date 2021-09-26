import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: String,
  cartItems: [
    {
      shop_id: { type: mongoose.Schema.Types.ObjectId },
      pname: String,
      pdesc: String,
      pprice: String,
      qty: { type: Number, default: 1 },
      image: String,
      product: { type: mongoose.Schema.Types.ObjectId },
      address1: String,
      address2: String,
      area: String,
      shop_name: String,

      sphone: Number,
    },
  ],
  shipping: {
    address1: String,
    address2: String,
    area: String,
    city: String,
    user_phone: Number,
  },
  total: { type: Number, default: 0 },
  isPaid: { type: Boolean, default: false },
  deliveryStatus: { type: Boolean, default: false },
  Accepted: { type: Boolean, default: false },
  time: {
    type: Date,
    default: Date.now,
  },
});

const orderModel = mongoose.model('Order', orderSchema);

export default orderModel;
