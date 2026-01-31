/** @format */

class UserController {
  getUserProfileByJwt = async (req, res) => {
    try {
      const user = req.user;
      return res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}

export default new UserController();
