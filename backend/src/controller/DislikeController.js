const Likes = require("../models/Likes");

module.exports = {
  async store(req, res) {
    const { cityId } = req.params;
    if (!cityId) {
      return res.status(400).json({ error: "Params id required" });
    }

    const { token } = req.headers;
    if (!token) return res.status(400).json({ error: "Token id required" });

    const targetUser = await Likes.findOne({ token });

    if (!targetUser) {
      return res.status(400).json({ error: "User not exists" });
    }

    const cityExists = targetUser.likes.find(t => t.cityId === parseInt(cityId));
    if (!cityExists) {
      return res.status(400).json({ error: "City is not exists" });
    }

    const index = targetUser.likes.indexOf(cityExists);
    if (index > -1) targetUser.likes.splice(index, 1);
    await targetUser.save();
    return res.json(targetUser.likes);
  }
};
