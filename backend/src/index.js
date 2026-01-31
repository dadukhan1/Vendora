/** @format */

import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectToDB from "./utils/db.js";
import { SellerRouter } from "./router/SellerRoutes.js";
import { AdminRouter } from "./router/AdminRoutes.js";
import { AuthRouter } from "./router/AuthRoutes.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Vendora");
});

app.use("/api/auth", AuthRouter);
app.use("/api/seller/", SellerRouter);
app.use("/api/admin", AdminRouter);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectToDB();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer();
