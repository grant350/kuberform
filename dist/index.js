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

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _classCallCheck__default = /*#__PURE__*/_interopDefaultLegacy(_classCallCheck);
var _createClass__default = /*#__PURE__*/_interopDefaultLegacy(_createClass);
var _assertThisInitialized__default = /*#__PURE__*/_interopDefaultLegacy(_assertThisInitialized);
var _inherits__default = /*#__PURE__*/_interopDefaultLegacy(_inherits);
var _possibleConstructorReturn__default = /*#__PURE__*/_interopDefaultLegacy(_possibleConstructorReturn);
var _getPrototypeOf__default = /*#__PURE__*/_interopDefaultLegacy(_getPrototypeOf);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function _createSuper$3(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$3(); return function _createSuperInternal() { var Super = _getPrototypeOf__default["default"](Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf__default["default"](this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn__default["default"](this, result); }; }

function _isNativeReflectConstruct$3() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var AbstractControl = /*#__PURE__*/function (_React$Component) {
  _inherits__default["default"](AbstractControl, _React$Component);

  var _super = _createSuper$3(AbstractControl);

  function AbstractControl(props) {
    var _this;

    _classCallCheck__default["default"](this, AbstractControl);

    _this = _super.call(this, props);
    Object.defineProperty(_assertThisInitialized__default["default"](_this), 'status$', {
      value: new rxjs.BehaviorSubject("VALID"),
      writable: false
    });
    Object.defineProperty(_assertThisInitialized__default["default"](_this), 'setValue', {
      value: _this.setValue.bind(_assertThisInitialized__default["default"](_this)),
      writable: false
    });
    Object.defineProperty(_assertThisInitialized__default["default"](_this), 'valueChanges', {
      value: _this.valueChanges,
      writable: false
    });
    Object.defineProperty(_assertThisInitialized__default["default"](_this), 'statusChanges', {
      value: _this.statusChanges,
      writable: false
    });
    Object.defineProperty(_assertThisInitialized__default["default"](_this), 'setErrors', {
      value: _this.setErrors,
      writable: false
    });
    Object.defineProperty(_assertThisInitialized__default["default"](_this), 'setTouched', {
      value: _this.setTouched.bind(_assertThisInitialized__default["default"](_this)),
      writable: false
    });
    Object.defineProperty(_assertThisInitialized__default["default"](_this), 'setDirty', {
      value: _this.setDirty.bind(_assertThisInitialized__default["default"](_this)),
      writable: false
    });
    _this.leaveAsNullWhenEmpty = _this.props.leaveAsNullWhenEmpty ? true : false;
    return _this;
  }

  _createClass__default["default"](AbstractControl, [{
    key: "getRawValue",
    value: function getRawValue() {
      var frozenObjectValue = Object.assign({}, this.state.value);
      return Object.defineProperty({}, 'value', {
        value: frozenObjectValue,
        writable: false
      });
    }
  }, {
    key: "invalid",
    get: function get() {
      return this.state.status === "INVALID" ? true : false;
    }
  }, {
    key: "isEmptyValue",
    get: function get() {
      if (this.state.value === null) {
        return true;
      }

      if (this.state.value.length <= 0) {
        return true;
      }
      return false;
    }
  }, {
    key: "setTouched",
    value: function setTouched() {
      this.setState({
        touched: true
      });

      if (this.parent) {
        this.parent.setTouched();
      }
    }
  }, {
    key: "setDirty",
    value: function setDirty(value) {
      this.setState({
        dirty: true
      });

      if (this.parent) {
        this.parent.setDirty();
      }
    }
  }, {
    key: "calculateStatus",
    value: function calculateStatus() {
      if (this.state.errors) {
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
        return control.state.status == status;
      });
    }
  }, {
    key: "anyControls",
    value: function anyControls(condition) {
      condition(this);
    }
  }, {
    key: "getRawStatus",
    value: function getRawStatus() {
      return this.state.status;
    }
  }, {
    key: "mergeValidators",
    value: function mergeValidators(validators) {
      var _this2 = this;

      var asyncValidatorObservables = this.props.validators.map(function (validator) {
        return new rxjs.Observable(function (error$) {
          validator(_this2.state.value, error$);
        }).pipe(rxjs.take(1));
      });
      return rxjs.forkJoin(asyncValidatorObservables).pipe(rxjs.map(this.mergeErrors));
    }
  }, {
    key: "mergeErrors",
    value: function mergeErrors(arrayOfErrors) {
      var totalErrors = {}; // let totalWarnings = {};

      arrayOfErrors.forEach(function (errorsObj) {
        if (errorsObj !== null) {
          totalErrors = Object.assign(totalErrors, errorsObj);
        }
      });
      return Object.keys(totalErrors).length === 0 ? null : totalErrors;
    }
  }, {
    key: "updateControlsErrors",
    value: function updateControlsErrors() {
      var _this3 = this;

      var status = this.calculateStatus();
      this.setState({
        status: status
      }, function () {
        _this3.status$.next(status);

        _this3.status = status;
      });

      if (this.props.parent) {
        this.props.parent.updateControlsErrors();
      }
    } //this.forceupdate instead of using state and pass in the static values

  }, {
    key: "getStatus",
    value: function getStatus() {
      return this.status;
    }
  }, {
    key: "setErrors",
    value: function setErrors(errorObject) {
      var _this4 = this;

      this.setState({
        errors: errorObject
      }, function () {
        _this4.updateControlsErrors();
      });
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
      var _this5 = this;

      if (this.state.value !== value) {
        this.setDirty();
        this.value$.next(value);
        this.setState({
          value: value
        }, function () {
          if (_this5.validator) {
            _this5.validate(value);
          }
        });
      } else {
        if (this.validator) {
          this.validate(value);
        }
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
      status: "VALID",
      touched: false
    };
    _this.controls = {};
    Object.defineProperty(_assertThisInitialized__default["default"](_this), 'groupName', {
      value: _this.props.groupName,
      writable: false
    });
    Object.defineProperty(_assertThisInitialized__default["default"](_this), 'value$', {
      value: new rxjs.BehaviorSubject({}),
      writable: false
    });
    Object.defineProperty(_assertThisInitialized__default["default"](_this), 'clonedChildren', {
      value: React__default["default"].Children.map(_this.props.children, function (child) {
        if (child.props.fieldName) {
          var newref = function newref(element) {
            _this.controls[child.props.fieldName] = element;
          };

          if (child.props.defaultValue) {
            return /*#__PURE__*/React__default["default"].cloneElement(child, {
              ref: newref,
              parent: _assertThisInitialized__default["default"](_this),
              defaultValue: child.props.defaultValue
            });
          } else {
            return /*#__PURE__*/React__default["default"].cloneElement(child, {
              ref: newref,
              parent: _assertThisInitialized__default["default"](_this)
            });
          }
        } else if (child.props.groupName || child.props.arrayName) {
          if (child.props.arrayName) {
            var _newref = function _newref(element) {
              _this.controls[child.props.arrayName] = element;
            };

            return /*#__PURE__*/React__default["default"].cloneElement(child, {
              parent: _assertThisInitialized__default["default"](_this),
              ref: _newref
            });
          }

          if (child.props.groupName) {
            var _newref2 = function _newref2(element) {
              _this.controls[child.props.groupName] = element;
            };

            return /*#__PURE__*/React__default["default"].cloneElement(child, {
              parent: _assertThisInitialized__default["default"](_this),
              ref: _newref2
            });
          }
        } else {
          return /*#__PURE__*/React__default["default"].cloneElement(child, {});
        }
      }),
      writable: false
    });
    return _this;
  }

  _createClass__default["default"](FormGroup, [{
    key: "getControl",
    value: function getControl(control) {
      return this.controls[control];
    }
  }, {
    key: "setValue",
    value: function setValue(value) {
      var _this2 = this;

      Object.keys(value).forEach(function (name) {
        _this2.controls[name].setValue(value[name]);
      });
    }
  }, {
    key: "anyControls",
    value: function anyControls(condition) {
      for (var _i = 0, _Object$entries = Object.entries(this.controls); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = _slicedToArray__default["default"](_Object$entries[_i], 2);
            _Object$entries$_i[0];
            var control = _Object$entries$_i[1];

        if (condition(control)) {
          return true;
        }
      }

      return false;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this3 = this;

      Object.keys(this.controls).forEach(function (key) {
        var child = _this3.controls[key];

        if (child !== null) {
          if (child.statusChanges) {
            child.statusChanges().subscribe(function (status) {
              var groupStatus = _this3.calculateStatus();

              if (_this3.state.status !== groupStatus) {
                _this3.setState({
                  status: groupStatus
                }, function () {
                  _this3.status$.next(groupStatus);
                });
              }
            });
          }

          if (child.valueChanges) {
            child.valueChanges().subscribe(function (val) {
              _this3.state.value[key] = val;

              _this3.setState({
                value: _this3.state.value
              }, function () {
                _this3.value$.next(_this3.state.value);
              });
            });
          }
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      //work around for not having state is to run another react.clone children or abodnand state all togeher and force render
      return /*#__PURE__*/React__default["default"].createElement("div", {
        className: "formGroup"
      }, this.props.container ? /*#__PURE__*/React__default["default"].createElement(this.props.container, null, this.clonedChildren) : /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, React__default["default"].Children.map(this.clonedChildren, function (child) {
        return /*#__PURE__*/React__default["default"].cloneElement(child, {
          status: _this4.state.status
        });
      })));
    }
  }]);

  return FormGroup;
}(AbstractControl);

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf__default["default"](Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf__default["default"](this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn__default["default"](this, result); }; }

function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var FormArray = /*#__PURE__*/function (_AbstractControl) {
  _inherits__default["default"](FormArray, _AbstractControl);

  var _super = _createSuper$1(FormArray);

  function FormArray(props) {
    var _this;

    _classCallCheck__default["default"](this, FormArray);

    _this = _super.call(this, props);
    _this.state = {
      value: [],
      status: "VALID",
      touched: false
    };
    _this.controls = [];
    throw Error("FORMARRAY IS NOT FINISHED. PLEASE WAIT THANK YOU...");
  }

  _createClass__default["default"](FormArray, [{
    key: "anyControls",
    value: function anyControls(condition) {
      var _iterator = _createForOfIteratorHelper(this.controls),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var control = _step.value;

          if (condition(control)) {
            return true;
            break;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return false;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.controls.forEach(function (child, index) {
        if (child !== null) {
          if (child.statusChanges) {
            child.statusChanges().subscribe(function (status) {
              var arrayStatus = _this2.calculateStatus();

              _this2.setState({
                status: arrayStatus
              }, function () {
                _this2.status$.next(arrayStatus);
              });
            });
          }

          if (child.valueChanges) {
            child.valueChanges().subscribe(function (val) {
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
    _this.updateOn = _this.props.updateOn ? _this.props.updateOn : 'change';
    _this.state = {
      status: "VALID",
      value: _this.props.defaultValue !== undefined ? _this.props.defaultValue : null,
      errors: null,
      touched: false,
      dirty: false
    };

    if (!_this.props.fieldName) {
      throw new ReferenceError("fieldName does not exists on FormControl");
    }

    Object.defineProperty(_assertThisInitialized__default["default"](_this), 'fieldName', {
      value: _this.props.fieldName,
      writable: false
    });
    Object.defineProperty(_assertThisInitialized__default["default"](_this), 'value$', {
      value: new rxjs.BehaviorSubject(_this.props.defaultValue !== undefined ? _this.props.defaultValue : null),
      writable: false
    });
    Object.defineProperty(_this.state, 'status', {
      value: 'VALID',
      writable: false
    });
    Object.defineProperty(_this.state, 'value', {
      value: _this.props.defaultValue !== undefined ? _this.props.defaultValue : null,
      writable: false
    });
    Object.defineProperty(_this.state, 'errors', {
      value: null,
      writable: false
    });
    Object.defineProperty(_assertThisInitialized__default["default"](_this), 'onChange', {
      value: _this.onChange.bind(_assertThisInitialized__default["default"](_this)),
      writable: false
    });
    Object.defineProperty(_assertThisInitialized__default["default"](_this), 'onBlur', {
      value: _this.onBlur.bind(_assertThisInitialized__default["default"](_this)),
      writable: false
    });
    Object.defineProperty(_assertThisInitialized__default["default"](_this), 'validator', {
      value: _this.props.validators ? _this.mergeValidators(_this.props.validators) : null,
      writable: false
    });
    return _this;
  }

  _createClass__default["default"](FormControl, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setValue(this.state.value);
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

      this.validator.subscribe(function (errs) {
        _this2.setErrors(errs);
      });
    }
  }, {
    key: "onChange",
    value: function onChange(e) {
      if (this.updateOn === "change") {
        if (this.leaveAsNullWhenEmpty) ;

        var value = e.target.value;

        if (value.toLowerCase() === "true") {
          value = true;
        }

        if (value.toLowerCase() === "false") {
          value = false;
        }

        if (value !== null && value !== undefined) {
          this.setValue(value);
        }
      }
    }
  }, {
    key: "onBlur",
    value: function onBlur(e) {
      if (this.updateOn === "blur") {
        var value = e.target.value;

        if (value !== null && value !== undefined) {
          this.setValue(value);
        }
      }

      this.setTouched();
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return /*#__PURE__*/React__default["default"].createElement("div", {
        className: "formControl",
        style: this.props.sx,
        onBlur: this.onBlur,
        onChange: this.onChange
      }, this.props.element ? /*#__PURE__*/React__default["default"].createElement(this.props.element, {
        ref: this.control,
        invalid: this.invalid,
        errorMessages: this.props.errorMessages,
        dirty: this.state.dirty,
        value: this.state.value,
        errors: this.state.errors,
        getStatus: this.getStatus,
        label: this.props.label,
        touched: this.state.touched,
        status: this.state.status,
        fieldName: this.fieldName,
        setValue: this.setValue
      }) : /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, React__default["default"].Children.map(this.props.children, function (child) {
        return /*#__PURE__*/React__default["default"].cloneElement(child, {
          invalid: _this3.invalid,
          errorMessages: _this3.props.errorMessages,
          dirty: _this3.state.dirty,
          value: _this3.state.value,
          errors: _this3.state.errors,
          getStatus: _this3.getStatus,
          label: child.props.label ? child.props.label : _this3.props.label,
          touched: _this3.state.touched,
          status: _this3.state.status,
          setValue: _this3.setValue
        });
      })[0]));
    }
  }]);

  return FormControl;
}(AbstractControl);

var Validators = /*#__PURE__*/function () {
  function Validators() {
    _classCallCheck__default["default"](this, Validators);
  }

  _createClass__default["default"](Validators, null, [{
    key: "required",
    value: function required() {
      return function (value, obs) {
        if (typeof value === "string") {
          if (value.length <= 0) {
            obs.next({
              required: true
            });
          } else {
            obs.next(null);
          }
        } else if (value == null || value == undefined) {
          obs.next({
            required: true
          });
        } else {
          obs.next(null);
        }
      };
    }
  }]);

  return Validators;
}();

exports.FormArray = FormArray;
exports.FormControl = FormControl;
exports.FormGroup = FormGroup;
exports.Validators = Validators;
