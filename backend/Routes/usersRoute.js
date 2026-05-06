const express = require("express");
const router = express.Router();
const User = require("../Modules/usersModal");

// ================= ADD USER (ADMIN) =================
router.post("/", async (req, res) => {
  try {
    const { name, email, password, role, job } = req.body;

    // 🔴 validation
    if (!name || !email || !password) {
      return res.json({ msg: "all fields required" });
    }

    // 🔴 check duplicate email
    const exist = await User.findOne({ email });
    if (exist) return res.json({ msg: "exist" });

    // ✅ enforce system role (admin/member)
    const newUser = await User.create({
      name,
      email,
      password,
      role: role || "member",  // default member
      job: job            // optional job (Frontend, Backend...)
    });

    res.json({ msg: "success", user: newUser });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "error" });
  }
});


// ================= LOGIN =================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

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
    console.log(err);
    res.status(500).json({ msg: "error" });
  }
});


// ================= GET USERS (FOR DROPDOWN) =================
router.get("/", async (req, res) => {
  try {
    // 🔥 IMPORTANT: return only members
    const users = await User.find({ role: "member" });

    res.json({ msg: "success", users });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "error" });
  }
});

module.exports = router;