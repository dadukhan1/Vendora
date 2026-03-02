/** @format */

import express from "express";
import { addAddress, deleteAddress, getUserAddresses } from "../controller/AddressController.js";
import authMiddleware from "../middlewares/AuthMiddleware.js";

const AddressRouter = express.Router();

AddressRouter.get("/", authMiddleware, getUserAddresses);

AddressRouter.post("/", authMiddleware, addAddress);

AddressRouter.delete("/:addressId", authMiddleware, deleteAddress);

export default AddressRouter;
