import User from "../models/user.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import * as dotenv from "dotenv";
import crypto from "crypto";
import jwt from "jsonwebtoken";
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
  const token = jwt.sign({ email: email }, "secret");
  console.log(name);
  const hashedPassword = bcrypt.hashSync(password);
  const user = await User.create({
    email: email,
    name: name,
    password: hashedPassword,
    confirmationCode: token,
  });

  const info = await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: "Hello from azil comunity",
    html: `
    <p>Click this <a href="http://localhost:3000/signup/${token}">link</a> to activate your account.</p>
  `,
  });
  res.status(200).json(user);
};

export const getSignup = async (req, res, next) => {
  const user = await User.findOne({
    confirmationCode: req.params.confirmationCode,
  });
  if (!user) {
    return;
  }
  await User.update(
    { status: "Active" },
    { where: { confirmationCode: req.params.confirmationCode } }
  );
  res.status(200).json("Activated account");
};

export const postLoginIn = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email: email } });
  if (!user) {
    return res.status(400).json("wrong email");
  }
  if (user.status === "Pending") {
    return res.status(400).json("Email not confirmed");
  }
  const isCorrect = bcrypt.compareSync(password, user.password);
  if (!isCorrect) {
    return res.status(400).json("wrong password");
  }
  const token = jwt.sign({ email: email, userId: user.id }, "secret", {
    expiresIn: "1h",
  });
  console.log(token);
  res.status(200).json({ token: token, userId: user.id.toString() });
};

export const resetPass = async (req, res, next) => {
  const { email } = req.body;
  let token;
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      const error = new Error("Validation failed, entered data is incorrect.");
      error.statusCode = 422;
      next(error);
      return;
    }
    token = buffer.toString("hex");
  });
  const user = await User.findOne({ where: { email: email } });
  if (!user) {
    return;
  }
  await User.update(
    {
      resetToken: token,
      resetTokenExpiration: Date.now() + 360000,
    },
    { where: { email: email } }
  );
  await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: "Reset password",
    html: `
    <p>You requested a password reset</p>
    <p>Click this <a href="http://localhost:3000/reset/${token}">link</a> to set a new password.</p>
  `,
  });
  res.status(200).json("Mail sent");
};

export const setPassword = async (req, res, next) => {
  const { password, userId, token } = req.body;
  User.findOne({
    resetToken: token,
    resetTokenExpiration: { $gt: Date.now() },
    _id: userId,
  })
    .then((user) => {
      resetUser = user;
      return bcrypt.hash(password, 12);
    })
    .then((hashedPassword) => {
      return User.update(
        {
          password: hashedPassword,
          resetToken: undefined,
          resetTokenExpiration: undefined,
        },
        { where: { _id: userId } }
      );
    })
    .then((result) => {
      res.status(200).json("Succesfuly changed password");
    })
    .catch((err) => {
      console.log(err);
    });
};
