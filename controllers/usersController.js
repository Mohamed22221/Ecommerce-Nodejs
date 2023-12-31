import asyncWrapper from "../middlewares/asyncWrapper.js";
import User from "../model/User.js";
import bcrypt from "bcrypt";
import sendError from "../utils/classError.js";
import { ERROR, FAIL, SUCCESS } from "../utils/httpStatus.js";
import generateToken from "../utils/generateJWT.js";
import verifyToken from "../utils/verifyToken.js";

//@desc Controll regester
//@route Post api/v1/users/regester
//@access Private/admin

export const regesterUser = asyncWrapper(async (req, res, next) => {
  const { fullName, email, password } = req.body;
  //check exist user
  const exist = await User.findOne({ email });
  if (exist) {
    const error = sendError.create(400, ERROR, "User already exist");
    return next(error);
  }

  //hash password using bcrypt
  const genSalt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, genSalt);
  //create new user
  const user = await User.create({ fullName, email, password: hashedPassword });
  res.status(201).json({
    status: SUCCESS,
    message: "User registerd successfully",
    data: user,
  });
});

//@desc Controll login
//@route Post api/v1/users/login
//@access Public

export const loginUser = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  //check found user
  const userFound = await User.findOne({ email });
  if (!userFound) {
    const error = sendError.create(400, ERROR, "Not found user");
    return next(error);
  }
  const matchedPassword = await bcrypt.compare(password, userFound?.password);
  if (userFound && matchedPassword === true) {
    const token = await generateToken({
      email: userFound.email,
      _id: userFound._id,
    });
    return res.status(200).json({
      status: "success",
      message: "User logged in successfully",
      data: { user: userFound, token },
    });
  } else {
    const error = sendError.create(400, ERROR, "Invalid login");
    return next(error);
  }
});

//@desc Controll profile
//@route get api/v1/users/profile
//@access Private
export const profileUser = asyncWrapper(async (req, res, next) => {
  const userId = await req.currentUser;
  //check found user
  const userFound = await User.findOne({
    email: userId.email,
    __id: userId.__id,
  });
  if (!userFound) {
    const error = sendError.create(400, ERROR, "Not found user ");
    return next(error);
  }
  res.status(200).json({
    status: SUCCESS,
    message: "Welcom profile page",
    data: userFound,
  });
});
