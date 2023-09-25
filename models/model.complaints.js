import mongoose from "mongoose";
const { Schema } = mongoose;

const complaintsSchema = new Schema(
  {
    customerName: {
      type: String,
    },
    subject: {
      type: String,
    },
    description: {
      type: String,
    },
    blocked: { type: Boolean, default: false },
  },
  { timestamps: true }
);
const complaints = mongoose.model("Complaints", complaintsSchema);
export default complaints;
