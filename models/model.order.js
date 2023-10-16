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

const addressSchema = new Schema({
  province: {
    type: String,
    required: [true, "Province is Required."],
  },
  city: {
    type: String,
    required: [true, "City is Required."],
  },
  address: {
    type: String,
    required: [true, "Address is Required."],
  },
  postalCode: {
    type: Number,
  },
});

const orderSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    product: { type: [productSchema] },
    totalPrice: {
      type: Number,
      required: [true, "Price is Required."],
    },
    subtotal: {
      type: Number,
    },
    coupen: {
      type: Number,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    discountedPrice: {
      type: Number,
    },
    paymentMode: {
      type: String,
      required: [true, "Payment Mode is Required."],
    },
    paymentReceipt: {
      type: String,
    },
    orderNo: {
      type: String,
    },
    address: {
      type: addressSchema,
    },
    status: { type: String, required: [true, "Status is Required."] },
  },
  { timestamps: true }
);

const order = mongoose.model("Order", orderSchema);
export default order;
