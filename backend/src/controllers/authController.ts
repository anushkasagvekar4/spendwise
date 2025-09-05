import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserSchema from "../model/userModel";
import { Request, Response } from "express";
import { AuthRequest } from "../middleware/Auth";

export const signup = async (req: Request, res: Response): Promise<void> => {
  const { email, password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    res.status(400).json({ success: false, message: "Passwords do not match" });
    return;
  }

  try {
    const existUser = await UserSchema.findOne({ email });
    if (existUser) {
      res.status(400).json({ message: "User Exists!" });
      return;
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await UserSchema.create({
      email,
      password: hashPassword,
    });

    res.status(201).json({
      success: true,
      message: "Signup successful!",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message || error,
    });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    const user = await UserSchema.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      expires: new Date(Date.now() + 3600000),
      secure: false,
      sameSite: "lax",
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "login successful!",
      user,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message || error,
    });
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      sameSite: "lax",
      expires: new Date(0),
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({ message: "Server error while logging out" });
  }
};
