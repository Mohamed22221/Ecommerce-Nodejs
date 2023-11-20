"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createReviews = void 0;

var _asyncWrapper = _interopRequireDefault(require("../middlewares/asyncWrapper.js"));

var _Brand = _interopRequireDefault(require("../model/Brand.js"));

var _Product = _interopRequireDefault(require("../model/Product.js"));

var _classError = _interopRequireDefault(require("../utils/classError.js"));

var _httpStatus = require("../utils/httpStatus.js");

var _pagination = _interopRequireDefault(require("../utils/pagination.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var createReviews = (0, _asyncWrapper["default"])(function _callee(req, res, next) {
  var name, existBrand, error, brand;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          name = req.body.name; //check exist user

          _context.next = 3;
          return regeneratorRuntime.awrap(_Product["default"].findOne({
            name: name
          }));

        case 3:
          existBrand = _context.sent;

          if (!existBrand) {
            _context.next = 7;
            break;
          }

          error = _classError["default"].create(400, _httpStatus.ERROR, "Brand  already exist");
          return _context.abrupt("return", next(error));

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap(_Brand["default"].create({
            name: name.toLowerCase(),
            userID: req.currentUser._id
          }));

        case 9:
          brand = _context.sent;
          res.status(201).json({
            status: _httpStatus.SUCCESS,
            message: "Brand created successfully",
            data: brand
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.createReviews = createReviews;