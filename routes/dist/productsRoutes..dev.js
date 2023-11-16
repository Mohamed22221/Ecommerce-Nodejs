"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _verifyToken = _interopRequireDefault(require("../utils/verifyToken.js"));

var _productsController = require("../controllers/productsController.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var productsRoutes = _express["default"].Router();

productsRoutes.route("/").get(_productsController.getAllProducts).post(_verifyToken["default"], _productsController.createProduct);
var _default = productsRoutes;
exports["default"] = _default;