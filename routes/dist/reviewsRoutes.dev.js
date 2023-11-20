"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _verifyToken = _interopRequireDefault(require("../utils/verifyToken.js"));

var _reviewsController = require("../controllers/reviewsController.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var reviewsRoutes = _express["default"].Router();

reviewsRoutes.route("/:productID").post(_verifyToken["default"], _reviewsController.createReviews);
var _default = reviewsRoutes;
exports["default"] = _default;