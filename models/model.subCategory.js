import mongoose from "mongoose";
const { Schema } = mongoose;

const subCategorySchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is Required."],
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Category is Required."],
  },
  description: {
    type: String,
    required: [true, "Description is Required."],
  },
  showFilters: { type: Boolean, default: false },
  blocked: { type: Boolean, default: false },
});
const subCategory = mongoose.model("SubCategory", subCategorySchema);
export default subCategory;
