import mongoose from "mongoose";
const { Schema } = mongoose;
const brandSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "https://placehold.co/400",
      required: true,
    },
    products: [
      {
        type: Object,
        ref: "Product",
        required: true,
      },
    ],
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

//compile the schema to model
const Brand = mongoose.model("Category", brandSchema);
export default Brand;
