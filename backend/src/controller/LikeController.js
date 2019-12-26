const User = require("../models/User");
const Likes = require("../models/Likes");

module.exports = {
  async index(req, res) {
    const { token } = req.headers;
    if (!token)
      return res.status(400).json({
        error: "Token id required"
      });

    const userLikes = await Likes.findOne({ token }).catch(err =>
      console.error(err)
    );
    if (!userLikes)
      return res.status(400).json({
        error: "User not found"
      });
    return res.json(userLikes.likes);
  },
  async store(req, res) {
    const { long, lat, cityId, name } = req.body;
    if (!long || !lat || !cityId || !name) {
      return res.status(400).json({
        error: "Params id required"
      });
    }

    const { token } = req.headers;
    if (!token)
      return res.status(400).json({
        error: "Token id required"
      });

    const targetUser = await User.findOne({
      token
    }).catch(err => console.error(err));

    if (!targetUser) {
      return res.status(400).json({
        error: "User not exists"
      });
    }

    const targetLikes = await Likes.findOne({
      user: targetUser._id
    }).catch(err => console.error(err));

    if (targetLikes) {
      const cityExists = targetLikes.likes.find(
        t => t.cityId === parseInt(cityId)
      );

      if (cityExists) {
        return res.status(400).json({ error: "City already registered" });
      }

      const like = {
        long,
        lat,
        cityId,
        name
      };

      targetLikes.likes.push(like);

      await targetLikes.save();
      return res.json(targetLikes.likes);
    }

    const like = {
      likes: {
        long,
        lat,
        cityId,
        name
      },
      user: targetUser._id,
      token
    };

    const result = await Likes.create(like);
    return res.json(result.likes);
  }
};
