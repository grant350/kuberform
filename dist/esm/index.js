import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _classCallCheck from '@babel/runtime/helpers/classCallCheck';
import _createClass from '@babel/runtime/helpers/createClass';
import _assertThisInitialized from '@babel/runtime/helpers/assertThisInitialized';
import _inherits from '@babel/runtime/helpers/inherits';
import _possibleConstructorReturn from '@babel/runtime/helpers/possibleConstructorReturn';
import _getPrototypeOf from '@babel/runtime/helpers/getPrototypeOf';
import React from 'react';
import { BehaviorSubject, Observable, forkJoin, map } from 'rxjs';
import 'react-dom';
import _wrapNativeSuper from '@babel/runtime/helpers/wrapNativeSuper';

function _createSuper$4(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$4(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct$4() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var FormError = /*#__PURE__*/function (_Error) {
  _inherits(FormError, _Error);
  var _super = _createSuper$4(FormError);
  function FormError(message) {
    var _this;
    _classCallCheck(this, FormError);
    _this = _super.call(this, message);
    _this.name = "FormError";
    return _this;
  }
  return _createClass(FormError);
}( /*#__PURE__*/_wrapNativeSuper(Error));

var ErrorHandler = /*#__PURE__*/function () {
  function ErrorHandler(control) {
    _classCallCheck(this, ErrorHandler);
    this.controls = {};
    if (control.constructor.name === "FormGroup") {
      this.formGroupHandler(control);
    }
  }
  _createClass(ErrorHandler, [{
    key: "formGroupHandler",
    value: function formGroupHandler(control) {
      if (control.props.groupName === undefined || typeof control.props.groupName !== "string") {
        throw new FormError("groupName prop not found on '<FormGroup>' component");
      }
      if (control.props.children === undefined) {
        throw new FormError("FormGroup component needs children with one instance of <FormGroup>, <FormArray>, <FormControl>");
      }
    }
  }, {
    key: "formArrayHandler",
    value: function formArrayHandler() {}
  }, {
    key: "formControlHandler",
    value: function formControlHandler(control) {
      console.log('controls', this.controls);
      if (this.controls['box']) {
        throw new FormError("box exists");
      } else {
        this.controls['box'] = true;
      }
      console.log('control-handler', control);
    }
  }, {
    key: "checkControlProps",
    value: function checkControlProps(control, controlNames) {
      if (control.constructor.name === "FormControl") {
        if (control.props.controlName === undefined || typeof control.props.controlName !== "string") {
          throw new FormError("controlName prop not found on '<FormControl>' component");
        }
        if (control.props.updateOn !== undefined) {
          try {
            if (["change", "blur"].includes(control.props.updateOn.toLowerCase()) === false) {
              throw new FormError("updateOn prop must be either 'change' or 'blur' ");
            }
          } catch (_unused) {
            throw new FormError("updateOn prop must be either 'change' or 'blur' ");
          }
        }
        if (control.props.validators) {
          if (Array.isArray(control.props.validators) === false) {
            throw new FormError("validators prop on '<FormControl>' must be of type Array");
          }
          control.props.validators.forEach(function (fn) {
            if (fn instanceof Function === false) {
              throw new FormError("validators must be a function with parameters control and observable");
            }
          });
        }
        if (control.props.children === undefined) {
          throw new FormError("FormControl needs children");
        }
      }
    }
  }]);
  return ErrorHandler;
}();

function _createSuper$3(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$3(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct$3() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var AbstractControl = /*#__PURE__*/function (_React$Component) {
  _inherits(AbstractControl, _React$Component);
  var _super = _createSuper$3(AbstractControl);
  function AbstractControl(props) {
    var _this;
    _classCallCheck(this, AbstractControl);
    _this = _super.call(this, props);
    _this.errorHandler = new ErrorHandler(_assertThisInitialized(_this));
    Object.defineProperty(_assertThisInitialized(_this), 'statusChanges', {
      value: new BehaviorSubject("VALID"),
      writable: false
    });
    return _this;
  }
  _createClass(AbstractControl, [{
    key: "getErrors",
    value: function getErrors() {
      return this.state.errors;
    }
  }, {
    key: "getValue",
    value: function getValue() {
      return this.state.value;
    }
  }, {
    key: "getStatus",
    value: function getStatus() {
      return this.state.status;
    }
  }, {
    key: "setStateAndView",
    value: function setStateAndView(obj, fn) {
      this.setState(obj, function () {
        //do something to disable the inputs
        fn();
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
      if (this.state.value === '') {
        return true;
      }
      if (this.state.value === undefined) {
        return true;
      }
      return false;
    }
  }, {
    key: "setTouched",
    value: function setTouched(options) {
      var _this2 = this;
      this.setStateAndView({
        touched: true
      }, function () {
        if (_this2.parent && !options.onlySelf) {
          _this2.parent.setTouched(options);
        }
      });
    }
  }, {
    key: "setDirty",
    value: function setDirty(value, options) {
      var _this3 = this;
      this.setStateAndView({
        dirty: true
      }, function () {
        if (_this3.parent && !options.onlySelf) {
          _this3.parent.setDirty(options);
        }
      });
    }
  }, {
    key: "isDisabled",
    value: function isDisabled() {
      return this.state.disabled;
    }
  }, {
    key: "calculateStatus",
    value: function calculateStatus() {
      if (this.state.errors) {
        return "INVALID";
      } else if (this.anyControlsHaveStatus("INVALID")) {
        return "INVALID";
      } else if (this.isDisabled()) {
        return "DISABLED";
      } else if (this.anyControlsHaveStatus("PENDING")) {
        return "PENDING";
      }
      return "VALID";
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
    key: "composeAsyncValidators",
    value: function composeAsyncValidators(validators) {
      return validators != null ? this.mergeValidators(validators) : null;
    }
  }, {
    key: "mergeValidators",
    value: function mergeValidators(validators) {
      var _this4 = this;
      //.pipe(take(1));
      return function (control) {
        var asyncObservables = _this4.props.validators.map(function (validator) {
          return new Observable(function (error$) {
            validator(control, error$);
          });
        });
        return forkJoin(asyncObservables).pipe(map(_this4.mergeErrors));
      };
    }
  }, {
    key: "mergeErrors",
    value: function mergeErrors(arrayOfErrors) {
      var totalErrors = {};
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
      var _this5 = this;
      var status = this.calculateStatus();
      this.setStateAndView({
        status: status
      }, function () {
        _this5.statusChanges.next(status);
        if (_this5.parent) {
          _this5.parent.updateControlsErrors();
        }
      });
    }
  }, {
    key: "setErrors",
    value: function setErrors(errorObject) {
      var _this6 = this;
      this.setStateAndView({
        errors: errorObject
      }, function () {
        _this6.updateControlsErrors();
      });
    }
  }, {
    key: "runAsyncValidator",
    value: function runAsyncValidator(options) {
      var _this7 = this;
      if (this.asyncValidator) {
        this.setStateAndView({
          status: "PENDING"
        }, function () {
          _this7.asyncSubscription = _this7.asyncValidator(_this7).subscribe(function (errs) {
            _this7.setErrors(errs);
          });
        });
      }
    }
  }, {
    key: "updateValue",
    value: function updateValue() {
      // do nohing as theres no controls to update
    }
  }, {
    key: "setInitialStatusAndErrors",
    value: function setInitialStatusAndErrors(cb) {
      this.setStateAndView({
        status: this.isDisabled() ? "DISABLED" : "VALID",
        errors: null
      }, cb);
    }
  }, {
    key: "updateValueAndValidity",
    value: function updateValueAndValidity(options) {
      var _this8 = this;
      this.setInitialStatusAndErrors(function () {
        var status = _this8.calculateStatus();
        _this8.updateValue();
        _this8.setStateAndView({
          status: status
        }, function () {
          if (_this8.state.enabled) {
            if (_this8.asyncSubscription) {
              _this8.asyncSubscription.unsubscribe();
            }
            if (_this8.state.status === "VALID" || _this8.state.status === "PENDING") {
              _this8.runAsyncValidator(options);
            }
          }
          _this8.valueChanges.next(_this8.state.value);
          _this8.statusChanges.next(_this8.state.status);
          if (_this8.props.parent && !options.onlySelf) {
            _this8.props.parent.updateValueAndValidity(options);
          }
        });
      });
    }
  }, {
    key: "setValue",
    value: function setValue(value, options) {
      var _this9 = this;
      this.setStateAndView({
        value: value
      }, function () {
        _this9.updateValueAndValidity(options);
      });
    }
  }]);
  return AbstractControl;
}(React.Component);

function _createSuper$2(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$2(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var FormGroup = /*#__PURE__*/function (_AbstractControl) {
  _inherits(FormGroup, _AbstractControl);
  var _super = _createSuper$2(FormGroup);
  function FormGroup(props) {
    var _this;
    _classCallCheck(this, FormGroup);
    _this = _super.call(this, props);
    _this.state = {
      value: {},
      status: "VALID",
      touched: false,
      dirty: false
    };
    _this.controls = {};
    Object.defineProperty(_assertThisInitialized(_this), 'groupName', {
      value: _this.props.groupName,
      writable: false
    });
    Object.defineProperty(_assertThisInitialized(_this), 'valueChanges', {
      value: new BehaviorSubject({}),
      writable: false
    });
    _this.reduceChildren = _this.reduceChildren.bind(_assertThisInitialized(_this));
    _this.recurseDom = _this.recurseDom.bind(_assertThisInitialized(_this));
    Object.defineProperty(_assertThisInitialized(_this), 'clonedChildren', {
      value: _this.recurseDom(_this.props.children, _this.controls, 0),
      writable: false
    });
    return _this;
  }
  _createClass(FormGroup, [{
    key: "recurseDom",
    value: function recurseDom(children, controls, depth) {
      var _this2 = this;
      return React.Children.map(children, function (child) {
        if (child.props) {
          if (child.props.controlName) {
            var newref = function newref(element) {
              if (controls[child.props.controlName]) {
                throw new FormError("duplicate controlName");
              }
              controls[child.props.controlName] = element;
            };
            if (child.props.children.hasOwnProperty('type') === false) {
              child = /*#__PURE__*/React.cloneElement(child, {
                children: /*#__PURE__*/React.createElement(child.props.children, null)
              });
            }
            return /*#__PURE__*/React.cloneElement(child, {
              ref: newref,
              parent: _this2,
              defaultValue: child.props.defaultValue
            });
          }
          if (child.props.groupName) {
            var _newref = function _newref(element) {
              if (controls[child.props.groupName]) {
                throw new FormError("duplicate groupName");
              }
              controls[child.props.groupName] = element;
            };
            return /*#__PURE__*/React.cloneElement(child, {
              parent: _this2,
              ref: _newref
            });
          }
          if (child.props.arrayName) {
            var _newref2 = function _newref2(element) {
              if (controls[child.props.arrayName]) {
                throw new FormError("duplicate arrayName");
              }
              controls[child.props.arrayName] = element;
            };
            return /*#__PURE__*/React.cloneElement(child, {
              parent: _this2,
              ref: _newref2
            });
          }
          if (child.props.children && child.props.groupName === undefined && child.props.arrayName === undefined) {
            return /*#__PURE__*/React.cloneElement(child, {
              children: _this2.recurseDom(child.props.children, controls, depth + 1)
            });
          }
        } else {
          return child;
        }
      });
    }
  }, {
    key: "getControl",
    value: function getControl(control) {
      return this.controls[control];
    }
  }, {
    key: "setValue",
    value: function setValue(value) {
      var _this3 = this;
      Object.keys(value).forEach(function (name) {
        _this3.controls[name].setValue(value[name]);
      });
    }
  }, {
    key: "anyControls",
    value: function anyControls(condition) {
      for (var _i = 0, _Object$entries = Object.entries(this.controls); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2);
          _Object$entries$_i[0];
          var control = _Object$entries$_i[1];
        if (condition(control)) {
          return true;
        }
      }
      return false;
    }
  }, {
    key: "reduceObject",
    value: function reduceObject(object, fn, initValue) {
      if (Array.isArray(initValue) || typeof initValue === "string") {
        throw new SyntaxError("initial value must be an object!");
      }
      Object.keys(object).forEach(function (key) {
        initValue = fn(initValue, object[key], key);
      });
      return initValue;
    }
  }, {
    key: "reduceChildren",
    value: function reduceChildren() {
      var newValue = this.reduceObject(this.controls, function (acc, control, key) {
        acc[key] = control.getValue();
        return acc;
      }, {});
      this.setState({
        value: newValue
      });
      this.valueChanges.next(newValue);
    }
  }, {
    key: "updateValue",
    value: function updateValue() {
      this.reduceChildren();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {}
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;
      return /*#__PURE__*/React.createElement("div", {
        className: "formGroup",
        sx: this.props.sx
      }, /*#__PURE__*/React.createElement(React.Fragment, null, React.Children.map(this.clonedChildren, function (child) {
        if (child.props.container) {
          return /*#__PURE__*/React.cloneElement(child, {
            status: _this4.state.status
          });
        } else {
          return child;
        }
      })));
    }
  }]);
  return FormGroup;
}(AbstractControl);

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var FormArray = /*#__PURE__*/function (_AbstractControl) {
  _inherits(FormArray, _AbstractControl);
  var _super = _createSuper$1(FormArray);
  function FormArray(props) {
    var _this;
    _classCallCheck(this, FormArray);
    _this = _super.call(this, props);
    _this.state = {
      value: [],
      status: "VALID",
      touched: false,
      dirty: false
    };
    _this.controls = [];
    Object.defineProperty(_assertThisInitialized(_this), 'arrayName', {
      value: _this.props.arrayName,
      writable: false
    });
    Object.defineProperty(_assertThisInitialized(_this), 'valueChanges', {
      value: new BehaviorSubject({}),
      writable: false
    });
    _this.reduceChildren = _this.reduceChildren.bind(_assertThisInitialized(_this));
    _this.recurseDom = _this.recurseDom.bind(_assertThisInitialized(_this));
    Object.defineProperty(_assertThisInitialized(_this), 'clonedChildren', {
      value: _this.recurseDom(_this.props.children, _this.controls, 0),
      writable: false
    });
    return _this;
  }
  _createClass(FormArray, [{
    key: "recurseDom",
    value: function recurseDom(children, controls, depth) {
      var _this2 = this;
      return React.Children.map(children, function (child, index) {
        if (child.props) {
          if (child.props.controlName) {
            var newref = function newref(element) {
              //check if control already exists in array.
              controls.push(element);
            };
            if (child.props.children.hasOwnProperty('type') === false) {
              child = /*#__PURE__*/React.cloneElement(child, {
                children: /*#__PURE__*/React.createElement(child.props.children, null)
              });
            }
            return /*#__PURE__*/React.cloneElement(child, {
              ref: newref,
              parent: _this2,
              defaultValue: child.props.defaultValue
            });
          }
          if (child.props.groupName) {
            var _newref = function _newref(element) {
              controls.push(element);
            };
            return /*#__PURE__*/React.cloneElement(child, {
              parent: _this2,
              ref: _newref
            });
          }
          if (child.props.arrayName) {
            var _newref2 = function _newref2(element) {
              controls.push(element);
            };
            return /*#__PURE__*/React.cloneElement(child, {
              parent: _this2,
              ref: _newref2
            });
          }
          if (child.props.children && child.props.groupName === undefined && child.props.arrayName === undefined) {
            return /*#__PURE__*/React.cloneElement(child, {
              children: _this2.recurseDom(child.props.children, controls, depth + 1)
            });
          }
        } else {
          return child;
        }
      });
    }
  }, {
    key: "getControl",
    value: function getControl(index) {
      return this.controls[index];
    }
  }, {
    key: "setValue",
    value: function setValue(value) {
      var _this3 = this;
      value.forEach(function (value, index) {
        _this3.controls[index].setValue(value);
      });
    }
  }, {
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
    key: "reduceObject",
    value: function reduceObject(object, fn, initValue) {
      if (Array.isArray(initValue) || typeof initValue === "string") {
        throw new SyntaxError("initial value must be an object!");
      }
      Object.keys(object).forEach(function (key) {
        initValue = fn(initValue, object[key], key);
      });
      return initValue;
    }
  }, {
    key: "reduceChildren",
    value: function reduceChildren() {
      var newValue = this.controls.reduce(function (acc, control, index) {
        acc[index] = control.getValue();
        return acc;
      }, []);
      this.setState({
        value: newValue
      });
      this.valueChanges.next(newValue);
    }
  }, {
    key: "updateValue",
    value: function updateValue() {
      this.reduceChildren();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {}
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;
      return /*#__PURE__*/React.createElement("div", {
        className: "formArray",
        sx: this.props.sx
      }, /*#__PURE__*/React.createElement(React.Fragment, null, React.Children.map(this.clonedChildren, function (child) {
        if (child.props.container) {
          return /*#__PURE__*/React.cloneElement(child, {
            status: _this4.state.status
          });
        } else {
          return child;
        }
      })));
    }
  }]);
  return FormArray;
}(AbstractControl);

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var FormControl = /*#__PURE__*/function (_AbstractControl) {
  _inherits(FormControl, _AbstractControl);
  var _super = _createSuper(FormControl);
  function FormControl(props) {
    var _this;
    _classCallCheck(this, FormControl);
    _this = _super.call(this, props);
    _this.state = {
      status: "VALID",
      value: _this.props.defaultValue ? _this.props.defaultValue : '',
      errors: null,
      touched: false,
      dirty: false,
      disabled: _this.props.disabled ? true : false,
      enabled: _this.props.disabled ? false : true
    };
    Object.defineProperty(_assertThisInitialized(_this), 'controlName', {
      value: _this.props.controlName,
      writable: false
    });
    Object.defineProperty(_assertThisInitialized(_this), 'valueChanges', {
      value: new BehaviorSubject(_this.props.defaultValue !== undefined ? _this.props.defaultValue : null),
      writable: false
    });
    Object.defineProperty(_assertThisInitialized(_this), 'onChange', {
      value: _this.onChange.bind(_assertThisInitialized(_this)),
      writable: false
    });
    Object.defineProperty(_assertThisInitialized(_this), 'onBlur', {
      value: _this.onBlur.bind(_assertThisInitialized(_this)),
      writable: false
    });
    _this.updateOn = _this.props.updateOn ? _this.props.updateOn : 'change';
    _this.asyncValidator = _this.props.validators ? _this.composeAsyncValidators(_this.props.validators) : null;
    _this.asyncSubscription = null;
    _this.ref = /*#__PURE__*/React.createRef();
    return _this;
  }
  _createClass(FormControl, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setValue(this.state.value, {});
    }
  }, {
    key: "onChange",
    value: function onChange(e) {
      var value = e.target.value;
      if (this.updateOn === "change") {
        this.setValue(value, {});
      }
      if (this.state.dirty === false) {
        this.setDirty();
      }
    }
  }, {
    key: "onBlur",
    value: function onBlur(e) {
      if (this.updateOn === "blur") {
        var value = e.target.value;
        this.setValue(value, {});
      }
      if (this.state.touched === false) {
        this.setTouched();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      return /*#__PURE__*/React.createElement("div", {
        className: "formControl",
        ref: this.ref,
        style: this.props.sx,
        onBlur: this.onBlur,
        onChange: this.onChange,
        touched: this.state.touched.toString(),
        dirty: this.state.dirty.toString()
      }, /*#__PURE__*/React.createElement(React.Fragment, null, React.Children.map(this.props.children, function (child) {
        return /*#__PURE__*/React.cloneElement(child, {
          invalid: _this2.invalid,
          dirty: _this2.state.dirty,
          value: _this2.state.value,
          errors: _this2.state.errors,
          getStatus: _this2.getStatus,
          touched: _this2.state.touched,
          status: _this2.state.status,
          setValue: _this2.setValue
        });
      })));
    }
  }]);
  return FormControl;
}(AbstractControl);

var Validators = /*#__PURE__*/function () {
  function Validators() {
    _classCallCheck(this, Validators);
  }
  _createClass(Validators, [{
    key: "isFloat",
    get: function get() {
      return function (control, obs) {
        function isFloat(n) {
          return Number(n) === n && n % 1 !== 0;
        }
        if (isFloat(control.getValue())) {
          obs.next(null);
        } else {
          obs.next({
            invalidFloat: true
          });
        }
      };
    }
  }, {
    key: "isInterger",
    get: function get() {}
  }, {
    key: "isShort",
    get: function get() {}
  }, {
    key: "isArray",
    get: function get() {}
  }, {
    key: "isObject",
    get: function get() {}
  }, {
    key: "isBoolean",
    get: function get() {
      return function (control, obs) {
        var val = control.getValue().toLowerCase();
        if (val === "true" || val === "false") {
          obs.next(null);
        } else {
          obs.next({
            invalidBoolean: true
          });
        }
      };
    }
  }, {
    key: "isNumber",
    get: function get() {
      return function (control, obs) {
        try {
          parseInt(control.getValue());
          obs.next(null);
        } catch (_unused) {
          obs.next({
            invalidNumber: true
          });
        }
      };
    }
  }, {
    key: "isDouble",
    get: function get() {
      var _this = this;
      return function (control, obs) {
        _this.isNumber(control, obs);
        var regex = /^[0-9]*[.]?[0-9]+$/;
        try {
          if (control.getValue().match(regex)) {
            obs.next(null);
          } else {
            throw new Error("Not A Double");
          }
          ;
        } catch (_unused2) {
          obs.next({
            invalidDouble: true
          });
        }
      };
    }
  }, {
    key: "required",
    get: function get() {
      return function (control, obs) {
        var VALUE = control.getValue();
        if (typeof VALUE === "string") {
          if (VALUE.length <= 0) {
            obs.next({
              required: true
            });
          } else {
            obs.next(null);
          }
        } else if (VALUE == null || VALUE == undefined) {
          obs.next({
            required: true
          });
        } else {
          obs.next(null);
        }
      };
    }
  }], [{
    key: "isDate",
    value: function isDate(format) {
      return function (control, obs) {
        if (moment(control.getValue(), format, true).isValid()) {
          obs.next(null);
          return;
        }
        obs.next({
          invalidDate: true
        });
      };
    }
  }, {
    key: "regex",
    value: function regex(_regex) {
      return function (control, obs) {
        if (control.getValue().match(_regex)) {
          obs.next(null);
        } else {
          obs.next({
            invalidRegex: true
          });
        }
      };
    }
  }, {
    key: "max",
    value: function max(interger) {
      return function (control, obs) {
        var VALUE = control.getValue();
        if (VALUE.length > interger) {
          obs.next({
            maxLengthInvalid: true
          });
        } else {
          obs.next(null);
        }
      };
    }
  }, {
    key: "min",
    value: function min(interger) {
      return function (control, obs) {
        var VALUE = control.getValue();
        if (VALUE.length < interger) {
          obs.next({
            minLengthInvalid: true
          });
        } else {
          obs.next(null);
        }
      };
    }
  }]);
  return Validators;
}();

export { FormArray, FormControl, FormGroup, Validators };
//# sourceMappingURL=index.js.map
