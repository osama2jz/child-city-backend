import bcrypt from "bcrypt";
import user from "../models/model.userProfiling.js";
import jwt from "jsonwebtoken";

//signin with monngo
export const Signin = async (req, res) => {
  const { email, password } = req.body;
  const found = await user
    .findOne({ email: email, blocked: false })
    .select("+password")
    .lean();
  if (!found) {
    return res.status(404).json({ error: "User not found" });
  }
  const isPasswordValid = await bcrypt.compare(password, found.password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid password" });
  }
  const secretKey = "abcsp32i42j32io3dj293j";
  const token = jwt.sign(found, secretKey);
  res.json({
    message: "Sign-in successful",
    status: 200,
    user: {
      token,
      name: found.name,
      email: found.email,
      phoneNumber: found.phoneNumber,
      userId: found._id,
      isAdmin: found.isAdmin,
      addresses: found.addresses || [],
    },
  });
};

//signup with monngo
export const SignUp = async (req, res) => {
  const data = req.body;
  const alreadyExists = await user.findOne({ email: data.email });
  if (alreadyExists) {
    return res.status(400).json({ error: "Email already taken" });
  }
  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;
    await user.create(data);

    res.json({ message: "Sign-up successful" });
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return res.status(400).json({ message: "email already exists" });
    }
    res.status(500).json({ error: "Internal server error" });
  }
};

//editprofile with mongo
export const editProfile = async (req, res) => {
  const _id = req.params.id;
  try {
    const userFound = await user.findOne({ _id });
    if (!userFound) {
      return res.status(404).json({ error: "User not found" });
    }
    await user.findOneAndUpdate({ _id }, req.body);
    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//change address with mongo
export const updateAddress = async (req, res) => {
  const _id = req.params.id;
  try {
    const userFound = await user.findOne({ _id });
    if (!userFound) {
      return res.status(404).json({ error: "User not found" });
    }
    await user.findOneAndUpdate({ _id }, { addresses: req.body });
    res.json({ message: "Address updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//viewUser with mongo
export const viweUser = async (req, res) => {
  const _id = req.params.id;
  try {
    const userFound = await user.findOne({ _id });
    if (!userFound) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User Found.", data: userFound });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//all users with mongo
export const viewAllUsers = async (req, res) => {
  try {
    const userFound = await user.find();
    res.json({ message: "Users Found.", data: userFound });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//delete user with mongo
export const deleteUser = async (req, res) => {
  const _id = req.params.id;
  try {
    const userFound = await user.findOne({ _id });
    if (!userFound) {
      return res.status(404).json({ error: "User not found" });
    }
    await user.deleteOne({ _id });
    res.json({ message: "User Deleted." });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//change password
export const changePassword = async (req, res) => {
  const _id = req.params.id;
  const { oldPassword, newPassword } = req.body;
  try {
    const userFound = await user.findOne({ _id }).select("+password");
    if (!userFound) {
      return res.status(404).json({ error: "User not found" });
    }
    const correctPassword = await bcrypt.compare(
      oldPassword,
      userFound.password
    );
    if (correctPassword) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await user.findOneAndUpdate({ _id: _id }, { password: hashedPassword });
      res.json({ message: "Password Updated." });
    } else {
      res.json({ message: "Old password is wrong.", statue: false });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//status change with mongo
export const statusChange = async (req, res) => {
  const _id = req.params.id;
  try {
    const userFound = await user.findOne({ _id });
    if (!userFound) {
      return res.status(404).json({ error: "User not found" });
    }
    await user.findOneAndUpdate({ _id }, { blocked: !userFound.blocked });
    res.json({ message: "Status changed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
