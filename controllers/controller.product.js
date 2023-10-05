import product from "../models/model.product.js";

//add product with mongo
export const addProduct = async (req, res) => {
  const data = req.body;
  const alreadyExists = await product.findOne({ sku: data.sku });
  if (alreadyExists) {
    return res.status(400).json({ error: "Product already exists." });
  }
  try {
    await product.create(data);
    res.json({ message: "Product added successful" });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Product already exists" });
    }
    res.status(500).json({ error: "Internal server error" });
  }
};

//edit product with mongo
export const editProduct = async (req, res) => {
  const _id = req.params.id;
  try {
    const found = await product.findOne({ _id });
    if (!found) {
      return res.status(404).json({ error: "Product not found" });
    }
    await product.findOneAndUpdate({ _id }, req.body);
    res.json({ message: "Product updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//all category with mongo
export const viewAllProduct = async (req, res) => {
  try {
    const found = await product
      .find()
      .populate({ path: "category" })
      .populate({ path: "subCategory" })
      .sort({ createdAt: "desc" });
    res.json({ message: "Product Found.", data: found });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const viewSingleProduct = async (req, res) => {
  const _id = req.params.id;
  try {
    const found = await product
      .findOne({ _id })
      .populate({ path: "category" })
      .populate({ path: "subCategory" });
    res.json({ message: "Product Found.", data: found });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//all home produtcs with mongo
export const viewShowOnHome = async (req, res) => {
  try {
    const found = await product
      .find({ showOnHome: true })
      .populate({ path: "category" })
      .populate({ path: "subCategory" })
      .sort({ createdAt: "desc" });
    res.json({ message: "Product Found.", data: found });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//delete product with mongo
export const deleteProduct = async (req, res) => {
  const _id = req.params.id;
  try {
    const found = await product.findOne({ _id });
    if (!found) {
      return res.status(404).json({ error: "Product not found" });
    }
    await product.deleteOne({ _id });
    res.json({ message: "Product Deleted." });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//status change with mongo
export const statusChange = async (req, res) => {
  const _id = req.params.id;
  try {
    const found = await product.findOne({ _id });
    if (!found) {
      return res.status(404).json({ error: "Product not found" });
    }
    await product.findOneAndUpdate({ _id }, { blocked: !found.blocked });
    res.json({ message: "Status changed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
