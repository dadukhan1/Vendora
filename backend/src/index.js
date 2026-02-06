/** @format */

import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectToDB from "./utils/db.js";
import { SellerRouter } from "./router/SellerRoutes.js";
import { AdminRouter } from "./router/AdminRoutes.js";
import { AuthRouter } from "./router/AuthRoutes.js";
import { UserRouter } from "./router/UserRoutes.js";
import { SellerProductRouter } from "./router/SellerProductRoutes.js";
import { ProductRouter } from "./router/ProductRoutes.js";
import { CartRouter } from "./router/CartRoutes.js";
import { OrderRouter } from "./router/OrderRoutes.js";
import { SellerOrderRouter } from "./router/SellerOrderRoutes.js";
import { TransactionrRouter } from "./router/TransactionRoutes.js";
import { SellerReportRouter } from "./router/SellerReportRotues.js";
import HomeCategoryRoutes from "./router/HomeCategoryRoutes.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Vendora");
});

app.use("/api/auth", AuthRouter);
app.use("/api/user", UserRouter);
app.use("/api/seller/", SellerRouter);

app.use("/api/products", ProductRouter);
app.use("/api/seller/products", SellerProductRouter);

app.use("/api/cart", CartRouter);

app.use("/api/order", OrderRouter);
app.use("/api/seller/order", SellerOrderRouter);

app.use("/api/transactions", TransactionrRouter);
app.use("/api/seller/report", SellerReportRouter);

app.use("/api/admin", AdminRouter);

app.use("/home", HomeCategoryRoutes);
app.use("admin/deals", dealRoutes);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectToDB();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer();
