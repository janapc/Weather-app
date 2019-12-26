const mongoose = require("mongoose");

const LikesSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  likes: Array,
  token: String
});

module.exports = mongoose.model("Likes", LikesSchema);
