import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema({
  product: {
    type: Object,
    required: [true, "Product is Required."],
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is Required."],
  },
});

const revenueSchema = new Schema({
  product: { type: [productSchema] },
  totalPrice: {
    type: Number,
    required: [true, "Price is Required."],
  },
  userId: {
    type: Schema.ObjectId,
  },
  paymentMode: {
    type: String,
    required: [true, "Payment Mode is Required."],
  },
  paymentReceipt: {
    Type: String,
  },
  status: { type: String, required: [true, "Status is Required."] },
});
const revenue = mongoose.model("Revenue", revenueSchema);
export default revenue;
