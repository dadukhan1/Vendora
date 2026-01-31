/** @format */

import jwt from "jsonwebtoken";

class JwtProvider {
  createJwt(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });
  }
  getEmailFromJwt(token) {
    try {
      return this.verifyJwt(token).email;
    } catch (error) {
      throw new Error("Invalid Token");
    }
  }
  verifyJwt(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      throw new Error("Invalid Token");
    }
  }
}

export default new JwtProvider();
