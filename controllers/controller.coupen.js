import coupen from "../models/model.coupen.js";
import order from "../models/model.order.js";

//add category with mongo
export const addCoupen = async (req, res) => {
  const data = req.body;
  const found = await coupen.findOne({
    $or: [{ name: data.name }, { code: data.code }],
  });
  if (found) {
    return res.status(404).json({ error: "Coupen already exists." });
  }
  try {
    await coupen.create(data);
    res.json({ message: "Coupen added successfully" });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Coupen already exists" });
    }
    res.status(500).json({ error: "Internal server error" });
  }
};

//edit category with mongo
export const editCoupen = async (req, res) => {
  const _id = req.params.id;
  try {
    const found = await coupen.findOne({ _id });
    if (!found) {
      return res.status(404).json({ error: "Coupen not found" });
    }
    await coupen.findOneAndUpdate({ _id }, req.body);
    res.json({ message: "Coupen updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//check coupen with mongo
export const checkCoupen = async (req, res) => {
  const code = req.params.code;
  const phone = req.params.phone;
  try {
    const found = await coupen.findOne({ code });
    const alreadyOrdered = await order.findOne({ phone });
    if (!found || found.blocked || (alreadyOrdered && found.oneTime)) {
      return res.status(404).json({ error: "Coupen not found" });
    }
    res.json({ message: "Coupen Found successfully", found: found.off });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//all category with mongo
export const viewAllCoupens = async (req, res) => {
  try {
    const found = await coupen.find();
    res.json({ message: "Copuens Found.", data: found });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//delete coupen with mongo
export const deleteCoupen = async (req, res) => {
  const _id = req.params.id;
  try {
    const found = await coupen.findOne({ _id });
    if (!found) {
      return res.status(404).json({ error: "Coupen not found" });
    }
    await coupen.deleteOne({ _id });
    res.json({ message: "Coupen Deleted." });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//status change with mongo
export const statusChange = async (req, res) => {
  const _id = req.params.id;
  try {
    const found = await coupen.findOne({ _id });
    if (!found) {
      return res.status(404).json({ error: "Coupen not found" });
    }
    await coupen.findOneAndUpdate({ _id }, { blocked: !found.blocked });
    res.json({ message: "Status changed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
