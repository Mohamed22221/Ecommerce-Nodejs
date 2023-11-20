import mongoose from "mongoose";
const { Schema } = mongoose;
const reviewSchema = new Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Review must belong to a user"],
      ref: "User",
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Review must belong to a product"],
      ref: "Product",
    },
    message: {
      type: String,
      required: [true, "Please add a message"],
    },
    rating: {
      type: Number,
      required: [true, "Please add a rating between 1 and 5"],
      min: 1,
      max: 5,
    },
  },
  {
    timestamps: true,
  }
);

//compile the schema to model
const Review = mongoose.model("Review", reviewSchema);
export default Review;
