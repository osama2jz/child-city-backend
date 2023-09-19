import category from "../models/model.category.js";

//add category with mongo
export const addCategory = async (req, res) => {
  const data = req.body;
  try {
    await category.create(data);
    res.json({ message: "Category added successful" });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Category already exists" });
    }
    res.status(500).json({ error: "Internal server error" });
  }
};

//edit category with mongo
export const editCategory = async (req, res) => {
  const _id = req.params.id;
  try {
    const found = await category.findOne({ _id });
    if (!found) {
      return res.status(404).json({ error: "Category not found" });
    }
    await category.findOneAndUpdate({ _id }, req.body);
    res.json({ message: "Category updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//all category with mongo
export const viewAllCategories = async (req, res) => {
  try {
    const found = await category
      .aggregate([
        {
          $lookup: {
            from: "subcategories", // Replace with your actual collection name
            localField: "_id",
            foreignField: "category",
            as: "subCategories",
          },
        },
        { $sort: { order: 1 } },
      ])
      .exec();
    res.json({ message: "Category Found.", data: found });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//status change with mongo
export const statusChange = async (req, res) => {
  const _id = req.params.id;
  try {
    const found = await category.findOne({ _id });
    if (!found) {
      return res.status(404).json({ error: "Category not found" });
    }
    await category.findOneAndUpdate({ _id }, { blocked: !found.blocked });
    res.json({ message: "Status changed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
