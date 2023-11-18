"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var categorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    "default": "https://placehold.co/400",
    required: true
  },
  products: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Product"
  }],
  userID: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    required: true,
    ref: "User"
  }
}, {
  timestamps: true
}); //compile the schema to model

var Category = _mongoose["default"].model("Category", categorySchema);

var _default = Category;
exports["default"] = _default;