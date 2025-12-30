import express from "express";

import jwt from "jsonwebtoken";
import usermodel from "../models/User.js";
import bcrypt from "bcrypt";

const authrouter = express.Router();
//defining route for user register
authrouter.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await usermodel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    usermodel.create({
      name,
      email,
      password: bcrypt.hashSync(password,10)
    });

    res.status(201).json({ message: "User registered successfully"});
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

//route for user login
authrouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user exists
    const user = await usermodel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare passwords
     const isMatch = bcrypt.compareSync(password, user.password);
     console.log(isMatch);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id },
      "secretkey",
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default authrouter;
