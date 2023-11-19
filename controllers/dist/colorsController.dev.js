"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteColor = exports.updateColor = exports.getColor = exports.createColor = exports.getAllColors = void 0;

var _asyncWrapper = _interopRequireDefault(require("../middlewares/asyncWrapper.js"));

var _Color = _interopRequireDefault(require("../model/Color.js"));

var _classError = _interopRequireDefault(require("../utils/classError.js"));

var _httpStatus = require("../utils/httpStatus.js");

var _pagination = _interopRequireDefault(require("../utils/pagination.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//@desc Controll get Colors
//@route Get api/v1/Colors
//@access Public/users
var getAllColors = (0, _asyncWrapper["default"])(function _callee(req, res) {
  var query, total, _handelPagination, limit, startIndex, results, colors;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          //handel pagination
          query = req.query;
          _context.next = 3;
          return regeneratorRuntime.awrap(_Color["default"].countDocuments());

        case 3:
          total = _context.sent;
          _handelPagination = (0, _pagination["default"])(query, total), limit = _handelPagination.limit, startIndex = _handelPagination.startIndex, results = _handelPagination.results; //check exist color

          _context.next = 7;
          return regeneratorRuntime.awrap(_Color["default"].find({}, {
            __v: false
          }).limit(limit).skip(startIndex));

        case 7:
          colors = _context.sent;
          res.status(201).json({
            status: _httpStatus.SUCCESS,
            message: "Get colors successfully",
            total: total,
            results: colors.length,
            pagination: results,
            data: colors
          });

        case 9:
        case "end":
          return _context.stop();
      }
    }
  });
}); //@desc Controll create color
//@route Post api/v1/colors
//@access Private/admin

exports.getAllColors = getAllColors;
var createColor = (0, _asyncWrapper["default"])(function _callee2(req, res, next) {
  var name, existColor, error, color;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          name = req.body.name; //check exist color

          _context2.next = 3;
          return regeneratorRuntime.awrap(_Color["default"].findOne({
            name: name
          }));

        case 3:
          existColor = _context2.sent;

          if (!existColor) {
            _context2.next = 7;
            break;
          }

          error = _classError["default"].create(400, _httpStatus.ERROR, "Color already exist");
          return _context2.abrupt("return", next(error));

        case 7:
          _context2.next = 9;
          return regeneratorRuntime.awrap(_Color["default"].create({
            name: name.toLowerCase(),
            userID: req.currentUser._id
          }));

        case 9:
          color = _context2.sent;
          res.status(201).json({
            status: _httpStatus.SUCCESS,
            message: "Color created successfully",
            data: color
          });

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  });
}); //@desc Controll get color
//@route Get api/v1/colors/:id
//@access Public/users

exports.createColor = createColor;
var getColor = (0, _asyncWrapper["default"])(function _callee3(req, res, next) {
  var dynamicId, color, error;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          dynamicId = req.params.id;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_Color["default"].findById(dynamicId));

        case 3:
          color = _context3.sent;

          if (color) {
            _context3.next = 7;
            break;
          }

          error = _classError["default"].create(404, _httpStatus.FAIL, "Color not found ");
          return _context3.abrupt("return", next(error));

        case 7:
          res.json({
            status: _httpStatus.SUCCESS,
            message: "Color found successfully",
            data: color
          });

        case 8:
        case "end":
          return _context3.stop();
      }
    }
  });
}); //@desc Controll update color
//@route Put api/v1/colors/:id
//@access Private/users

exports.getColor = getColor;
var updateColor = (0, _asyncWrapper["default"])(function _callee4(req, res, next) {
  var dynamicId, color, error;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          dynamicId = req.params.id;
          _context4.next = 3;
          return regeneratorRuntime.awrap(_Color["default"].findByIdAndUpdate(dynamicId, _objectSpread({}, req.body), {
            "new": true
          }));

        case 3:
          color = _context4.sent;

          if (color) {
            _context4.next = 7;
            break;
          }

          error = _classError["default"].create(404, _httpStatus.FAIL, "Color not found ");
          return _context4.abrupt("return", next(error));

        case 7:
          res.json({
            status: _httpStatus.SUCCESS,
            message: "Color updated successfully",
            data: {
              color: color
            }
          });

        case 8:
        case "end":
          return _context4.stop();
      }
    }
  });
}); //@desc Controll delete color
//@route Put api/v1/colors/:id
//@access Private/users

exports.updateColor = updateColor;
var deleteColor = (0, _asyncWrapper["default"])(function _callee5(req, res, next) {
  var dynamicId, color, error;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          dynamicId = req.params.id;
          _context5.next = 3;
          return regeneratorRuntime.awrap(_Color["default"].findByIdAndDelete(dynamicId));

        case 3:
          color = _context5.sent;

          if (color) {
            _context5.next = 7;
            break;
          }

          error = _classError["default"].create(404, _httpStatus.FAIL, "Color not found ");
          return _context5.abrupt("return", next(error));

        case 7:
          res.json({
            status: _httpStatus.SUCCESS,
            message: "Color deleted successfully"
          });

        case 8:
        case "end":
          return _context5.stop();
      }
    }
  });
});
exports.deleteColor = deleteColor;