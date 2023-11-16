import mongoose from "mongoose";
const { Schema } = mongoose;
const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      ref: "Category",
    },
    sizes: {
      type: [String],
      required: true,
      enum: ["S", "M", "L", "XL", "XXL"],
    },
    colors: {
      type: [String],
      required: true,
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    images: [
      {
        type: String,
        default: "https://placehold.co/400",
      },
    ],
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    totalQty: {
      type: Number,
      required: true,
    },
    totalSold: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON : {virtuals : true}
  }
);

//compile the schema to model
const User = mongoose.model("Product", productSchema);
export default User;
