/** @format */

import UserService from "../service/UserService.js";
import jwtProvider from "../utils/jwtProvider.js";

const authMiddleware = async (req, res, next) => {
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

    const user = await UserService.findUserByEmail(email);

    if (!user) {
      return res
        .status(401)
        .json({ message: "Seller not found, authorization failed." });
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token." });
  }
};

export default authMiddleware;
