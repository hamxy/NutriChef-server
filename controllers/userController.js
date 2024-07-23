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
        .json({ authenticated: false, error: "User not found" });
    }
    res.status(200).json({ authenticated: true, user });
  } catch (error) {
    res
      .status(500)
      .json({ authenticated: false, error: "Failed to fetch profile data" });
  }
};
module.exports.user_put = async (req, res) => {
  try {
    // Extract user ID from the verified token
    const userId = req.userId;

    // Extract updated user data from the request body
    const updatedData = req.body;

    // Find the user by their ID and update their data
    const user = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res
        .status(404)
        .json({ authenticated: false, error: "User not found" });
    }

    // Return the updated user data
    res.status(200).json({ authenticated: true, user });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ authenticated: false, error: "Failed to update profile data" });
  }
};
