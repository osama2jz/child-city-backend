import express from "express";
import morgan from "morgan";
import cors from "cors";
import ProfilingRouter from "./routes/route.userProfiling.js";
import Sale from "./routes/route.sale.js";
import Revenue from "./routes/route.revenue.js";
import Product from "./routes/route.product.js";
import Order from "./routes/route.order.js";
import Expense from "./routes/route.expense.js";
import Category from "./routes/route.category.js";
import AboutUs from "./routes/route.aboutUs.js";
import mongoose from "mongoose";

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.get("/", (req, res) => {
  res.json({ message: "Server is running." });
});

//routes
app.use("/user", Profilin