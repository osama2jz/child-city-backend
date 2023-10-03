import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is Required."],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "categoryId is Required."],
    },
    subCategory: {
      type: Schema.Types.ObjectId,
      ref: "SubCategory",
    },
    colors: {
      type: [String],
    },
    sizes: {
      type: [String],
    },
    sale: {
      type: Number,
    },
    actualPrice: {
      type: Number,
      required: [true, "Actual Price is Required."],
    },
    price: {
      type: Number,
      required: [true, "Price is Required."],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is Required."],
    },
    sku: {
      type: String,
      unique: true,
      required: [true, "SKU is Required."],
    },
    description: {
      type: String,
      required: [true, "Description is Required."],
    },
    showOnHome: {
      type: Boolean,
      default: false,
    },
    images: {
      type: [String],
      required: [true, "At least one image is Required."],
    },
    blocked: { type: Boolean, default: false },
  },
  { timestamps: true }
);
const product = mongoose.model("Product", productSchema);
export default product;
