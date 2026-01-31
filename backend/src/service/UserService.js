/** @format */

import { User } from "../models/User.js";
import jwtProvider from "../utils/jwtProvider.js";

class UserService {
  async findUserProfileJwt(jwt) {
    const email = jwtProvider.getEmailFromJwt(jwt);

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error(`User does not exists with email ${email}`);
    }
    return user;
  }

  async findUserByEmail(email) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error(`User does not exists with email ${email}`);
    }
    return user;
  }
}

export default new UserService();
