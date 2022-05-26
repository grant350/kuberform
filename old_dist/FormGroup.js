"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _FormControl = _interopRequireDefault(require("./FormControl.js"));

var _FormArray = _interopRequireDefault(require("./FormArray.js"));

var _DefaultContainer = _interopRequireDefault(require("./components/DefaultContainer.js"));

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

var FormGroup = /*#__PURE__*/function (_React$Component) {
  _inherits(FormGroup, _React$Component);

  var _super = _createSuper(FormGroup);

  function FormGroup(props) {
    var _this;

    _classCallCheck(this, FormGroup);

    _this = _super.call(this, props);
    _this.controls = {};
    _this.name = _this.props.name !== undefined && _this.props.name !== null ? _this.props.name : 'mainformgroup';
    _this.type = "formGroup";
    _this.htmlContainer = _this.props.htmlContainer !== undefined && _this.props.htmlContainer !== null ? _this.props.htmlContainer : _DefaultContainer["default"];
    _this.disabled = false;
    _this.containerClass = _this.props.containerClass !== undefined ? _this.props.containerClass : 'defaultContainer';
    _this.makeControls = _this.makeControls.bind(_assertThisInitialized(_this));
    _this.subscribeChanges = _this.subscribeChanges.bind(_assertThisInitialized(_this));
    _this.state = {
      controls: _this.controls,
      errors: [],
      status: 'VALID',
      value: {}
    };
    _this.updateState = _this.updateState.bind(_assertThisInitialized(_this)); // this.makeControls();
    // function makeContainer(obj){
    //   var objcontrols = obj.controls;
    //   if (!Array.isArray(obj.controls)){
    //     objcontrols = Object.keys(obj.controls).map(key=>{return Object.assign(obj.controls[key],{name:key})});
    //   }
    //   // console.log('objcontrols',objcontrols)
    //   var container = obj.htmlContainer;
    //   var controls = [];
    //   objcontrols.forEach(control=>{
    //         if (control.type === 'formGroup' || control.type === 'formArray'){
    //           controls.push(makeContainer(control))
    //         } else {
    //           controls.push(<control value={control.value} name={control.name} state={control.state} validator={control.validator} html={control.html} />)
    //         }
    //     })
    //     if (container !== undefined && container !==  null){
    //       return container(controls,obj.type);
    //     } else {
    //       console.log('no container')
    //     }
    // }
    // this.html = makeContainer(this);

    return _this;
  }

  _createClass(FormGroup, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // this will go to async when finished its either invalid| valid
      console.log('called did mount'); //  console.log('html',this.html.props.children[2].props.children.props.children[0].props)

      this.subscribeChanges();
    }
  }, {
    key: "subscribeChanges",
    value: function subscribeChanges() {
      var _this2 = this;

      //this is asnch so it will place status as pending so looks all good. glad it works
      var tmpstate = {};

      _rxjs.Observable.create(function (obs) {
        var statuses = [];
        Object.keys(_this2.state.controls).forEach(function (k) {
          if (_this2.state.controls[k].type !== 'formGroup' && _this2.state.controls[k].type !== 'formArray') {
            _this2.state.controls[k].VALIDATE(_this2.state.controls[k].state.value, function (status, value) {
              statuses.push(status);
              tmpstate[k] = value;
            });
          }
        });

        if (statuses.includes('INVALID')) {
          obs.next('INVALID');
        } else if (statuses.includes('PENDING')) {
          obs.next('PENDING');
        } else {
          obs.next('VALID');
        }
      }).subscribe(function (status) {
        console.log('setting state');

        _this2.setState({
          status: status,
          value: tmpstate
        });

        tmpstate = {};
      }); //store statuss in map object turn to array to check but change only one at a time not run this entire thing every time

    }
  }, {
    key: "formControl",
    value: function formControl(obj) {
      var setStatus;
      var validator;
      var showStatus;

      if (obj.showStatus) {
        showStatus = obj.showStatus;
      }

      if (obj.validator) {
        validator = obj.validator;
      } // console.log(obj)


      return new _FormControl["default"]({
        'name': obj.name,
        'value': obj.value,
        'html': obj.html,
        'validator': validator
      });
    }
  }, {
    key: "formArray",
    value: function formArray(obj) {
      var _this3 = this;

      var items = [];
      obj.controls.forEach(function (item) {
        if (item.type === 'formControl') {
          items.push(_this3.formControl(item));
        } else if (item.type === 'formArray') {
          items.push(_this3.formArray(item));
        } else if (item.type === 'formGroup') {
          items.push(_this3.formGroup(item, {}));
        }
      });
      return new _FormArray["default"]({
        'name': obj.name,
        'formArray': items,
        'htmlContainer': obj.htmlContainer,
        'containerClass': obj.containerClass
      });
    }
  }, {
    key: "formGroup",
    value: function formGroup(obj, formobject) {
      var _this4 = this;

      // console.log('obj',obj)
      if (obj.controls) {
        Object.keys(obj.controls).forEach(function (key) {
          console.log('key', key);
          var item = obj.controls[key];

          if (item.type === 'formControl') {
            formobject[key] = _this4.formControl(item);
          } else if (item.type === 'formArray') {
            formobject[key] = _this4.formArray(item);
          } else if (item.type === 'formGroup') {
            formobject[key] = _this4.formGroup(item, {});
          }
        });
      }

      console.log('formObject', formobject);
      var fg = new FormGroup({
        'name': obj.name,
        'formObject': formobject,
        'htmlContainer': obj.htmlContainer,
        'containerClass': obj.containerClass
      });
      return fg;
    }
  }, {
    key: "updateState",
    value: function updateState(cb) {
      this.setState({
        status: 'INVALID'
      }, function () {
        cb(this.state);
      });
    }
  }, {
    key: "makeControls",
    value: function makeControls() {
      var formObject = this.props.formObject;

      if (formObject) {
        return this.formGroup({
          'controls': formObject
        }, {});
      } else {
        throw new Error('no form object provided');
      }

      console.log('controls', this.controls);
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "formGroup"
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: "update",
        onClick: this.updateState
      }, " "), this.html);
    }
  }]);

  return FormGroup;
}(_react["default"].Component);

;
var _default = FormGroup;
exports["default"] = _default;