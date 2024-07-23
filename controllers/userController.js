const User = require("../models/User");

/**
 * User GET route handles retrieving user info from the db
 *
 *
 */

module.exports.user_get = async (req, res) => {
  try {
    const user = await User.findById(req.userId); // Fetch user data based on user ID
    if (!user) {
      return res
        .status(404)
        .json({ authenticated: true, error: "User not found" });
    }
    res.status(200).json({ authenticated: true, user });
  } catch (error) {
    res
      .status(500)
      .json({ authenticated: true, error: "Failed to fetch profile data" });
  }
};
