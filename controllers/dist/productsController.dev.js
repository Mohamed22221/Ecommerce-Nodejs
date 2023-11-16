"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createProduct = void 0;

var _asyncWrapper = _interopRequireDefault(require("../middlewares/asyncWrapper.js"));

var _Product = _interopRequireDefault(require("../model/Product.js"));

var _classError = _interopRequireDefault(require("../utils/classError.js"));

var _httpStatus = require("../utils/httpStatus.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//@desc Controll create product
//@route Post api/v1/regester
//@access Private/admin
var createProduct = (0, _asyncWrapper["default"])(function _callee(req, res, next) {
  var _req$body, name, description, brand, category, sizes, colors, user, price, totalQty, exist, error, product;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, name = _req$body.name, description = _req$body.description, brand = _req$body.brand, category = _req$body.category, sizes = _req$body.sizes, colors = _req$body.colors, user = _req$body.user, price = _req$body.price, totalQty = _req$body.totalQty; //check exist user

          _context.next = 3;
          return regeneratorRuntime.awrap(_Product["default"].findOne({
            name: name
          }));

        case 3:
          exist = _context.sent;

          if (!exist) {
            _context.next = 7;
            break;
          }

          error = _classError["default"].create(400, _httpStatus.ERROR, "Product already exist");
          return _context.abrupt("return", next(error));

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap(_Product["default"].create({
            name: name,
            description: description,
            brand: brand,
            category: category,
            sizes: sizes,
            colors: colors,
            userID: req.currentUser._id,
            price: price,
            totalQty: totalQty
          }));

        case 9:
          product = _context.sent;
          res.status(201).json({
            status: _httpStatus.SUCCESS,
            message: "Product created successfully",
            data: product
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.createProduct = createProduct;