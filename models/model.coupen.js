import mongoose from "mongoose";
const { Schema } = mongoose;

const coupenSchema = new Schema({
  name: {
    type: String,
    required: [true, "Coupen Name is Required."],
  },
  code: {
    type: String,
    required: [true, "Code is Required."],
  },
  off: {
    type: Number,
    required: [true, "Off Amount is Required."],
  },
  oneTime: {
    type: Boolean,
  },
  description: {
    type: String,
    required: [true, "Description is Required."],
  },
  blocked: { type: Boolean, default: false },
});
const coupen = mongoose.model("Coupen", coupenSchema);
export default coupen;
