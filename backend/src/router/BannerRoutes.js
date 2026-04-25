/** @format */

import express from "express";
import BannerController from "../controller/BannerController.js";

const BannerRouter = express.Router();

BannerRouter.get("/", BannerController.getHomeBanners);
BannerRouter.post("/", BannerController.createBanner);
BannerRouter.delete("/:id", BannerController.deleteBanner);

export default BannerRouter;
