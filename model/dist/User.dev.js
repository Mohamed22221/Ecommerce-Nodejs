"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var userSchema = new Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  orders: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Order"
  }],
  wishLists: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "WishLists"
  }],
  isAdmin: {
    type: Boolean,
    "default": false
  },
  hasShippingAddress: {
    type: Boolean,
    "default": false
  },
  shippingAddress: {
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    address: {
      type: String
    },
    postalCode: {
      type: String
    },
    province: {
      type: String
    },
    country: {
      type: String
    },
    phone: {
      type: String
    }
  }
}, {
  timestamps: true
}); //compile the schema to model

var User = _mongoose["default"].model("User", userSchema);

var _default = User;
exports["default"] = _default;