import mongoose from "mongoose";
const { Schema } = mongoose;

const faqSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is Required."],
    },
    question: {
      type: String,
      required: [true, "Question is Required."],
    },
    answer: {
      type: String,
      required: [true, "Answer is Required."],
    },
    blocked: { type: Boolean, default: false },
  },
  { timestamps: true }
);
const faqs = mongoose.model("Faqs", faqSchema);
export default faqs;
