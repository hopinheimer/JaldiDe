import mongoose from 'mongoose';

const shopSchema = new mongoose.Schema({
  seller_id: { type: mongoose.Schema.Types.ObjectId },
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, },
  address1: { type: String, },
  address2: { type: String, },
  area: { type: String, },

  category: [{ type: String, required: true }],
  productItems: [
    {
      pname: String,
      pdesc: String,
      pprice: Number,
      image: String,
      pcategory: { type: String, required: true },
    },
  ],
});

const shopModel = mongoose.model('Shop', shopSchema);

export default shopModel;
