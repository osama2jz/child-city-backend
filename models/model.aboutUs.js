import mongoose from "mongoose";
const { Schema } = mongoose;

const aboutUsSchema = new Schema({
  primaryEmail: {
    type: String,
    required: [true, "Email is Required."],
  },
  otherEmail: {
    type: String,
  },
  primaryPhone: {
    type: String,
    required: [true, "Phone is Required."],
  },
  otherPhone: {
    type: String,
  },
  instagram: {
    type: String,
  },
  facebook: {
    type: String,
  },
  youtube: {
    type: String,
  },
  address: {
    type: String,
    required: [true, "Address is Required."],
  },
  topAlert: {
    type: String,
  },
  activateTopAlert: {
    type: Boolean,
    required: [true, "Alert Status is Required."],
  },
  saleAlertImage: {
    type: String,
  },
  activateSaleAlert: {
    type: Boolean,
    required: [true, "Sale Alert Status is Required."],
  },
  sliderImages: {
    type: [String],
    required: [true, "Slider Images are Required."],
  },
});
const aboutUs = mongoose.model("AboutUs", aboutUsSchema);
export default aboutUs;
