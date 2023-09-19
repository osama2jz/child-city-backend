import mongoose from "mongoose";
const { Schema } = mongoose;

const saleSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is Required."],
  },
  sale: {
    type: Number,
    required: [true, "Sale Percent is Required."],
  },
  category: {
    type: [Schema.ObjectId],
    ref: "Category",
    required: [true, "Categories required."],
  },
  subCategory: {
    type: [Schema.ObjectId],
    ref: "SubCategory",
    required: [true, "Sub Categories required."],
  },
  description: {
    type: String,
    required: [true, "Description is Required."],
  },
  blocked: { type: Boolean, default: false },
});
const sale = mongoose.model("Sale", saleSchema);
export default sale;
