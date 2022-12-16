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
var ReactDOM = require('react-dom');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _classCallCheck__default = /*#__PURE__*/_interopDefaultLegacy(_classCallCheck);
var _createClass__default = /*#__PURE__*/_interopDefaultLegacy(_createClass);
var _assertThisInitialized__default = /*#__PURE__*/_interopDefaultLegacy(_assertThisInitialized);
var _inherits__default = /*#__PURE__*/_interopDefaultLegacy(_inherits);
var _possibleConstructorReturn__default = /*#__PURE__*/_interopDefaultLegacy(_possibleConstructorReturn);
var _getPrototypeOf__default = /*#__PURE__*/_interopDefaultLegacy(_getPrototypeOf);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);

function _createSuper$3(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$3(); return function _createSuperInternal() { var Super = _getPrototypeOf__default["default"](Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf__default["default"](this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn__default["default"](this, result); }; }

function _isNativeReflectConstruct$3() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var AbstractControl = /*#__PURE__*/function (_React$Component) {
  _inherits__default["default"](AbstractControl, _React$Component);

  var _super = _createSuper$3(AbstractControl);

  function AbstractControl(props) {
    var _this;

    _classCallCheck__default["default"](this, AbstractControl);

    _this = _super.call(this, props);
    Object.defineProperty(_assertThisInitialized__default["default"](_this), 'statusChanges', {
      value: new rxjs.BehaviorSubject("VALID"),
      writable: false
    });
    return _this;
  }

  _createClass__default["default"](AbstractControl, [{
    key: "setView",
    value: function setView() {
      // see if the dom node can handle event listener blur or other things
      if (!this.controlHasProps) {
        // components need to use value prop
        var FORM_CONTROL = ReactDOM__default["default"].findDOMNode(this.ref.current); //find closest Input or target attr

        var TEXTAREA_NODE = FORM_CONTROL.querySelectorAll("textarea")[0];
        var INPUT_NODE = FORM_CONTROL.querySelectorAll("input")[0];
        var TARGET_NODE = FORM_CONTROL.querySelectorAll('[id="target"]')[0]; //set the values

        var STATUS_NODE = FORM_CONTROL.querySelectorAll('[id="form-status"]')[0];

        if (STATUS_NODE !== undefined) {
          STATUS_NODE.innerText = this.state.status;
        }

        if (TARGET_NODE) {
          TARGET_NODE.value = this.state.value; // this.forceUpdate();

          return;
        }

        if (TEXTAREA_NODE) {
          TEXTAREA_NODE.value = this.state.value; // this.forceUpdate();

          return;
        }

        if (INPUT_NODE) {
          INPUT_NODE.value = this.state.value; // this.forceUpdate();

          return;
        }
      }
    }
  }, {
    key: "getErrors",
    value: function getErrors() {
      return this.state.errors;
    }
  }, {
    key: "getValue",
    value: function getValue() {
      var frozenObjectValue = Object.assign({}, this.state.value);
      return Object.defineProperty({}, 'value', {
        value: frozenObjectValue,
        writable: false
      });
    }
  }, {
    key: "getStatus",
    value: function getStatus() {
      return this.state.status;
    }
  }, {
    key: "setStateAndView",
    value: function setStateAndView(obj, fn) {
      var _this2 = this;

      this.setState(obj, function () {
        //setView first  then run callback
        _this2.setView();

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
      var _this3 = this;

      this.setStateAndView({
        touched: true
      }, function () {
        if (_this3.parent && !options.onlySelf) {
          _this3.parent.setTouched(options);
        }
      });
    }
  }, {
    key: "setDirty",
    value: function setDirty(value, options) {
      var _this4 = this;

      this.setStateAndView({
        dirty: true
      }, function () {
        if (_this4.parent && !options.onlySelf) {
          _this4.parent.setDirty(options);
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
      var _this5 = this;

      return function (control) {
        var asyncObservables = _this5.props.validators.map(function (validator) {
          return new rxjs.Observable(function (error$) {
            validator(control, error$);
          }).pipe(rxjs.take(1));
        });

        return rxjs.forkJoin(asyncObservables).pipe(rxjs.map(_this5.mergeErrors));
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
      var _this6 = this;

      var status = this.calculateStatus();
      this.setStateAndView({
        status: status
      }, function () {
        _this6.statusChanges.next(status);

        if (_this6.parent) {
          _this6.parent.updateControlsErrors();
        }
      });
    } //this.forceupdate instead of using state and pass in the static values

  }, {
    key: "setErrors",
    value: function setErrors(errorObject) {
      var _this7 = this;

      this.setStateAndView({
        errors: errorObject
      }, function () {
        _this7.updateControlsErrors();
      });
    }
  }, {
    key: "runAsyncValidator",
    value: function runAsyncValidator(options) {
      var _this8 = this;

      if (this.asyncValidator) {
        this.setStateAndView({
          status: "PENDING"
        }, function () {
          _this8.asyncSubscription = _this8.asyncValidator(_this8).subscribe(function (errs) {
            _this8.setErrors(errs);
          });
        });
      }
    }
  }, {
    key: "updateValue",
    value: function updateValue() {// do nohing as theres no controls to update
      //if emit is false then dont update state.s
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
      var _this9 = this;

      this.setInitialStatusAndErrors(function () {
        var status = _this9.calculateStatus();

        _this9.updateValue();

        _this9.setStateAndView({
          status: status
        }, function () {
          if (_this9.state.enabled) {
            if (_this9.asyncSubscription) {
              _this9.asyncSubscription.unsubscribe();
            }

            if (_this9.state.status === "VALID" || _this9.state.status === "PENDING") {
              _this9.runAsyncValidator(options);
            }
          }

          _this9.valueChanges.next(_this9.state.value);

          _this9.statusChanges.next(_this9.state.status);

          if (_this9.parent && !options.onlySelf) {
            _this9.parent.updateValueAndValidity(options);
          }
        });
      });
    }
  }, {
    key: "setValue",
    value: function setValue(value, options) {
      var _this10 = this;

      this.setStateAndView({
        value: value
      }, function () {
        _this10.setView();

        _this10.updateValueAndValidity(options);
      });
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
    Object.defineProperty(_assertThisInitialized__default["default"](_this), 'valueChanges', {
      value: new rxjs.BehaviorSubject({}),
      writable: false
    });
    _this.reduceChildren = _this.reduceChildren.bind(_assertThisInitialized__default["default"](_this));

    var returnMapChildren = function returnMapChildren(children) {
      return React__default["default"].Children.map(children, function (child) {
        console.log('child in grouo', child);

        if (child.props.fieldName) {
          if (child.props.children.hasOwnProperty('type') === false) {
            console.log('reset child');
            child = /*#__PURE__*/React__default["default"].cloneElement(child, {
              children: /*#__PURE__*/React__default["default"].createElement(child.props.children, null)
            });
          }

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
          if (child.props.container) {
            return /*#__PURE__*/React__default["default"].cloneElement(child, {
              children: returnMapChildren(child.props.children)
            });
          }

          return /*#__PURE__*/React__default["default"].cloneElement(child, {});
        }
      });
    };

    Object.defineProperty(_assertThisInitialized__default["default"](_this), 'clonedChildren', {
      value: returnMapChildren(_this.props.children),
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
    key: "reduceChildren",
    value: function reduceChildren() {
      var newValue = Object.reduce(this.controls, function (acc, control, key) {
        acc[key] = control.state.getValue();
        return acc;
      }, "non");
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
      var _this3 = this;

      return /*#__PURE__*/React__default["default"].createElement("div", {
        className: "formGroup"
      }, /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, React__default["default"].Children.map(this.clonedChildren, function (child) {
        if (child.props.container) {
          return /*#__PURE__*/React__default["default"].cloneElement(child, {
            status: _this3.state.status
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
    var initValue = '';

    if (_this.props.leaveAsNullWhenEmpty) {
      initValue = null;
    }

    _this.state = {
      status: "VALID",
      value: _this.props.defaultValue ? _this.props.defaultValue : initValue,
      errors: null,
      touched: false,
      dirty: false,
      disabled: _this.props.disabled ? true : false,
      enabled: _this.props.disabled ? false : true
    };
    _this.leaveAsNullWhenEmpty = _this.props.leaveAsNullWhenEmpty ? true : false;
    Object.defineProperty(_assertThisInitialized__default["default"](_this), 'fieldName', {
      value: _this.props.fieldName,
      writable: false
    });
    Object.defineProperty(_assertThisInitialized__default["default"](_this), 'valueChanges', {
      value: new rxjs.BehaviorSubject(_this.props.defaultValue !== undefined ? _this.props.defaultValue : null),
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
    _this.asyncValidator = _this.props.validators ? _this.composeAsyncValidators(_this.props.validators) : null;
    _this.asyncSubscription = null;
    _this.ref = /*#__PURE__*/React__default["default"].createRef();
    _this.controlHasProps = typeof _this.props.children.type !== "string";
    return _this;
  }

  _createClass__default["default"](FormControl, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setValue(this.state.value);
    }
  }, {
    key: "onChange",
    value: function onChange(e) {
      var value = e.target.value;

      if (this.updateOn === "change") {
        if (this.leaveAsNullWhenEmpty) ;

        if (this.allowTypeBoolean) {
          if (value.toLowerCase() === "true") {
            value = true;
          }

          if (value.toLowerCase() === "false") {
            value = false;
          }
        }

        this.setValue(value);
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

        if (this.leaveAsNullWhenEmpty) ;

        if (this.allowTypeBoolean) {
          if (value.toLowerCase() === "true") {
            value = true;
          }

          if (value.toLowerCase() === "false") {
            value = false;
          }
        }

        this.setValue(value);
      }

      if (this.state.touched === false) {
        this.setTouched();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return /*#__PURE__*/React__default["default"].createElement("div", {
        className: "formControl",
        ref: this.ref,
        style: this.props.sx,
        onBlur: this.onBlur,
        onChange: this.onChange,
        touched: this.state.touched.toString(),
        dirty: this.state.dirty.toString()
      }, /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, React__default["default"].Children.map(this.props.children, function (child) {
        // console.log('child',child)
        if (typeof child.type === "string") {
          return /*#__PURE__*/React__default["default"].cloneElement(child, {});
        } else {
          return /*#__PURE__*/React__default["default"].cloneElement(child, {
            invalid: _this2.invalid,
            dirty: _this2.state.dirty,
            value: _this2.state.value,
            errors: _this2.state.errors,
            getStatus: _this2.getStatus,
            touched: _this2.state.touched,
            status: _this2.state.status,
            setValue: _this2.setValue
          });
        }
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

Object.reduce = function reduce(object, fn, initValue) {
  if (Array.isArray(initValue) || typeof initValue === "string") {
    throw new SyntaxError("initial value must be an object!");
  }

  Object.keys(object).forEach(function (key) {
    initValue = fn(initValue, object[key], key);
  });
  return initValue;
};

exports.FormArray = FormArray;
exports.FormControl = FormControl;
exports.FormGroup = FormGroup;
exports.Validators = Validators;
