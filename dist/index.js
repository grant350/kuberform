'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _classCallCheck = require('@babel/runtime/helpers/classCallCheck');
var _createClass = require('@babel/runtime/helpers/createClass');
var _assertThisInitialized = require('@babel/runtime/helpers/assertThisInitialized');
var _inherits = require('@babel/runtime/helpers/inherits');
var _possibleConstructorReturn = require('@babel/runtime/helpers/possibleConstructorReturn');
var _getPrototypeOf = require('@babel/runtime/helpers/getPrototypeOf');
var React = require('react');
var rxjs = require('rxjs');
var _typeof = require('@babel/runtime/helpers/typeof');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _classCallCheck__default = /*#__PURE__*/_interopDefaultLegacy(_classCallCheck);
var _createClass__default = /*#__PURE__*/_interopDefaultLegacy(_createClass);
var _assertThisInitialized__default = /*#__PURE__*/_interopDefaultLegacy(_assertThisInitialized);
var _inherits__default = /*#__PURE__*/_interopDefaultLegacy(_inherits);
var _possibleConstructorReturn__default = /*#__PURE__*/_interopDefaultLegacy(_possibleConstructorReturn);
var _getPrototypeOf__default = /*#__PURE__*/_interopDefaultLegacy(_getPrototypeOf);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _typeof__default = /*#__PURE__*/_interopDefaultLegacy(_typeof);

