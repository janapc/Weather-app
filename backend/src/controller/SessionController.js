require("dotenv/config");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = {
  async store(req, res) {
    const { userid } = req.headers;
    if (!userid) return res.status(400).json({ error: "User_id is required" });

    const token = jwt.sign({ id: userid }, process.env.SECRET, {});

    const users = await User.updateOne({ _id: userid }, { token }).catch(err =>
      console.error("error:", err)
    );

    if (!users) return res.status(400).json({ error: "User is not found" });

    return res.json({ token });
  }
};
