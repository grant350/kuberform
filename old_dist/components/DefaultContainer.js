"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function DefaultContainer(array, classname) {
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: classname
  }, array.map(function (x, index) {
    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, {
      key: index
    }, x);
  }));
}

var _default = DefaultContainer;
exports["default"] = _default;