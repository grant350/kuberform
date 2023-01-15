import _classCallCheck from '@babel/runtime/helpers/classCallCheck';
import _createClass from '@babel/runtime/helpers/createClass';
import _assertThisInitialized from '@babel/runtime/helpers/assertThisInitialized';
import _inherits from '@babel/runtime/helpers/inherits';
import _possibleConstructorReturn from '@babel/runtime/helpers/possibleConstructorReturn';
import _getPrototypeOf from '@babel/runtime/helpers/getPrototypeOf';
import React from 'react';
import { BehaviorSubject, Observable, forkJoin, map } from 'rxjs';
import _wrapNativeSuper from '@babel/runtime/helpers/wrapNativeSuper';
import moment from 'moment';

function _createSuper$4(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$4(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct$4() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var FormError = /*#__PURE__*/function (_Error) {
  _inherits(FormError, _Error);
  var _super = _createSuper$4(FormError);
  function FormError(message) {
    var _this;
    _classCallCheck(this, FormError);
    _this = _super.call(this, message);
    _this.name = 'FormError';
    return _this;
  }
  return _createClass(FormError);
}( /*#__PURE__*/_wrapNativeSuper(Error));

var ErrorHandler = /*#__PURE__*/function () {
  function ErrorHandler(control) {
    _classCallCheck(this, ErrorHandler);
    this.controls = {};
    if (control.constructor.name === 'FormGroup') {
      this.formGroupHandler(control);
    }
  }
  _createClass(ErrorHandler, [{
    key: "formGroupHandler",
    value: function formGroupHandler(control) {
      if (control.props.groupName === undefined || typeof control.props.groupName !== 'string') {
        throw new FormError("groupName prop not found on '<FormGroup>' component");
      }
      if (control.props.children === undefined) {
        throw new FormError('FormGroup component needs children with one instance of <FormGroup>, <FormArray>, <FormControl>');
      }
    }

    // formArrayHandler() {}

    // formControlHandler(control) {}
  }, {
    key: "checkControlProps",
    value: function checkControlProps(control) {
      if (control.constructor.name === 'FormControl') {
        if (control.props.controlName === undefined || typeof control.props.controlName !== 'string') {
          throw new FormError("controlName prop not found on '<FormControl>' component");
        }
        if (control.props.updateOn !== undefined) {
          try {
            if (['change', 'blur'].includes(control.props.updateOn.toLowerCase()) === false) {
              throw new FormError('updateOn prop must be either "change" or "blur" ');
            }
          } catch (_unused) {
            throw new FormError('updateOn prop must be either "change" or "blur" ');
          }
        }
        if (control.props.validators) {
          if (Array.isArray(control.props.validators) === false) {
            throw new FormError('validators prop on "<FormControl>" must be of type Array');
          }
          control.props.validators.forEach(function (fn) {
            if (fn instanceof Function === false) {
              throw new FormError('validators must be a function with parameters control and observable');
            }
          });
        }
        if (control.props.children === undefined) {
          throw new FormError('FormControl needs children');
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
    // eslint-disable-next-line react/no-unused-class-component-methods
    _this.errorHandler = new ErrorHandler(_assertThisInitialized(_this));
    Object.defineProperty(_assertThisInitialized(_this), 'statusChanges', {
      value: new BehaviorSubject('VALID'),
      writable: false
    });
    return _this;
  }

  // eslint-disable-next-line react/no-unused-class-component-methods
  _createClass(AbstractControl, [{
    key: "getErrors",
    value: function getErrors() {
      return this.state.errors;
    }

    // eslint-disable-next-line react/no-unused-class-component-methods
  }, {
    key: "getValue",
    value: function getValue() {
      return this.state.value;
    }

    // eslint-disable-next-line react/no-unused-class-component-methods
  }, {
    key: "getStatus",
    value: function getStatus() {
      return this.state.status;
    }
  }, {
    key: "setStateAndView",
    value: function setStateAndView(obj, fn) {
      this.setState(obj, function () {
        // do something to disable the inputs
        fn();
      });
    }

    // eslint-disable-next-line react/no-unused-class-component-methods
  }, {
    key: "invalid",
    get: function get() {
      return this.state.status === 'INVALID';
    }

    // eslint-disable-next-line react/no-unused-class-component-methods
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

    // eslint-disable-next-line react/no-unused-class-component-methods
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

    // eslint-disable-next-line react/sort-comp
  }, {
    key: "isDisabled",
    value: function isDisabled() {
      return this.state.disabled;
    }
  }, {
    key: "calculateStatus",
    value: function calculateStatus() {
      if (this.state.errors) {
        return 'INVALID';
      }
      if (this.anyControlsHaveStatus('INVALID')) {
        return 'INVALID';
      }
      if (this.isDisabled()) {
        return 'DISABLED';
      }
      if (this.anyControlsHaveStatus('PENDING')) {
        return 'PENDING';
      }
      return 'VALID';
    }
  }, {
    key: "anyControlsHaveStatus",
    value: function anyControlsHaveStatus(status) {
      return this.anyControls(function (control) {
        return control.state.status === status;
      });
    }
  }, {
    key: "anyControls",
    value: function anyControls(condition) {
      condition(this);
    }

    // eslint-disable-next-line react/no-unused-class-component-methods
  }, {
    key: "composeAsyncValidators",
    value: function composeAsyncValidators(validators) {
      return validators != null ? this.mergeValidators(validators) : null;
    }
  }, {
    key: "mergeValidators",
    value: function mergeValidators() {
      var _this4 = this;
      var PROPS = this.props;
      return function (control) {
        var ASYNC_OBSERVABLES = PROPS.validators.map(function (validator) {
          return new Observable(function (error$) {
            return validator(control, error$);
          });
        });
        return forkJoin(ASYNC_OBSERVABLES).pipe(map(_this4.mergeErrors));
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
      var STATUS = this.calculateStatus();
      this.setStateAndView({
        status: STATUS
      }, function () {
        _this5.statusChanges.next(STATUS);
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
    value: function runAsyncValidator() {
      var _this7 = this;
      if (this.asyncValidator) {
        this.setStateAndView({
          status: 'PENDING'
        }, function () {
          _this7.asyncSubscription = _this7.asyncValidator(_this7).subscribe(function (errs) {
            _this7.setErrors(errs);
          });
        });
      }
    }

    // eslint-disable-next-line class-methods-use-this
  }, {
    key: "updateValue",
    value: function updateValue() {
      // do nohing as theres no controls to update
    }
  }, {
    key: "setInitialStatusAndErrors",
    value: function setInitialStatusAndErrors(cb) {
      this.setStateAndView({
        status: this.isDisabled() ? 'DISABLED' : 'VALID',
        errors: null
      }, cb);
    }
  }, {
    key: "updateValueAndValidity",
    value: function updateValueAndValidity(options) {
      var _this8 = this;
      this.setInitialStatusAndErrors(function () {
        var STATUS = _this8.calculateStatus();
        var PROPS = _this8.props;
        _this8.updateValue();
        _this8.setStateAndView({
          STATUS: STATUS
        }, function () {
          if (_this8.state.enabled) {
            if (_this8.asyncSubscription) {
              _this8.asyncSubscription.unsubscribe();
            }
            if (_this8.state.status === 'VALID' || _this8.state.status === 'PENDING') {
              _this8.runAsyncValidator(options);
            }
          }
          _this8.valueChanges.next(_this8.state.value);
          _this8.statusChanges.next(_this8.state.status);
          if (PROPS.parent && !options.onlySelf) {
            PROPS.parent.updateValueAndValidity(options);
          }
        });
      });
    }

    // eslint-disable-next-line react/no-unused-class-component-methods
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
      status: 'VALID',
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
            var NEWREF = function NEWREF(element) {
              if (controls[child.props.controlName]) {
                throw new FormError('duplicate controlName');
              }
              // eslint-disable-next-line no-param-reassign
              controls[child.props.controlName] = element;
            };
            if (Object.prototype.hasOwnProperty.call(child.props.children, 'type') === false) {
              return /*#__PURE__*/React.cloneElement(child, {
                ref: NEWREF,
                parent: _this2,
                defaultValue: child.props.defaultValue,
                children: /*#__PURE__*/React.createElement(child.props.children, null)
              });
            }
            return /*#__PURE__*/React.cloneElement(child, {
              ref: NEWREF,
              parent: _this2,
              defaultValue: child.props.defaultValue
            });
          }
          if (child.props.groupName) {
            var _NEWREF = function _NEWREF(element) {
              if (controls[child.props.groupName]) {
                throw new FormError('duplicate groupName');
              }
              // eslint-disable-next-line no-param-reassign
              controls[child.props.groupName] = element;
            };
            return /*#__PURE__*/React.cloneElement(child, {
              parent: _this2,
              ref: _NEWREF
            });
          }
          if (child.props.arrayName) {
            var _NEWREF2 = function _NEWREF2(element) {
              if (controls[child.props.arrayName]) {
                throw new FormError('duplicate arrayName');
              }
              // eslint-disable-next-line no-param-reassign
              controls[child.props.arrayName] = element;
            };
            return /*#__PURE__*/React.cloneElement(child, {
              parent: _this2,
              ref: _NEWREF2
            });
          }
          if (child.props.children && child.props.groupName === undefined && child.props.arrayName === undefined) {
            return /*#__PURE__*/React.cloneElement(child, {
              children: _this2.recurseDom(child.props.children, controls, depth + 1)
            });
          }
        }
        return child;
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
      // may cause issues
      var ENTRIES = Object.entries(this.controls);
      for (var i = 0; i < ENTRIES.length; i++) {
        var CONTROL = ENTRIES[i][1];
        if (condition(CONTROL)) {
          return true;
        }
      }
      return false;
    }
  }, {
    key: "reduceObject",
    value: function reduceObject(object, fn, initValue) {
      if (Array.isArray(initValue) || typeof initValue === 'string') {
        throw new SyntaxError('initial value must be an object!');
      }
      Object.keys(object).forEach(function (key) {
        // eslint-disable-next-line no-param-reassign
        initValue = fn(initValue, object[key], key);
      });
      return initValue;
    }
  }, {
    key: "reduceChildren",
    value: function reduceChildren() {
      var NEW_VALUE = this.reduceObject(this.controls, function (acc, control, key) {
        acc[key] = control.getValue();
        return acc;
      }, {});
      this.setState({
        value: NEW_VALUE
      });
      this.valueChanges.next(NEW_VALUE);
    }
  }, {
    key: "updateValue",
    value: function updateValue() {
      this.reduceChildren();
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;
      return (
        /*#__PURE__*/
        // eslint-disable-next-line react/no-unknown-property
        React.createElement("div", {
          className: "formGroup",
          sx: this.props.sx
        }, React.Children.map(this.clonedChildren, function (child) {
          if (child.props.container) {
            return /*#__PURE__*/React.cloneElement(child, {
              status: _this4.state.status
            });
          }
          return child;
        }))
      );
    }
  }]);
  return FormGroup;
}(AbstractControl);

function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
// import FormError from './FormError.js';
/* @extends React.Component */
var FormArray = /*#__PURE__*/function (_AbstractControl) {
  _inherits(FormArray, _AbstractControl);
  var _super = _createSuper$1(FormArray);
  function FormArray(props) {
    var _this;
    _classCallCheck(this, FormArray);
    _this = _super.call(this, props);
    _this.state = {
      value: [],
      status: 'VALID',
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
      // changing to function
      // eslint-disable-next-line consistent-return
      return React.Children.map(children, function (child) {
        if (child.props) {
          if (child.props.controlName) {
            var NEWREF = function NEWREF(element) {
              // check if control already exists in array.
              controls.push(element);
            };
            // child.props.children.hasOwnProperty('type')
            if (Object.prototype.hasOwnProperty.call(child.props.children, 'type') === false) {
              return /*#__PURE__*/React.cloneElement(child, {
                ref: NEWREF,
                parent: _this2,
                defaultValue: child.props.defaultValue,
                children: /*#__PURE__*/React.createElement(child.props.children, null)
              });
            }
            return /*#__PURE__*/React.cloneElement(child, {
              ref: NEWREF,
              parent: _this2,
              defaultValue: child.props.defaultValue
            });
          }
          if (child.props.groupName) {
            var _NEWREF = function _NEWREF(element) {
              controls.push(element);
            };
            return /*#__PURE__*/React.cloneElement(child, {
              parent: _this2,
              ref: _NEWREF
            });
          }
          if (child.props.arrayName) {
            var _NEWREF2 = function _NEWREF2(element) {
              controls.push(element);
            };
            return /*#__PURE__*/React.cloneElement(child, {
              parent: _this2,
              ref: _NEWREF2
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
      value.forEach(function (controlValue, index) {
        _this3.controls[index].setValue(controlValue);
      });
    }
  }, {
    key: "anyControls",
    value: function anyControls(condition) {
      for (var i = 0; i < this.controls.length; i++) {
        if (condition(this.controls[i])) {
          return true;
        }
      }
      return false;
    }
  }, {
    key: "reduceObject",
    value: function reduceObject(object, fn, initValue) {
      if (Array.isArray(initValue) || typeof initValue === 'string') {
        throw new SyntaxError('initial value must be an object!');
      }
      Object.keys(object).forEach(function (key) {
        // eslint-disable-next-line no-param-reassign
        initValue = fn(initValue, object[key], key);
      });
      return initValue;
    }
  }, {
    key: "reduceChildren",
    value: function reduceChildren() {
      var NEW_VALUE = this.controls.reduce(function (acc, control, index) {
        acc[index] = control.getValue();
        return acc;
      }, []);
      this.setState({
        value: NEW_VALUE
      });
      this.valueChanges.next(NEW_VALUE);
    }
  }, {
    key: "updateValue",
    value: function updateValue() {
      this.reduceChildren();
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;
      return (
        /*#__PURE__*/
        // eslint-disable-next-line react/no-unknown-property
        React.createElement("div", {
          className: "formArray",
          sx: this.props.sx
        }, React.Children.map(this.clonedChildren, function (child) {
          if (child.props.container) {
            return /*#__PURE__*/React.cloneElement(child, {
              status: _this4.state.status
            });
          }
          return child;
        }))
      );
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
      status: 'VALID',
      value: _this.props.defaultValue ? _this.props.defaultValue : '',
      errors: null,
      touched: false,
      dirty: false,
      disabled: _this.props.disabled,
      enabled: !_this.props.disabled
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
      var VALUE = e.target.value;
      if (this.updateOn === 'change') {
        this.setValue(VALUE, {});
      }
      if (this.state.dirty === false) {
        this.setDirty();
      }
    }
  }, {
    key: "onBlur",
    value: function onBlur(e) {
      var VALUE = e.target.value;
      if (this.updateOn === 'blur') {
        this.setValue(VALUE, {});
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
        onChange: this.onChange
      }, React.Children.map(this.props.children, function (child) {
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
      }));
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
        /**
         * n is the number parameter to determine if the control value is a float
         *
         * @param  {number | string} n — A string to convert into a number.
         * @returns {boolean} if n is a float it will return true else it will return false
         */
        function checkFloat(n) {
          return Number(n) === n && n % 1 !== 0;
        }
        if (checkFloat(control.getValue())) {
          obs.next(null);
        } else {
          obs.next({
            invalidFloat: true
          });
        }
      };
    }

    // get isInterger() {

    // }

    // get isShort(){

    // }
    // get isArray(){

    // }

    // get isObject(){

    // }

    /**
     *
     * @returns {Function} This getter fn returns a function to determin if control value is a Boolean
     */
  }, {
    key: "isBoolean",
    get: function get() {
      return function (control, obs) {
        var VALUE = control.getValue().toLowerCase();
        if (VALUE === 'true' || VALUE === 'false') {
          obs.next(null);
        } else {
          obs.next({
            invalidBoolean: true
          });
        }
      };
    }

    /**
     * given a date format this function will match the control value to check if it is a date in the format specified
     *
     * @param {string} format - A date format such as yyyy/mm/d
     * @returns {Function} This fn returns a function to determin if control value is a a Date
     */
  }, {
    key: "isNumber",
    get:
    /**
     *
     * @returns {Function} this fn returns a function to determin if control value is a a Number
     */
    function get() {
      return function (control, obs) {
        try {
          parseInt(control.getValue(), 10);
          obs.next(null);
        } catch (_unused) {
          obs.next({
            invalidNumber: true
          });
        }
      };
    }

    /**
     * @param {string} regex - A string expression
     * @returns {Function} This fn returns a function to determin if control value matches a given regex argument
     */
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

    /**
     * @returns {Function} This fn returns a function to determin if control value is a double
     */
  }, {
    key: "isDouble",
    get: function get() {
      var _this = this;
      return function (control, obs) {
        _this.isNumber(control, obs);
        var REGEX = /^[0-9]*[.]?[0-9]+$/;
        try {
          if (control.getValue().match(REGEX)) {
            obs.next(null);
          } else {
            throw new Error('Not A Double');
          }
        } catch (_unused2) {
          obs.next({
            invalidDouble: true
          });
        }
      };
    }

    /**
     * @param {number} max - A integer
     * @returns {Function} This fn returns a function to determin if control value > than max
     */
  }, {
    key: "max",
    value: function max(_max) {
      return function (control, obs) {
        var VALUE = control.getValue();
        if (VALUE.length > _max) {
          obs.next({
            maxLengthInvalid: true
          });
        } else {
          obs.next(null);
        }
      };
    }

    /**
     * @param {number} min - A integer
     * @returns {Function} This fn returns a function to determin if control value < than min
     */
  }, {
    key: "min",
    value: function min(_min) {
      return function (control, obs) {
        var VALUE = control.getValue();
        if (VALUE.length < _min) {
          obs.next({
            minLengthInvalid: true
          });
        } else {
          obs.next(null);
        }
      };
    }

    /**
     * Checks if control is valid and if there is a value null or if length is 0
     *
     * @returns {Function} This fn returns a function to determin if control value not null or length of 0
     */
  }, {
    key: "required",
    get: function get() {
      return function (control, obs) {
        var VALUE = control.getValue();
        if (typeof VALUE === 'string') {
          if (VALUE.length <= 0) {
            obs.next({
              required: true
            });
          } else {
            obs.next(null);
          }
        } else if (VALUE == null || VALUE === undefined) {
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

export { FormArray, FormControl, FormGroup, Validators };
//# sourceMappingURL=index.js.map
