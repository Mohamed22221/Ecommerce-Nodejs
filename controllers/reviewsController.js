import asyncWrapper from "../middlewares/asyncWrapper.js";
import Brand from "../model/Brand.js";
import Product from "../model/Product.js";
import Review from "../model/Review.js";

import sendError from "../utils/classError.js";
import { ERROR, FAIL, SUCCESS } from "../utils/httpStatus.js";

export const createReviews = asyncWrapper(async (req, res, next) => {
  const { message, rating } = req.body;
  const { productID } = req.params;
  //check exist user
  const foundProduct = await Product.findById(productID).populate("reviews");
  if (!foundProduct) {
    const error = sendError.create(404, ERROR, "Product not found");
    return next(error);
  }
  //check if user already reviewed this product
  const checkUserRev = foundProduct.reviews.find((review) => {
    return review.userID.toString() === req.currentUser?._id.toString();
  });
  if (checkUserRev) {
    const error = sendError.create(
      404,
      ERROR,
      "you have already reviewed this product"
    );
    return next(error);
  }

  const review = await Review.create({
    message,
    rating,
    product: foundProduct?._id,
    userID: req.currentUser?._id,
  });
  foundProduct.reviews.push(review?._id);
  await foundProduct.save();
  res.status(201).json({
    status: SUCCESS,
    message: `Review created successfully in ${foundProduct?.name} `,
    data: review,
  });
});
