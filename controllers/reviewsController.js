import asyncWrapper from "../middlewares/asyncWrapper.js";
import Brand from "../model/Brand.js";
import Product from "../model/Product.js";
import Review from "../model/Review.js";

import sendError from "../utils/classError.js";
import { ERROR, FAIL, SUCCESS } from "../utils/httpStatus.js";
import handelPagination from "../utils/pagination.js";


export const createReviews = asyncWrapper(async (req, res, next) => {
  const { message , rating } = req.body;
  const {productID} = req.params
  //check exist user
  const foundProduct = await Product.findById(productID);
  if (!foundProduct) {
    const error = sendError.create(404, ERROR, "Product not found");
    return next(error);
  }
  const review = await Review.create({
    message,
    rating,
    product: foundProduct?._id,
    userID: req.currentUser?._id
  });
  foundProduct.reviews.push(review?._id)
  await foundProduct.save()
  res.status(201).json({
    status: SUCCESS,
    message: `Review created successfully in ${foundProduct?.name} `,
    data:  review ,
  });
});

