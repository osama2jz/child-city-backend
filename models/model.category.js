import mongoose from "mongoose";
const { Schema } = mongoose;

const categorySchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is Required."],
  },
  subTitle: {
    type: String,
  },
  description: {
    type: String,
  },
  order: {
    type: Number,
  },
  blocked: { type: Boolean, default: false },
  image: {
    type: String,
  },
});
const category = mongoose.model("Category", categorySchema);
export default category;
