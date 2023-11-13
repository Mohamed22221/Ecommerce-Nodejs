import User from "../model/User.js";
import bcrypt from "bcrypt";

//@desc Controll user regester
//@route Post api/vi/users/regester
//@access Private/admin

export const regesterUser = async (req, res, next) => {
  const { fullName, email, password } = req.body;
  //check exist user
  const exist = await User.findOne({ email });
  if (exist) {
   return res.status(400).json({
      status: "error",
      message: "User already exist",
      data: null,
    });
  }

  //hash password using bcrypt
  const genSalt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, genSalt);
  //create new user
  const user = await User.create({ fullName, email, password: hashedPassword });
  res.status(201).json({
    status: "success",
    message: "User registerd successfully",
    data: user,
  });
};
