import asyncWrapper from "../middlewares/asyncWrapper.js";
import Brand from "../model/Brand.js";

import sendError from "../utils/classError.js";
import { ERROR, FAIL, SUCCESS } from "../utils/httpStatus.js";
import handelPagination from "../utils/pagination.js";

//@desc Controll get brands
//@route Get api/v1/brands
//@access Public/users

export const getAllBrands = asyncWrapper(async (req, res) => {
  //handel pagination
  const query = req.query;
  const total = await Brand.countDocuments();
  const { limit, startIndex, results } = handelPagination(query, total);
  //check exist user
  const brands = await Brand.find({}, { __v: false })
    .limit(limit)
    .skip(startIndex);

  res.status(201).json({
    status: SUCCESS,
    message: "Get brands successfully",
    total,
    results: brands.length,
    pagination: results,
    data: { brands },
  });
});

//@desc Controll create brand
//@route Post api/v1/brands
//@access Private/admin

export const createBrands = asyncWrapper(async (req, res, next) => {
  const { name } = req.body;
  //check exist user
  const existBrand = await Brand.findOne({ name });
  if (existBrand) {
    const error = sendError.create(400, ERROR, "Brand  already exist");
    return next(error);
  }
  const brand = await Brand.create({
    name: name.toLowerCase(),
    userID: req.currentUser._id,
  });
  res.status(201).json({
    status: SUCCESS,
    message: "Brand created successfully",
    data: { brand },
  });
});

//@desc Controll get brand
//@route Get api/v1/brands/:id
//@access Public/users

export const getBrand = asyncWrapper(async (req, res, next) => {
  const dynamicId = req.params.id;
  const brand = await Brand.findById(dynamicId);

  if (!brand) {
    const error = sendError.create(404, FAIL, "Brand not found ");
    return next(error);
  }
  res.json({
    status: SUCCESS,
    message: "Brand found successfully",
    data: { brand },
  });
});

//@desc Controll update brand
//@route Put api/v1/brands/:id
//@access Private/users

export const updateBrand = asyncWrapper(async (req, res, next) => {
  const dynamicId = req.params.id;
  const brand = await Brand.findByIdAndUpdate(
    dynamicId,
    { ...req.body },
    { new: true }
  );
  if (!brand) {
    const error = sendError.create(404, FAIL, "Brand not found ");
    return next(error);
  }

  res.json({
    status: SUCCESS,
    message: "Brand updated successfully",
    data: { brand },
  });
});

//@desc Controll delete brand
//@route Put api/v1/brands/:id
//@access Private/users

export const deleteBrand = asyncWrapper(async (req, res, next) => {
  const dynamicId = req.params.id;
  const brand = await Brand.findByIdAndDelete(dynamicId);
  if (!brand) {
    const error = sendError.create(404, FAIL, "Brand not found ");
    return next(error);
  }

  res.json({
    status: SUCCESS,
    message: "Brand deleted successfully",
  });
});
