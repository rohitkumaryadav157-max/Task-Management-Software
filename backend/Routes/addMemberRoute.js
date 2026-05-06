const express = require("express");
const router = express.Router();
const Member = require("../Modules/addMemberModule");

// ================= ADD MEMBER =================
router.post("/", async (req, res) => {
  try {
    const { name, email, role } = req.body;

    // 🔴 check empty fields
    if (!name || !email || !role) {
      return res.json({ msg: "all fields required" });
    }

    // 🔴 check duplicate email
    const existing = await Member.findOne({ email });

    if (existing) {
      return res.json({ msg: "exist" });
    }

    // ✅ create member
    const newMember = await Member.create({
      name,
      email,
      role
    });

    res.json({ msg: "success", member: newMember });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "error" });
  }
});


// ================= GET MEMBERS =================
router.get("/", async (req, res) => {
  try {
    const members = await Member.find();

    res.json({ msg: "success", members });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "error" });
  }
});

module.exports = router;