"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    ref: "Category"
  },
  sizes: {
    type: [String],
    required: true,
    "enum": ["S", "M", "L", "XL", "XXL"]
  },
  colors: {
    type: [String],
    required: true
  },
  userID: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  images: [{
    type: String,
    "default": "https://placehold.co/400"
  }],
  reviews: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Review"
  }],
  price: {
    type: Number,
    required: true
  },
  totalQty: {
    type: Number,
    required: true
  },
  totalSold: {
    type: Number,
    required: true,
    "default": 0
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
}); //compile the schema to model

var Product = _mongoose["default"].model("Product", productSchema);

var _default = Product;
exports["default"] = _default;