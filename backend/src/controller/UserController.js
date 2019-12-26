const User = require("../models/User");

module.exports = {
  async store(req, res) {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Field are required" });

    const emailExists = await User.findOne({ email });
    if (emailExists)
      return res.status(400).json({ email: "Email already exists" });

    const user = await User.create({
      email,
      password
    });

    const newUser = {
      id: user._id,
      email: user.email
    };
    return res.json(newUser);
  }
};
