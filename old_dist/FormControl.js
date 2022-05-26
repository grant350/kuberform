"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _rxjs = require("rxjs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

// React.
var FormControl = /*#__PURE__*/function (_React$Component) {
  _inherits(FormControl, _React$Component);

  var _super = _createSuper(FormControl);

  function FormControl(props) {
    var _this;

    _classCallCheck(this, FormControl);

    _this = _super.call(this, props);
    _this.name = _this.props.name;
    _this.type = "formControl";
    _this.validator = _this.props.validator !== undefined ? _this.props.validator : null;
    _this.html = _this.props.html;
    _this.state = {
      value: _this.props.value !== undefined && _this.props.value !== null ? _this.props.value : null,
      status: 'VALID',
      errors: []
    };
    _this.VALIDATE = _this.VALIDATE.bind(_assertThisInitialized(_this));
    _this.statusChanges = _this.statusChanges.bind(_assertThisInitialized(_this));
    _this.valueChanges = _this.valueChanges.bind(_assertThisInitialized(_this));
    _this.componentDidMount = _this.componentDidMount.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(FormControl, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      console.log('MOUNTED');
      this.VALIDATE(this.state.value);
    }
  }, {
    key: "getBorder",
    value: function getBorder() {
      var status = this.state.status;

      switch (status) {
        case 'VALID':
          return {
            borderLeft: "10px solid green"
          };
          break;

        case 'PENDING':
          return {
            borderLeft: "10px solid blue"
          };
          break;

        default:
          return {
            borderLeft: "10px solid red"
          };
      }
    }
  }, {
    key: "valueChanges",
    value: function valueChanges() {
      var _this2 = this;

      var ob = _rxjs.Observable.create(function (obs) {
        obs.next(_this2.state.value);
      });

      return ob;
    }
  }, {
    key: "statusChanges",
    value: function statusChanges() {
      var _this3 = this;

      var ob = _rxjs.Observable.create(function (obs) {
        obs.next(_this3.state.status);
      });

      return ob;
    }
  }, {
    key: "VALIDATE",
    value: function VALIDATE(value, cb) {
      var _this4 = this;

      console.log('validate called');

      var subscription = _rxjs.Observable.create(function (obs) {
        obs.next(null);

        if (_this4.validator !== null) {
          _this4.validator(value, obs);
        }
      }).subscribe(function (res) {
        switch (res) {
          case null:
            _this4.setState({
              status: 'PENDING',
              value: value
            });

            if (cb) {
              cb('PENDING', value);
            }

            break;

          case false:
            _this4.setState({
              status: 'INVALID',
              value: value
            });

            if (cb) {
              cb('INVALID', value);
            }

            break;

          default:
            _this4.setState({
              status: 'VALID',
              value: value
            });

            if (cb) {
              cb('VALID', value);
            }

        }
      });

      setTimeout(function () {
        subscription.unsubscribe();
      }, 5000);
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "formControl"
      }, /*#__PURE__*/_react["default"].createElement(this.html, {
        state: this.state,
        VALIDATE: this.VALIDATE
      }));
    }
  }]);

  return FormControl;
}(_react["default"].Component);

var _default = FormControl;
exports["default"] = _default;