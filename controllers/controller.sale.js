import sale from "../models/model.sale.js";
import product from "../models/model.product.js";
import mongoose from "mongoose";

//add sale with mongo
export const addSale = async (req, res) => {
  const data = req.body;

  try {
    // await sale.deleteMany({});
    // await sale.insertMany(data);
    const promises = data.map(async (obj, ind) => {
      const categoriesToUpdate = obj.category;
      const subCategoriesToUpdate = obj.subCategory;

      const _id = obj._id || new mongoose.mongo.ObjectId();
      console.log(categoriesToUpdate, subCategoriesToUpdate,data.sale);

      obj = { _id: undefined, ...obj };
      return [
        await sale.updateOne(
          { _id: _id.toString() },
          { ...obj },
          { upsert: true }
        ),
        await product.updateMany(
          {
            category: categoriesToUpdate,
            ...(subCategoriesToUpdate?.length > 0
              ? { subCategory: { $in: subCategoriesToUpdate } }
              : {}),
          },
          { sale: obj.sale }
        ),
      ];
    });
    const result = await Promise.all(promises);
    res.json({ message: "Sale Updated successfully", result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error", err: error });
  }
};

//edit sale with mongo
export const editSale = async (req, res) => {
  const _id = req.params.id;
  const data = req.body;
  const categoriesToUpdate = data.category;
  const subCategoriesToUpdate = data.subCategory;
  try {
    const found = await sale.findOne({ _id });
    if (!found) {
      return res.status(404).json({ error: "Sale not found" });
    }
    await sale.updateMany(
      {
        category: { $in: categoriesToUpdate },
      },
      {
        $pull: {
          category: { $in: categoriesToUpdate },
          subCategory: { $in: subCategoriesToUpdate },
        },
      }
    );
    await sale.findOneAndUpdate({ _id }, req.body);
    await product.updateMany(
      {
        category: { $in: categoriesToUpdate },
        ...(subCategoriesToUpdate.length > 0
          ? { subCategory: { $in: subCategoriesToUpdate } }
          : {}),
      },
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
    const subCategoriesToUpdate = found.subCategory;
    await product.updateMany(
      {
        category: { $in: categoriesToUpdate },
        ...(subCategoriesToUpdate.length > 0
          ? { subCategory: { $in: subCategoriesToUpdate } }
          : {}),
      },
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
    const subCategoriesToUpdate = found.subCategory;
    if (found.blocked) {
      await product.updateMany(
        {
          category: { $in: categoriesToUpdate },
          ...(subCategoriesToUpdate.length > 0
            ? { subCategory: { $in: subCategoriesToUpdate } }
            : {}),
        },
        { sale: found.sale }
      );
    } else {
      await product.updateMany(
        {
          category: { $in: categoriesToUpdate },
          ...(subCategoriesToUpdate.length > 0
            ? { subCategory: { $in: subCategoriesToUpdate } }
            : {}),
        },
        { sale: 0 }
      );
    }
    await sale.findOneAndUpdate({ _id }, { blocked: !found.blocked });
    res.json({ message: "Status changed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
