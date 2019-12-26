const bcrypt = require("bcrypt");

const User = require("../models/User");

module.exports = {
  async index(req, res) {
    const { token } = req.headers;
    if (!token) return res.status(400).json({ message: "User is not fount" });

    const userExists = await User.findOne({ token });

    if (!userExists)
      return res.status(400).json({ message: "User not found!" });

    const user = {
      id: userExists._id,
      email: userExists.email,
      likes: userExists.likes,
      token: userExists.tolen
    };

    return res.json(user);
  },
  async store(req, res) {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Field are required" });

    const emailExists = await User.findOne({ email });

    if (!emailExists)
      return res.status(400).json({ email: "E-mail is not exists" });

    const result = bcrypt.compareSync(password, emailExists.password);
    if (!result) return res.status(400).json({ password: "Password incorrect" });

    const user = {
      id: emailExists._id,
      email: emailExists.email,
      likes: emailExists.likes,
      token: emailExists.token
    };
    return res.json(user);
  }
};
