import complaint from "../models/model.complaints.js";

//add category with mongo
export const addComplaint = async (req, res) => {
  const data = req.body;
  try {
    await complaint.create(data);
    res.json({ message: "Complaint added successful" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//all category with mongo
export const viewAllComplaints = async (req, res) => {
  try {
    const found = await complaint.find();
    res.json({ message: "Complaint Found.", data: found });
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
