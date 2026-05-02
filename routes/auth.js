const express = require("express");
const authRoutes = express.Router();
const User = require("../models/user");

const bcrypt = require("bcrypt")
const saltRound = 10;

authRoutes.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  let hashPassword = '';

  try {
    // check if user exists
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    hashPassword = await bcrypt.hash(password,saltRound)

    // create user
    const user = new User({ firstName, lastName, email, password:hashPassword });

    await user.save(); // validation happens here

    console.log("hased password",user.password)

    // remove password from response
    const userObj = user.toObject();
    delete userObj.password;

    return res.status(201).json({
      message: "User created successfully",
      data: userObj,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: error.message,
    });
  }
});

module.exports = authRoutes;