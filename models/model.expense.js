import mongoose from "mongoose";
const { Schema } = mongoose;

const expenseSchema = new Schema({
  name: {
    type: String,
    required: [true, "Title is Required."],
  },
  type: {
    type: String,
  },
  description: {
    type: String,
    required: [true, "Description is Required."],
  },
  amount: {
    type: Number,
    required: [true, "Amount is Required."],
  },
  image: {
    type: String,
    required: [true, "Image is Required."],
  },
  blocked: { type: Boolean, default: false },
});
const expense = mongoose.model("Expense", expenseSchema);
export default expense;
