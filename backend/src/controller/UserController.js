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

  updateUserProfile = async (req, res) => {
    try {
      const user = req.user;
      const { fullName, email, mobile } = req.body;

      if (!fullName && !email && !mobile) {
        return res.status(400).json({
          message: "At least one field is required to update",
        });
      }

      if (fullName) user.fullName = fullName;
      if (email) user.email = email;
      if (mobile) user.mobile = mobile;

      await user.save();

      return res.status(200).json({
        message: "Profile updated successfully",
        user,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({
        message: error.message || "An error occurred while updating profile",
      });
    }
  };
}

export default new UserController();
