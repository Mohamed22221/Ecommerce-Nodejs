import mongoose from "mongoose";
import generateNumOrder from "../utils/generateNumOrder.js";
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: [
      {
        type: Object,
        required: true,
      },
    ],
    shippingAddress: {
      type: Object,
      required: true,
    },
    orderNumber: {
      type: String,
      default: generateNumOrder(),
    },
    //fot stripe payment
    paymentStatus: {
      type: String,
      default: "Not paid",
    },
    paymentMethod: {
      type: String,
      default: "Not specified",
    },
    currency: {
      type: String,
      default: "Not specified",
    },
    //fot controll admin
    status: {
      type: String,
      default: "pending",
      enun: ["pending", "processing", "shipped", "delivered"],
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

//compile the schema to model
const Order = mongoose.model("Order", orderSchema);
export default Order;
