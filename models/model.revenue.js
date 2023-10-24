import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema({
  product: {
    type: Object,
  },
  quantity: {
    type: Number,
  },
});

const revenueSchema = new Schema(
  {
    product: { type: [productSchema] },
    totalPrice: {
      type: Number,
      required: [true, "Price is Required."],
    },
    userId: {
      type: Schema.ObjectId,
    },
    orderId: {
      type: Schema.ObjectId,
    },
    customerName: {
      type: String,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    paymentMode: {
      type: String,
    },
    paymentReceipt: {
      Type: String,
    },
    status: { type: String },
  },
  { timestamps: true }
);
const revenue = mongoose.model("Revenue", revenueSchema);
export default revenue;
