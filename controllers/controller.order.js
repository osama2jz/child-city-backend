import order from "../models/model.order.js";
import product from "../models/model.product.js";
import sgMail from "@sendgrid/mail";
import revenue from "../models/model.revenue.js";

//add order with mongo
export const addOrder = async (req, res) => {
  const data = req.body;
  let products = data?.product.map((obj) => obj?._id);
  try {
    await order.create(data);
    await product.updateMany(
      { _id: { $in: products } },
      { $inc: { quantity: -1 } }
    );
    res.json({ message: "Order added successful" });
    sgMail.setApiKey(
      process.env.SENDGRID_KEY ||
        "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"
    );
    const msg = {
      to: data.email,
      from: "admin@childcity.shop",
      subject: "Order Confirmation",
      text: `Your order has been confirm. Your order ID is ${data.orderNo}. Thank you for shopping with us.`,
      // html: '<p>This is a test email sent using SendGrid in Node.js</p>',
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.error(error);
        console.log(JSON.stringify(error, null, 2));
      });
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
    const found = await order
      .find()
      .populate("userId")
      .sort({ createdAt: "desc" });
    res.json({ message: "Orderss Found.", data: found });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
//get orders with mongo
export const viewOrderById = async (req, res) => {
  const id = req.params.id;
  try {
    const found = await order.find({ userId: id });
    res.json({ message: "Orders Found.", data: found });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
//get single order with mongo
export const viewSingleOrderById = async (req, res) => {
  const id = req.params.id;
  try {
    const found = await order.findOne({ _id:id });
    res.json({ message: "Order Found.", data: found });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//delete order
export const deleteOrder = async (req, res) => {
  const _id = req.params.id;
  try {
    const found = await order.findOne({ _id });
    if (!found) {
      return res.status(404).json({ error: "Order not found" });
    }
    await order.deleteOne({ _id });
    res.json({ message: "Order Deleted." });
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
    if (status === "Delivered") {
      await revenue.create({
        customerName: found.name,
        totalPrice: found.totalPrice,
        paymentMode: found.paymentMode,
        product: found.product,
        title: "Product Order",
        orderId: found._id,
      });
    }
    res.json({ message: "Status changed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
