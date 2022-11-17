'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _classCallCheck = require('@babel/runtime/helpers/classCallCheck');
var _createClass = require('@babel/runtime/helpers/createClass');
var _assertThisInitialized = require('@babel/runtime/helpers/assertThisInitialized');
var _inherits = require('@babel/runtime/helpers/inherits');
var _possibleConstructorReturn = require('@babel/runtime/helpers/possibleConstructorReturn');
var _getPrototypeOf = require('@babel/runtime/helpers/getPrototypeOf');
var React = require('react');
var rxjs = require('rxjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _classCallCheck__default = /*#__PURE__*/_interopDefaultLegacy(_classCallCheck);
var _createClass__default = /*#__PURE__*/_interopDefaultLegacy(_createClass);
var _assertThisInitialized__default = /*#__PURE__*/_interopDefaultLegacy(_assertThisInitialized);
var _inherits__default = /*#__PURE__*/_interopDefaultLegacy(_inherits);
var _possibleConstructorReturn__default = /*#__PURE__*/_interopDefaultLegacy(_possibleConstructorReturn);
var _getPrototypeOf__default = /*#__PURE__*/_interopDefaultLegacy(_getPrototypeOf);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function _createSuper$2(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$2(); return function _createSuperInternal() { var Super = _getPrototypeOf__default["default"](Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf__default["default"](this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn__default["default"](this, result); }; }

function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var FormGroup = /*#__PURE__*/function (_React$Component) {
  _inherits__default["default"](FormGroup, _React$Component);

  var _super = _createSuper$2(FormGroup);

  function FormGroup(props) {
    var _this;

    _classCallCheck__default["default"](this, FormGroup);

    _this = _super.call(this, props);
    _this.state = {
      value: {},
      status: "VALID",
      statuses: {},
      ref: {}
    };
    _this.ref = {};
    _this.children = React__default["default"].Children.map(_this.props.children, function (child) {
      if (child.props.fieldName) {
        _this.ref[child.props.fieldName] = /*#__PURE__*/React__default["default"].createRef();
        return /*#__PURE__*/React__default["default"].cloneElement(child, {
          parent: _assertThisInitialized__default["default"](_this),
          status: _this.state.status,
          ref: _this.ref[child.props.fieldName]
        });
      } else if (child.props.groupName) {
        _this.ref[child.props.groupName] = /*#__PURE__*/React__default["default"].createRef();
        return /*#__PURE__*/React__default["default"].cloneElement(child, {
          ref: _this.ref[child.props.groupName],
          status: _this.state.status
        });
      }
    }); // console.log('children',this.children)

    return _this;
  }

  _createClass__default["default"](FormGroup, [{
    key: "getParent",
    value: function getParent() {
      return this;
    }
  }, {
    key: "getStatus",
    value: function getStatus() {
      return this.state.status;
    }
  }, {
    key: "getValue",
    value: function getValue() {
      return this.state.value;
    }
  }, {
    key: "getStatusString",
    value: function getStatusString(status) {
      switch (status) {
        case null:
          return "PENDING";

        case false:
          return "INVALID";

        default:
          return "VALID";
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var checkStatuses = function checkStatuses(status) {
        if (Object.values(_this2.state.statuses).includes(null)) {
          _this2.setState({
            status: _this2.getStatusString(null),
            statuses: _this2.state.statuses
          });
        } else if (Object.values(_this2.state.statuses).includes(false)) {
          _this2.setState({
            status: _this2.getStatusString(false),
            statuses: _this2.state.statuses
          });
        } else {
          _this2.setState({
            status: _this2.getStatusString(true),
            statuses: _this2.state.statuses
          });
        }

        console.log(_this2.state);
      };

      Object.keys(this.ref).forEach(function (key) {
        var child = _this2.ref[key];

        if (child.current !== null) {
          if (child.current.status$) {
            child.current.status$.subscribe(function (status) {
              _this2.state.statuses[key] = status;
              console.log('status', key, status);
              checkStatuses();
            });
          }

          if (child.current.value$) {
            child.current.value$.subscribe(function (val) {
              _this2.state.value[key] = val;

              _this2.setState({
                value: _this2.state.value
              }, function () {});
            });
          }
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React__default["default"].createElement("div", {
        className: "formGroup"
      }, this.props.container ? /*#__PURE__*/React__default["default"].createElement(this.props.container, null, this.children) : /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, this.children));
    }
  }]);

  return FormGroup;
}(React__default["default"].Component);

function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf__default["default"](Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf__default["default"](this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn__default["default"](this, result); }; }

function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

/*#__PURE__*/(function (_React$Component) {
  _inherits__default["default"](FormArray, _React$Component);

  var _super = _createSuper$1(FormArray);

  function FormArray(props) {
    _classCallCheck__default["default"](this, FormArray);

    return _super.call(this, props);
  }

  _createClass__default["default"](FormArray, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React__default["default"].createElement("div", {
        className: "formArray"
      }, this.props.children);
    }
  }]);

  return FormArray;
})(React__default["default"].Component);

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf__default["default"](Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf__default["default"](this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn__default["default"](this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var FormControl = /*#__PURE__*/function (_React$Component) {
  _inherits__default["default"](FormControl, _React$Component);

  var _super = _createSuper(FormControl);

  function FormControl(props) {
    var _this;

    _classCallCheck__default["default"](this, FormControl);

    _this = _super.call(this, props);
    _this.status$ = new rxjs.BehaviorSubject(null);
    _this.value$ = new rxjs.BehaviorSubject(_this.props.value ? _this.props.value : '');
    _this.update = _this.update.bind(_assertThisInitialized__default["default"](_this));
    _this.state = {
      status: "VALID"
    };
    _this.getStatusString = _this.getStatusString.bind(_assertThisInitialized__default["default"](_this)); // this.update(this.props.value? this.props.value: '')

    return _this;
  }

  _createClass__default["default"](FormControl, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.update(this.props.value ? this.props.value : '');
      this.status$.subscribe(function (status) {
        _this2.setState({
          status: _this2.getStatusString(status)
        });
      });
    }
  }, {
    key: "getStatusString",
    value: function getStatusString(status) {
      switch (status) {
        case null:
          return "PENDING";

        case false:
          return "INVALID";

        default:
          return "VALID";
      }
    }
  }, {
    key: "valueChanges",
    value: function valueChanges() {
      return this.value$;
    }
  }, {
    key: "statusChanges",
    value: function statusChanges() {
      return this.status$;
    }
  }, {
    key: "validate",
    value: function validate(value) {
      //if false set parent errors:{}
      console.log(this.props); // later take more than one validator

      if (this.props.validator) {
        this.status$.next(null);
        this.props.validator(value, this.status$);
      } else {
        this.status$.next(true);
      } //later validator observable subject can send object back with fieldErrorexample: 'field error message' or if error defaulted when false.

    }
  }, {
    key: "update",
    value: function update(value) {
      this.value$.next(value);
      this.validate(value);
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React__default["default"].createElement("div", {
        className: "formControl"
      }, /*#__PURE__*/React__default["default"].createElement(this.props.element, {
        status: this.state.status,
        fieldName: this.props.fieldName,
        update: this.update
      }));
    }
  }]);

  return FormControl;
}(React__default["default"].Component);

exports.FormControl = FormControl;
exports.FormGroup = FormGroup;
