"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCategory = void 0;

var _asyncWrapper = _interopRequireDefault(require("../middlewares/asyncWrapper.js"));

var _Category = _interopRequireDefault(require("../model/Category.js"));

var _classError = _interopRequireDefault(require("../utils/classError.js"));

var _httpStatus = require("../utils/httpStatus.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//@desc Controll create Category
//@route Post api/v1/categories
//@access Private/admin
var createCategory = (0, _asyncWrapper["default"])(function _callee(req, res, next) {
  var name, existCategory, error, category;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          name = req.body.name; //check exist user

          _context.next = 3;
          return regeneratorRuntime.awrap(_Category["default"].findOne({
            name: name
          }));

        case 3:
          existCategory = _context.sent;

          if (!existCategory) {
            _context.next = 7;
            break;
          }

          error = _classError["default"].create(400, _httpStatus.ERROR, "Category already exist");
          return _context.abrupt("return", next(error));

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap(_Category["default"].create({
            name: name,
            userID: req.currentUser._id
          }));

        case 9:
          category = _context.sent;
          res.status(201).json({
            status: _httpStatus.SUCCESS,
            message: "Category created successfully",
            data: {
              category: category
            }
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.createCategory = createCategory;