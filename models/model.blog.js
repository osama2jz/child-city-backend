import mongoose from "mongoose";
const { Schema } = mongoose;

const blogsSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is Required."],
    },
    details: {
      type: String,
      required: [true, "Detail is Required."],
    },
    blocked: { type: Boolean, default: false },
    image: {
      type: String,
      required: [true, "Image is Required."],
    },
  },
  { timestamps: true }
);
const blogs = mongoose.model("Blogs", blogsSchema);
export default blogs;
