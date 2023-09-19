import mongoose from "mongoose";
const { Schema } = mongoose;

const categorySchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is Required."],
  },
  subTitle: {
    type: String,
    required: [true, "Sub Title is Required."],
  },
  description: {
    type: String,
    required: [true, "Description is Required."],
  },
  blocked: { type: Boolean, default: false },
  image: {
    type: String,
    required: [true, "Image is Required."],
  },
});
const category = mongoose.model("Category", categorySchema);
export default category;
