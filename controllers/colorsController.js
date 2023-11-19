import asyncWrapper from "../middlewares/asyncWrapper.js";
import Color from "../model/Color.js";

import sendError from "../utils/classError.js";
import { ERROR, FAIL, SUCCESS } from "../utils/httpStatus.js";
import handelPagination from "../utils/pagination.js";

//@desc Controll get Colors
//@route Get api/v1/Colors
//@access Public/users

export const getAllColors = asyncWrapper(async (req, res) => {
  //handel pagination
  const query = req.query;
  const total = await Color.countDocuments();
  const { limit, startIndex, results } = handelPagination(query, total);
  //check exist color
  const colors = await Color.find({}, { __v: false })
    .limit(limit)
    .skip(startIndex);

  res.status(201).json({
    status: SUCCESS,
    message: "Get colors successfully",
    total,
    results: colors.length,
    pagination: results,
    data:  colors ,
  });
});

//@desc Controll create color
//@route Post api/v1/colors
//@access Private/admin

export const createColor = asyncWrapper(async (req, res, next) => {
  const { name } = req.body;
  //check exist color
  const existColor = await Color.findOne({ name });
  if (existColor) {
    const error = sendError.create(400, ERROR, "Color already exist");
    return next(error);
  }
  const color = await Color.create({
    name: name.toLowerCase(),
    userID: req.currentUser._id,
  });
  res.status(201).json({
    status: SUCCESS,
    message: "Color created successfully",
    data:  color ,
  });
});

//@desc Controll get color
//@route Get api/v1/colors/:id
//@access Public/users

export const getColor= asyncWrapper(async (req, res, next) => {
  const dynamicId = req.params.id;
  const color = await Color.findById(dynamicId);

  if (!color) {
    const error = sendError.create(404, FAIL, "Color not found ");
    return next(error);
  }
  res.json({
    status: SUCCESS,
    message: "Color found successfully",
    data:  color ,
  });
});

//@desc Controll update color
//@route Put api/v1/colors/:id
//@access Private/users

export const updateColor = asyncWrapper(async (req, res, next) => {
  const dynamicId = req.params.id;
  const color = await Color.findByIdAndUpdate(
    dynamicId,
    { ...req.body },
    { new: true }
  );
  if (!color) {
    const error = sendError.create(404, FAIL, "Color not found ");
    return next(error);
  }

  res.json({
    status: SUCCESS,
    message: "Color updated successfully",
    data: { color },
  });
});

//@desc Controll delete color
//@route Put api/v1/colors/:id
//@access Private/users

export const deleteColor = asyncWrapper(async (req, res, next) => {
  const dynamicId = req.params.id;
  const color = await Color.findByIdAndDelete(dynamicId);
  if (!color) {
    const error = sendError.create(404, FAIL, "Color not found ");
    return next(error);
  }

  res.json({
    status: SUCCESS,
    message: "Color deleted successfully",
  });
});
