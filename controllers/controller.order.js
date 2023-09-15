import order from "../models/model.order.js";

//add order with mongo
export const addOrder = async (req, res) => {
  const data = req.body;
  try {
    await order.create(data);
    res.json({ message: "Order added successful" });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Order already exists" });
    }
    res.status(500).json({ error: "Internal server error" });
  }
};

//get orders with mongo
export const viewOrders = async (req, res) => {
  try {
    const found = await order.find();
    res.json({ message: "Orderss Found.", data: found });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//status change with mongo
export const statusChange = async (req, res) => {
  const _id = req.params.id;
  const status = req.body.status;
  try {
    const found = await order.findOne({ _id });
    if (!found) {
      return res.status(404).json({ error: "Order not found" });
    }
    await order.findOneAndUpdate({ _id }, { status: status });
    res.json({ message: "Status changed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
