"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _dbConnect = _interopRequireDefault(require("../config/dbConnect.js"));

var _httpStatus = require("../utils/httpStatus.js");

var _usersRoutes = _interopRequireDefault(require("../routes/usersRoutes.js"));

var _productsRoutes = _interopRequireDefault(require("../routes/productsRoutes..js"));

var _CategoriesRoutes = _interopRequireDefault(require("../routes/CategoriesRoutes.js"));

var _brandsRoutes = _interopRequireDefault(require("../routes/brandsRoutes.js"));

var _colorsRoutes = _interopRequireDefault(require("../routes/colorsRoutes.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//import express routes
// setup local env
_dotenv["default"].config(); //db connect


(0, _dbConnect["default"])();
var app = (0, _express["default"])();
app.use(_express["default"].json()); //express routes

app.use("/api/v1/users/", _usersRoutes["default"]);
app.use("/api/v1/products/", _productsRoutes["default"]);
app.use("/api/v1/categories/", _CategoriesRoutes["default"]);
app.use("/api/v1/brands/", _brandsRoutes["default"]);
app.use("/api/v1/colors/", _colorsRoutes["default"]); // global middleware for handel error

app.use(function (error, req, res, next) {
  res.status(error.statusCode || 400).json({
    status: error.status || _httpStatus.ERROR,
    message: error.message,
    data: null
  });
}); // global middleware for not found routes

app.all("*", function (req, res) {
  res.status(404).json({
    status: _httpStatus.ERROR,
    message: "Not Found Resource"
  });
});
var _default = app;
exports["default"] = _default;