import expense from "../models/model.expense.js";

//add expense with mongo
export const addExpense = async (req, res) => {
  const data = req.body;
  try {
    await expense.create(data);
    res.json({ message: "Expense added successful" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//edit expense with mongo
export const editExpense = async (req, res) => {
  const _id = req.params.id;
  try {
    const found = await expense.findOne({ _id });
    if (!found) {
      return res.status(404).json({ error: "Expense not found" });
    }
    await expense.findOneAndUpdate({ _id }, req.body);
    res.json({ message: "Expense updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//all expense with mongo
export const viewAllExpense = async (req, res) => {
  try {
    const found = await expense.find();
    res.json({ message: "Expense Found.", data: found });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//delete expense with mongo
export const deleteExpense = async (req, res) => {
  const _id = req.params.id;
  try {
    const found = await expense.findOne({ _id });
    if (!found) {
      return res.status(404).json({ error: "Expense not found" });
    }
    await expense.deleteOne({ _id });
    res.json({ message: "Expense Deleted." });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
