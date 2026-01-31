/** @format */

import SellerService from "../service/SellerService.js";
import jwtProvider from "../utils/jwtProvider.js";

const sellerAuthMiddleware = async (req, res, next) => {
  try {
    const authHeaders = req.headers.authorization;

    if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Invalid token, authorization failed." });
    }

    const token = authHeaders.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Invalid token, authorization failed." });
    }

    const email = jwtProvider.getEmailFromJwt(token);

    if (!email) {
      return res
        .status(401)
        .json({ message: "Invalid token, authorization failed." });
    }

    const seller = await SellerService.getSellerByEmail(email);

    if (!seller) {
      return res
        .status(401)
        .json({ message: "Seller not found, authorization failed." });
    }

    req.seller = seller;

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token." });
  }
};

export default sellerAuthMiddleware;
