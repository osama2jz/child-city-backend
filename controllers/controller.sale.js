import sale from "../models/model.sale.js";
import product from "../models/model.product.js";

//add sale with mongo
export const addSale = async (req, res) => {
  const data = req.body;

  try {
    const categoriesToUpdate = data.category;
    await sale.updateMany(
      { category: { $in: categoriesToUpdate } },
      {
        $pull: { category: { $in: categoriesToUpdate } },
      }
    );
    await sale.create(data);
    await product.updateMany(
      { category: { $in: categoriesToUpdate } },
      { sale: data.sale }
    );
    await sale.deleteMany({ category: [] });
    res.json({ message: "Sale added successfully" });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Sale already exists" });
    }
    res.status(500).json({ error: "Internal server error" });
  }
};

//edit sale with mongo
export const editSale = async (req, res) => {
  const _id = req.params.id;
  try {
    const found = await sale.findOne({ _id });
    if (!found) {
      return res.status(404).json({ error: "Sale not found" });
    }
    await sale.updateMany(
      { category: { $in: categoriesToUpdate } },
      {
        $pull: { category: { $in: categoriesToUpdate } },
      }
    );
    await sale.findOneAndUpdate({ _id }, req.body);
    const categoriesToUpdate = data.category;
    await product.updateMany(
      { category: { $in: categoriesToUpdate } },
      { sale: data.sale }
    );
    res.json({ message: "Sale updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//all sale with mongo
export const viewAllSales = async (req, res) => {
  try {
    const found = await sale.find().populate({ path: "category" });
    res.json({ message: "Sales Found.", data: found });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//delete sale with mongo
export const deleteSale = async (req, res) => {
  const _id = req.params.id;
  try {
    const found = await sale.findOne({ _id });
    if (!found) {
      return res.status(404).json({ error: "Sale not found" });
    }
    await sale.deleteOne({ _id });
    const categoriesToUpdate = found.category;
    await product.updateMany(
      { category: { $in: categoriesToUpdate } },
      { sale: 0 }
    );
    res.json({ message: "Sale Deleted." });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//status change with mongo
export const statusChange = async (req, res) => {
  const _id = req.params.id;
  try {
    const found = await sale.findOne({ _id });
    if (!found) {
      return res.status(404).json({ error: "Category not found" });
    }
    const categoriesToUpdate = found.category;
    if (found.blocked) {
      await product.updateMany(
        { category: { $in: categoriesToUpdate } },
        { sale: found.sale }
      );
    } else {
      await product.updateMany(
        { category: { $in: categoriesToUpdate } },
        { sale: 0 }
      );
    }
    await sale.findOneAndUpdate({ _id }, { blocked: !found.blocked });
    res.json({ message: "Status changed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
