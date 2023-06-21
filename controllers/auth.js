import User from "../models/user.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import * as dotenv from "dotenv";
dotenv.config();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {

    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});
export const postSignUp = async (req, res, next) => {
  const { email, name, password } = req.body;
  const existingUser = await User.findOne({ where: { email: email } });
  if (existingUser) {
    next();
    return;
  }
  console.log(name);
  const hashedPassword = bcrypt.hashSync(password);
  const user = await User.create({
    email: email,
    name: name,
    password: hashedPassword,
  });
  const info = await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: "Hello from azil comunity", 
    text: "You have successfully signed up for our website", 
    html: "You have successfully signed up for our website",
  });
  res.status(200).json(user);
};

export const postLoginIn = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email: email } });
  if (!user) {
    return res.status(400).json("wrong email");
  }
  const isCorrect = bcrypt.compareSync(password, user.password);
  if (!isCorrect) {
    return res.status(400).json("wrong password");
  }
  req.session.isLoggedIn = true;
  req.session.user = user;
  req.session.save();
  res.status(200).json("loged in");
};

export const postLogout = async (req, res, next) => {
  await req.session.destroy((err) => {
    console.log(err);
  });
  res.status(200).json("Logout");
};
