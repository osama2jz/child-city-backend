import subCategory from "../models/model.subCategory.js";

//add category with mongo
export const addSubCategory = async (req, res) => {
  const data = req.body;
  try {
    await subCategory.create(data);
    res.json({ message: "Sub Category added successfully" });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Sub Category already exists" });
    }
    res.status(500).json({ error: "Internal server error" });
  }
};

//edit category with mongo
export const editSubCategory = async (req, res) => {
  const _id = req.params.id;
  try {
    const found = await subCategory.findOne({ _id });
    if (!found) {
      return res.status(404).json({ error: "Sub Category not found" });
    }
    await subCategory.findOneAndUpdate({ _id }, req.body);
    res.json({ message: "Sub Category updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//all category with mongo
export const viewAllSubCategories = async (req, res) => {
  try {
    const found = await subCategory.find().populate({ path: "category" });
    res.json({ message: "Sub Category Found.", data: found });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//status change with mongo
export const statusChange = async (req, res) => {
  const _id = req.params.id;
  try {
    const found = await subCategory.findOne({ _id });
    if (!found) {
      return res.status(404).json({ error: "Sub Category not found" });
    }
    await subCategory.findOneAndUpdate({ _id }, { blocked: !found.blocked });
    res.json({ message: "Status changed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
