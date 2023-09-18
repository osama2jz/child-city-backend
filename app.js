import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import Sale from "./routes/route.sale.js";
import Revenue from "./routes/route.revenue.js";
import Product from "./routes/route.product.js";
import Order from "./routes/route.order.js";
import Expense from "./routes/route.expense.js";
import Category from "./routes/route.category.js";
import AboutUs from "./routes/route.aboutUs.js";
import SubCategory from "./routes/route.subCategory.js";
import ProfilingRouter from "./routes/route.userProfiling.js";

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.get("/", (req, res) => {
  res.json({ message: "Server is running." });
});

//routes
app.use("/user", ProfilingRouter);
app.use("/sale", Sale);
app.use("/revenue", Revenue);
app.use("/product", Product);
app.use("/order", Order);
app.use("/expense", Expense);
app.use("/category", Category);
app.use("/sub-category", SubCategory);
app.use("/aboutus", AboutUs);

app.use((error, req, res, next) => {
  return res.status(500).json({ message: "Something went Wrong." });
});
const PORT = process.env.PORT || 6969;
// app.listen(PORT, () => {
//   console.log("App listening on port", PORT);
// });
const MONGO_DB_URL =
  "mongodb+srv://mosama4u:osama2jz@cluster0.k4da7we.mongodb.net/childCity";
mongoose.connect(MONGO_DB_URL).then(() => {
  app.listen(6969, () => console.log("We are live with DB (maybe)"));
});
