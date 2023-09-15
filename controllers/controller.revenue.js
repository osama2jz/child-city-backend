import revenue from "../models/model.revenue.js";

//add order with mongo
export const addRevenue = async (req, res) => {
  const data = req.body;
  try {
    await revenue.create(data);
    res.json({ message: "Revenue added successful" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//get revenue with mongo
export const viewAllRevenue = async (req, res) => {
  try {
    const found = await revenue.find();
    res.json({ message: "Revenues Found.", data: found });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
