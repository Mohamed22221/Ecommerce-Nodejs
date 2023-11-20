"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var reviewSchema = new Schema({
  userID: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    required: [true, "Review must belong to a user"],
    ref: "User"
  },
  product: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    required: [true, "Review must belong to a product"],
    ref: "Product"
  },
  message: {
    type: String,
    required: [true, "Please add a message"]
  },
  rating: {
    type: Number,
    required: [true, "Please add a rating between 1 and 5"],
    min: 1,
    max: 5
  }
}, {
  timestamps: true
}); //compile the schema to model

var Review = _mongoose["default"].model("Review", reviewSchema);

var _default = Review;
exports["default"] = _default;