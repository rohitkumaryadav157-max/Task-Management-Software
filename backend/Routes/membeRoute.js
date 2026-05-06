const express = require("express");
const router = express.Router();
const User = require("../Modules/usersModal");

// LOGIN API
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });

    if (!user) {
      return res.json({ msg: "invalid" });
    }

    res.json({
      msg: "success",
      role: user.role,
      user
    });

  } catch (err) {
    res.status(500).json({ msg: "server error" });
  }
});

module.exports = router;