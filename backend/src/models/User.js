const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  token: String
});

UserSchema.pre("save", function(next) {
  if (this.password) {
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
  }
  next();
});
module.exports = model("User", UserSchema);
