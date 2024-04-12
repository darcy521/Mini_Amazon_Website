const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    mode: { type: String, enum: ["seller", "customer"], required: true },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("userinfos", userSchema);
module.exports = User;
