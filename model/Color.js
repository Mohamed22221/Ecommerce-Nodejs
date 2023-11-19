import mongoose from "mongoose";
const { Schema } = mongoose;
const colorSchema = new Schema(
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
const Color = mongoose.model("Color", colorSchema);
export default Color;