function _createSuper$3(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$3(); return function _createSuperInternal() { var Super = _getPrototypeOf__default["default"](Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf__default["default"](this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn__default["default"](this, result); }; }

function _isNativeReflectConstruct$3() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var AbstractControl = /*#__PURE__*/function (_React$Component) {
  _inherits__default["default"](AbstractControl, _React$Component);

  var _super = _createSuper$3(AbstractControl);

  function AbstractControl(props) {
    var _this;

    _classCallCheck__default["default"](this, AbstractControl);

    _this = _super.call(this, props); // this.state = {value: null, status: "VALID"}

    _this.status$ = new rxjs.BehaviorSubject("VALID");
    _this.setValue = _this.setValue.bind(_assertThisInitialized__default["default"](_this));
    _this.valueChanges = _this.valueChanges.bind(_assertThisInitialized__default["default"](_this));
    _this.statusChanges = _this.statusChanges.bind(_assertThisInitialized__default["default"](_this));
    _this.setErrors = _this.setErrors.bind(_assertThisInitialized__default["default"](_this));
    _this.updateStatus = _this.updateStatus.bind(_assertThisInitialized__default["default"](_this));
    _this.calculateStatus = _this.calculateStatus.bind(_assertThisInitialized__default["default"](_this));
    _this.anyControlsHaveStatus = _this.anyControlsHaveStatus.bind(_assertThisInitialized__default["default"](_this));
    _this.anyControls = _this.anyControls.bind(_assertThisInitialized__default["default"](_this));
    return _this;
  }

  _createClass__default["default"](AbstractControl, [{
    key: "getRawValue",
    value: function getRawValue() {
      return this.state.value;
    }
  }, {
    key: "updateStatus",
    value: function updateStatus(status) {
      var _this2 = this;

      this.setState({
        status: status
      }, function () {
        _this2.status$.next(status);
      });
    }
  }, {
    key: "calculateStatus",
    value: function calculateStatus() {
      if (this.state.errors !== null) {
        return "INVALID";
      } else if (this.anyControlsHaveStatus("INVALID")) {
        return "INVALID";
      } else {
        return "VALID";
      }
    }
  }, {
    key: "anyControlsHaveStatus",
    value: function anyControlsHaveStatus(status) {
      return this.anyControls(function (control) {
        return control.status == status;
      });
    }
  }, {
    key: "anyControls",
    value: function anyControls(condition) {
      condition(this.state);
    }
  }, {
    key: "setErrors",
    value: function setErrors(errorObject) {
      var _this3 = this;

      if (errorObject !== null) {
        this.setState({
          errors: errorObject
        }, function () {
          var status = _this3.calculateStatus();

          console.log('statu', status);

          _this3.status$.next(status);

          _this3.setState({
            status: status
          });
        });
      } else {
        var status = this.calculateStatus();
        console.log('statu', status);
        this.status$.next(status);
        this.setState({
          status: status
        });
      }
    }
  }, {
    key: "valueChanges",
    value: function valueChanges() {
      return this.value$.asObservable();
    }
  }, {
    key: "statusChanges",
    value: function statusChanges() {
      return this.status$.asObservable();
    }
  }, {
    key: "setValue",
    value: function setValue(value) {
      this.value$.next(value);

      if (this.props.validators) {
        this.validate(value);
      }
    }
  }]);

  return AbstractControl;
}(React__default["default"].Component);

function _createSuper$2(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$2(); return function _createSuperInternal() { var Super = _getPrototypeOf__default["default"](Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf__default["default"](this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn__default["default"](this, result); }; }

function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var FormGroup = /*#__PURE__*/function (_AbstractControl) {
  _inherits__default["default"](FormGroup, _AbstractControl);

  var _super = _createSuper$2(FormGroup);

  function FormGroup(props) {
    var _this;

    _classCallCheck__default["default"](this, FormGroup);

    _this = _super.call(this, props);
    _this.state = {
      value: {},
      status: "VALID"
    };
    _this.value$ = new rxjs.BehaviorSubject({});
    _this.controls = {};
    Object.defineProperty(_assertThisInitialized__default["default"](_this), 'clonedChildren', {
      value: React__default["default"].Children.map(_this.props.children, function (child) {
        if (child.props.fieldName) {
          _this.controls[child.props.fieldName] = /*#__PURE__*/React__default["default"].createRef();
          return /*#__PURE__*/React__default["default"].cloneElement(child, {
            parent: _assertThisInitialized__default["default"](_this),
            ref: _this.controls[child.props.fieldName]
          });
        } else if (child.props.groupName || child.props.arrayName) {
          if (child.props.arrayName) {
            _this.controls[child.props.arrayName] = /*#__PURE__*/React__default["default"].createRef();
            return /*#__PURE__*/React__default["default"].cloneElement(child, {
              ref: _this.controls[child.props.arrayName]
            });
          }

          if (child.props.groupName) {
            _this.controls[child.props.groupName] = /*#__PURE__*/React__default["default"].createRef();
            return /*#__PURE__*/React__default["default"].cloneElement(child, {
              ref: _this.controls[child.props.groupName]
            });
          }
        }
      }),
      writable: false
    });
    return _this;
  }

  _createClass__default["default"](FormGroup, [{
    key: "anyControls",
    value: function anyControls(condition) {
      Object.entries(this.controls).forEach(function (_ref) {
        var _ref2 = _slicedToArray__default["default"](_ref, 2);
            _ref2[0];
            var value = _ref2[1];
        var control = value.current.state;
        return condition(control);
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      Object.keys(this.controls).forEach(function (key) {
        var child = _this2.controls[key];

        if (child.current !== null) {
          if (child.current.statusChanges) {
            child.current.statusChanges().subscribe(function (status) {
              _this2.status$.next(_this2.calculateStatus());
            });
          }

          if (child.current.valueChanges) {
            child.current.valueChanges().subscribe(function (val) {
              _this2.state.value[key] = val;

              _this2.setState({
                value: _this2.state.value
              }, function () {
                _this2.value$.next(_this2.state.value);
              });
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
      }, this.props.container ? /*#__PURE__*/React__default["default"].createElement(this.props.container, null, this.clonedChildren) : /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, this.clonedChildren));
    }
  }]);

  return FormGroup;
}(AbstractControl);

function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf__default["default"](Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf__default["default"](this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn__default["default"](this, result); }; }

function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var FormArray = /*#__PURE__*/function (_AbstractControl) {
  _inherits__default["default"](FormArray, _AbstractControl);

  var _super = _createSuper$1(FormArray);

  function FormArray(props) {
    var _this;

    _classCallCheck__default["default"](this, FormArray);

    _this = _super.call(this, props);
    _this.value$ = new rxjs.BehaviorSubject([]);
    _this.state = {
      value: [],
      status: "VALID"
    };
    _this.controls = [];
    Object.defineProperty(_assertThisInitialized__default["default"](_this), 'clonedChildren', {
      value: React__default["default"].Children.map(_this.props.children, function (child, index) {
        if (child.props.fieldName) {
          _this.controls[index] = /*#__PURE__*/React__default["default"].createRef();
          return /*#__PURE__*/React__default["default"].cloneElement(child, {
            parent: _assertThisInitialized__default["default"](_this),
            status: _this.state.status,
            ref: _this.controls[index]
          });
        } else if (child.props.groupName || child.props.arrayName) {
          if (child.props.arrayName) {
            _this.controls[index] = /*#__PURE__*/React__default["default"].createRef();
          }

          if (child.props.groupName) {
            _this.controls[index] = /*#__PURE__*/React__default["default"].createRef();
          }

          return /*#__PURE__*/React__default["default"].cloneElement(child, {
            ref: _this.controls[index],
            status: _this.state.status
          });
        }
      }),
      writable: false
    });
    return _this;
  }

  _createClass__default["default"](FormArray, [{
    key: "anyControls",
    value: function anyControls(condition) {
      this.controls.forEach(function (controlref) {
        var control = controlref.current.state;
        return condition(control);
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.controls.forEach(function (control, index) {
        var child = control;

        if (child.current !== null) {
          if (child.current.statusChanges) {
            child.current.statusChanges().subscribe(function (status) {
              _this2.calculateStatus();
            });
          }

          if (child.current.valueChanges) {
            child.current.valueChanges().subscribe(function (val) {
              _this2.state.value[index] = val;

              _this2.setState({
                value: _this2.state.value
              }, function () {
                _this2.value$.next(_this2.state.value);
              });
            });
          }
        }
      });
    }
  }, {
    key: "addChild",
    value: function addChild(index) {// adds a child by copying the current chlid in line.
      // or adds what current index child
    }
  }, {
    key: "removeChild",
    value: function removeChild(index) {// by index or by last item if no index provided
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React__default["default"].createElement("div", {
        className: "formArray"
      }, this.props.container ? /*#__PURE__*/React__default["default"].createElement(this.props.container, null, this.clonedChildren) : /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, this.clonedChildren));
    }
  }]);

  return FormArray;
}(AbstractControl);

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf__default["default"](Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf__default["default"](this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn__default["default"](this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var FormControl = /*#__PURE__*/function (_AbstractControl) {
  _inherits__default["default"](FormControl, _AbstractControl);

  var _super = _createSuper(FormControl);

  function FormControl(props) {
    var _this;

    _classCallCheck__default["default"](this, FormControl);

    _this = _super.call(this, props);
    _this.value$ = new rxjs.BehaviorSubject(_this.props.value ? _this.props.value : '');
    _this.state = {
      status: "VALID",
      errors: null
    };
    _this.errors = null;
    return _this;
  }

  _createClass__default["default"](FormControl, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setValue(this.props.value ? this.props.value : '');
    }
  }, {
    key: "validate",
    value: function validate(value) {
      var _this2 = this;

      if (this.props.validators === undefined || this.props.validators === null || !Array.isArray(this.props.validators)) {
        throw new SyntaxError("validators is not of type Array");
      }

      if (this.props.validators.length > 0) {
        this.status$.next("PENDING");
        this.setState({
          status: "PENDING"
        });
      }

      this.props.validators.forEach(function (validator) {
        new rxjs.Observable(function (error$) {
          validator(value, error$);
        }).pipe(rxjs.take(1)).subscribe(function (errors) {
          if (_typeof__default["default"](errors) === "object") {
            _this2.setErrors(errors);
          } else {
            throw new SyntaxError('validator observable did not return an object');
          }
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React__default["default"].createElement("div", {
        className: "formControl"
      }, /*#__PURE__*/React__default["default"].createElement(this.props.element, {
        errors: this.state.errors,
        label: this.props.label,
        status: this.state.status,
        fieldName: this.props.fieldName,
        setValue: this.setValue
      }));
    }
  }]);

  return FormControl;
}(AbstractControl);

exports.FormArray = FormArray;
exports.FormControl = FormControl;
exports.FormGroup = FormGroup;
