import asyncWrapper from "../middlewares/asyncWrapper.js";
import Category from "../model/Category.js";

import sendError from "../utils/classError.js";
import { ERROR, FAIL, SUCCESS } from "../utils/httpStatus.js";
import handelPagination from "../utils/pagination.js";

//@desc Controll get categories
//@route Get api/v1/categories
//@access Public/users

export const getAllCategories = asyncWrapper(async (req, res, next) => {
  //handel pagination
  const query = req.query;
  const total = await Category.countDocuments();
  const { limit, startIndex, results } = handelPagination(query, total);
  //check exist user
  const categories = await Category.find({}, { __v: false })
    .limit(limit)
    .skip(startIndex);

  res.status(201).json({
    status: SUCCESS,
    message: "Get categories successfully",
    total,
    results: categories.length,
    pagination: results,
    data: { categories },
  });
});

//@desc Controll create Category
//@route Post api/v1/categories
//@access Private/admin

export const createCategory = asyncWrapper(async (req, res, next) => {
  const { name } = req.body;
  //check exist user
  const existCategory = await Category.findOne({ name });
  if (existCategory) {
    const error = sendError.create(400, ERROR, "Category already exist");
    return next(error);
  }
  const category = await Category.create({
    name,
    userID: req.currentUser._id,
  });
  res.status(201).json({
    status: SUCCESS,
    message: "Category created successfully",
    data: { category },
  });
});

//@desc Controll get category
//@route Get api/v1/categories/:id
//@access Public/users

export const getCategory = asyncWrapper(async (req, res, next) => {
  const dynamicId = req.params.id;
  const category = await Category.findById(dynamicId);

  if (!category) {
    const error = sendError.create(404, FAIL, "Category not found ");
    return next(error);
  }
  res.json({
    status: SUCCESS,
    message: "Category found successfully",
    data: { category },
  });
});

//@desc Controll update category
//@route Put api/v1/categories/:id
//@access Private/users

export const updateCategory = asyncWrapper(async (req, res, next) => {
  const dynamicId = req.params.id;
  const category = await Category.findByIdAndUpdate(
    dynamicId,
    { ...req.body },
    { new: true }
  );
  if (!category) {
    const error = sendError.create(404, FAIL, "Category not found ");
    return next(error);
  }

  res.json({
    status: SUCCESS,
    message: "Category updated successfully",
    data: { category },
  });
});

//@desc Controll delete product
//@route Put api/v1/categories/:id
//@access Private/users

export const deleteCategory = asyncWrapper(async (req, res, next) => {
  const dynamicId = req.params.id;
  const category = await Category.findByIdAndDelete(dynamicId);
  if (!category) {
    const error = sendError.create(404, FAIL, "Category not found ");
    return next(error);
  }

  res.json({
    status: SUCCESS,
    message: "Category deleted successfully",
  });
});
