import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "User already exist" });
    }
    const hashpassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashpassword,
    });
    res.json({ message: "User created successfully", user });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Email or password not correct" });
    }
    const hassPassword = await bcrypt.compare(password, user.password);
    if (!hassPassword) {
      return res.status(401).json({ message: "Email or password not correct" });
    }
    const payload = { userId: user._id };
    const secret = process.env.JWT_SECRET;
    const options = { expiresIn: "1h" };
    const token = jwt.sign(payload, secret, options);
    res.status(200).json({
      message: "Login successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        user: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};
