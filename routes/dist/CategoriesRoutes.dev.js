"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _verifyToken = _interopRequireDefault(require("../utils/verifyToken.js"));

var _categoriesController = require("../controllers/categoriesController.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var categoriesRoutes = _express["default"].Router();

categoriesRoutes.route("/").post(_verifyToken["default"], _categoriesController.createCategory);
var _default = categoriesRoutes;
exports["default"] = _default;