import faq from "../models/model.faq.js";

//add blog with mongo
export const addFaq = async (req, res) => {
  const data = req.body;
  try {
    await faq.create(data);
    res.json({ message: "Faq added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//edit blog with mongo
export const editFaq = async (req, res) => {
  const _id = req.params.id;
  try {
    const found = await faq.findOne({ _id });
    if (!found) {
      return res.status(404).json({ error: "Faq not found" });
    }
    await faq.findOneAndUpdate({ _id }, req.body);
    res.json({ message: "Faq updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//all blogs with mongo
export const viewAllFaqs = async (req, res) => {
  try {
    const found = await faq.find();
    res.json({ message: "Faqs Found.", data: found });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//delete blogs with mongo
export const deleteFaq = async (req, res) => {
  const _id = req.params.id;
  try {
    const found = await faq.findOne({ _id });
    if (!found) {
      return res.status(404).json({ error: "Faq not found" });
    }
    await faq.deleteOne({ _id });
    res.json({ message: "Faq Deleted." });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//status change with mongo
export const statusChange = async (req, res) => {
  const _id = req.params.id;
  try {
    const found = await faq.findOne({ _id });
    if (!found) {
      return res.status(404).json({ error: "Faq not found" });
    }
    await faq.findOneAndUpdate({ _id }, { blocked: !found.blocked });
    res.json({ message: "Status changed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
