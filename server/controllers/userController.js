import bcrypt from "bcrypt";
import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    // console.log(user);
    if (!user)
      return res.json({ msg: "Incorrect Username or Password", status: false });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    const userObject = user.toObject();
    delete userObject.password;
    const accessToken = jwt.sign(userObject, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    });
    // const options = {
    //   httpOnly: true,
    //   secure: true,
    // };
    return res.status(201).json({
      status: true,
      user: userObject,
      token: accessToken,
    });
    // .cookie("accessToken", accessToken, options);
  } catch (ex) {
    next(ex);
  }
};

export const register = async (req, res, next) => {
  try {
    // console.log(req.body);

    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    // console.log(usernameCheck);

    if (usernameCheck)
      return res.json({ msg: "Username already used", status: false });
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    const userObject = user.toObject();
    delete userObject.password;
    const accessToken = jwt.sign(userObject, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    });

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .json({
        status: true,
        user: userObject,
        token: accessToken,
      })
      .cookie("accessToken", accessToken, options)
      .status(201);
  } catch (ex) {
    next(ex);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "_id",
    ]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};

export const logOut = (req, res, next) => {
  try {
    if (!req.params.id) return res.json({ msg: "User id is required " });
    onlineUsers.delete(req.params.id);
    return res.status(200).send("Logged Out success");
  } catch (ex) {
    next(ex);
  }
};
