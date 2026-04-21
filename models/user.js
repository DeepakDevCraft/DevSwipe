const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const USER = mongoose.model("USER", userSchema);

module.exports = USER;
