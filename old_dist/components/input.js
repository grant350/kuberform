"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function Input(props) {
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "input"
  }, /*#__PURE__*/_react["default"].createElement("input", {
    onChange: function onChange(e) {
      props.VALIDATE(e.target.value);
    }
  }), /*#__PURE__*/_react["default"].createElement("span", null, "status:", props.state.status));
}

;
var _default = Input;
exports["default"] = _default;