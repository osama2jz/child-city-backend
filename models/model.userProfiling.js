import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is Required."],
    unique: true,
  },
  name: { type: String, required: [true, "Name is Required."] },
  //   lastName: { type: String, required: [true, "Last Name is Required."] },
  password: {
    type: String,
    required: [true, "Password is Required."],
    select: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },  
  phoneNumber: { type: String, required: [true, "Phone Number is required."] },
  blocked: { type: Boolean, default: false },
});
const user = mongoose.model("User", userSchema);
export default user;
