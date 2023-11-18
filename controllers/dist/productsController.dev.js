"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteProduct = exports.updateProduct = exports.getProduct = exports.createProduct = exports.getAllProducts = void 0;

var _asyncWrapper = _interopRequireDefault(require("../middlewares/asyncWrapper.js"));

var _Product = _interopRequireDefault(require("../model/Product.js"));

var _classError = _interopRequireDefault(require("../utils/classError.js"));

var _httpStatus = require("../utils/httpStatus.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//@desc Controll get products
//@route Get api/v1/products
//@access Public/users
var getAllProducts = (0, _asyncWrapper["default"])(function _callee(req, res) {
  var query, limit, page, startIndex, endIndex, total, productQuiry, results, rangePrice, products;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          //handel pagination
          query = req.query;
          limit = parseInt(query.limit) || 6;
          page = parseInt(query.page) || 1;
          startIndex = (page - 1) * limit;
          endIndex = page * limit;
          _context.next = 7;
          return regeneratorRuntime.awrap(_Product["default"].countDocuments());

        case 7:
          total = _context.sent;
          productQuiry = _Product["default"].find({}, {
            __v: false
          }).limit(limit).skip(startIndex); //pagination results

          results = {};

          if (endIndex < total) {
            results.next = {
              page: page + 1,
              limit: limit
            };
          }

          if (startIndex > 0) {
            results.previous = {
              page: page - 1,
              limit: limit
            };
          } //filter by name


          if (query.name) {
            productQuiry = productQuiry.find({
              name: {
                $regex: query.name,
                $options: "i"
              }
            });
          } //filter by brand


          if (query.brand) {
            productQuiry = productQuiry.find({
              brand: {
                $regex: query.brand,
                $options: "i"
              }
            });
          } //filter by category


          if (query.category) {
            productQuiry = productQuiry.find({
              category: {
                $regex: query.category,
                $options: "i"
              }
            });
          } //filter by sizes


          if (query.size) {
            productQuiry = productQuiry.find({
              sizes: {
                $regex: query.size,
                $options: "i"
              }
            });
          } //filter by color


          if (query.color) {
            productQuiry = productQuiry.find({
              colors: {
                $regex: query.color,
                $options: "i"
              }
            });
          } //filter by price


          if (query.price) {
            rangePrice = query.price.split("-");
            productQuiry = productQuiry.find({
              price: {
                $gte: rangePrice[0],
                $lte: rangePrice[1]
              }
            });
          } //return products


          _context.next = 20;
          return regeneratorRuntime.awrap(productQuiry);

        case 20:
          products = _context.sent;
          res.json({
            status: _httpStatus.SUCCESS,
            message: "Get products successfully",
            total: total,
            results: products.length,
            pagination: results,
            data: {
              products: products
            }
          });

        case 22:
        case "end":
          return _context.stop();
      }
    }
  });
}); //@desc Controll create product
//@route Post api/v1/products
//@access Private/admin

exports.getAllProducts = getAllProducts;
var createProduct = (0, _asyncWrapper["default"])(function _callee2(req, res, next) {
  var _req$body, name, description, brand, category, sizes, colors, user, price, totalQty, exist, error, product;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, name = _req$body.name, description = _req$body.description, brand = _req$body.brand, category = _req$body.category, sizes = _req$body.sizes, colors = _req$body.colors, user = _req$body.user, price = _req$body.price, totalQty = _req$body.totalQty; //check exist user

          _context2.next = 3;
          return regeneratorRuntime.awrap(_Product["default"].findOne({
            name: name
          }));

        case 3:
          exist = _context2.sent;

          if (!exist) {
            _context2.next = 7;
            break;
          }

          error = _classError["default"].create(400, _httpStatus.ERROR, "Product already exist");
          return _context2.abrupt("return", next(error));

        case 7:
          _context2.next = 9;
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
          product = _context2.sent;
          res.status(201).json({
            status: _httpStatus.SUCCESS,
            message: "Product created successfully",
            data: {
              product: product
            }
          });

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  });
}); //@desc Controll get product
//@route Get api/v1/products/:id
//@access Public/users

exports.createProduct = createProduct;
var getProduct = (0, _asyncWrapper["default"])(function _callee3(req, res, next) {
  var dynamicId, product, error;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          dynamicId = req.params.id;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_Product["default"].findById(dynamicId));

        case 3:
          product = _context3.sent;

          if (product) {
            _context3.next = 7;
            break;
          }

          error = _classError["default"].create(404, _httpStatus.FAIL, "Product not found ");
          return _context3.abrupt("return", next(error));

        case 7:
          res.json({
            status: _httpStatus.SUCCESS,
            message: "Product found successfully",
            data: {
              product: product
            }
          });

        case 8:
        case "end":
          return _context3.stop();
      }
    }
  });
}); //@desc Controll update product
//@route Put api/v1/products/:id
//@access Private/users

exports.getProduct = getProduct;
var updateProduct = (0, _asyncWrapper["default"])(function _callee4(req, res, next) {
  var dynamicId, product, error;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          dynamicId = req.params.id;
          _context4.next = 3;
          return regeneratorRuntime.awrap(_Product["default"].findByIdAndUpdate(dynamicId, _objectSpread({}, req.body), {
            "new": true
          }));

        case 3:
          product = _context4.sent;

          if (product) {
            _context4.next = 7;
            break;
          }

          error = _classError["default"].create(404, _httpStatus.FAIL, "Product not found ");
          return _context4.abrupt("return", next(error));

        case 7:
          res.json({
            status: _httpStatus.SUCCESS,
            message: "Product updated successfully",
            data: {
              product: product
            }
          });

        case 8:
        case "end":
          return _context4.stop();
      }
    }
  });
}); //@desc Controll update product
//@route Put api/v1/products/:id
//@access Private/users

exports.updateProduct = updateProduct;
var deleteProduct = (0, _asyncWrapper["default"])(function _callee5(req, res, next) {
  var dynamicId, product, error;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          dynamicId = req.params.id;
          _context5.next = 3;
          return regeneratorRuntime.awrap(_Product["default"].findByIdAndDelete(dynamicId));

        case 3:
          product = _context5.sent;

          if (product) {
            _context5.next = 7;
            break;
          }

          error = _classError["default"].create(404, _httpStatus.FAIL, "Product not found ");
          return _context5.abrupt("return", next(error));

        case 7:
          res.json({
            status: _httpStatus.SUCCESS,
            message: "Product deleted successfully"
          });

        case 8:
        case "end":
          return _context5.stop();
      }
    }
  });
});
exports.deleteProduct = deleteProduct;