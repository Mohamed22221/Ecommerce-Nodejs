"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _verifyToken = _interopRequireDefault(require("../utils/verifyToken.js"));

var _colorsController = require("../controllers/colorsController.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var colorsRoutes = _express["default"].Router();

colorsRoutes.route("/").get(_colorsController.getAllColors).post(_verifyToken["default"], _colorsController.createColor);
colorsRoutes.route("/:id").get(_colorsController.getColor).put(_verifyToken["default"], _colorsController.updateColor)["delete"](_verifyToken["default"], _colorsController.deleteColor);
var _default = colorsRoutes;
exports["default"] = _default;