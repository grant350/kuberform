"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _FormGroup = _interopRequireDefault(require("./FormGroup.js"));

var _DefaultContainer = _interopRequireDefault(require("./components/DefaultContainer.js"));

var _rxjs = require("rxjs");

var _react = _interopRequireDefault(require("react"));

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

var FormArray = /*#__PURE__*/function (_React$Component) {
  _inherits(FormArray, _React$Component);

  var _super = _createSuper(FormArray);

  function FormArray(props) {
    var _this;

    _classCallCheck(this, FormArray);

    _this = _super.call(this, props);
    _this.name = _this.props.name;
    _this.type = "formArray";
    _this.controls = _this.props.formArray !== undefined ? _this.props.formArray : [];
    _this.pending = false;
    _this.invalid = false;
    _this.value = [];
    _this.valid = true;
    _this.disabled = false;
    _this.htmlContainer = _this.props.htmlContainer !== undefined ? _this.props.htmlContainer : _DefaultContainer["default"];
    _this.errors = [];
    _this.status = 'VALID';
    _this.containerClass = _this.props.containerClass !== undefined ? _this.props.containerClass : 'defaultContainer'; // this.subscribeChanges = this.subscribeChanges.bind(this)

    _this.addGroup = _this.addGroup.bind(_assertThisInitialized(_this));
    _this.state = {
      controls: _this.controls,
      status: _this.status,
      value: _this.value
    };
    return _this;
  } // subscribeChanges(){
  //   var that = this;
  //   var statuses = [];
  //     Observable.create(function(obs) {
  //     that.controls.forEach(control=>{
  //       if ( control.type !== 'formGroup' && control.type !== 'formArray'){
  //         control.VALIDATE(control.value, function(){
  //           control.valueChanges().subscribe(value=>{
  //             control.value = value
  //             that.value.push(value)
  //           }).unsubscribe()
  //           control.statusChanges().subscribe(status=>{
  //             statuses.push(status)
  //           }).unsubscribe()
  //         })
  //       }
  //       });
  //       if (statuses.includes('INVALID')){
  //         obs.next('INVALID')
  //       } else if (statuses.includes('PENDING')){
  //         obs.next('PENDING')
  //       } else {
  //         obs.next('VALID')
  //       }
  //     }).subscribe(status=>{
  //       that.status = status
  //     })
  // }


  _createClass(FormArray, [{
    key: "editGroup",
    value: function editGroup(id) {}
  }, {
    key: "deleteGroup",
    value: function deleteGroup(id) {}
  }, {
    key: "addGroup",
    value: function addGroup(group) {
      this.controls.push(group);
      console.log(this.value);
    }
  }, {
    key: "render",
    value: function render() {
      function makeContainer(obj) {
        var objcontrols = obj.controls;

        if (!Array.isArray(obj.controls)) {
          objcontrols = Object.keys(obj.controls).map(function (key) {
            return obj.controls[key];
          });
        }

        var container = obj.htmlContainer;
        var controls = [];
        objcontrols.forEach(function (control) {
          if (control.htmlContainer) {
            controls.push(makeContainer(control));
          } else {
            controls.push( /*#__PURE__*/_react["default"].createElement("control", {
              value: control.value,
              name: control.name,
              state: control.state,
              validator: control.validator,
              html: control.html
            }));
          }
        });

        if (container !== undefined) {
          return container(controls, obj.type);
        } else {
          console.log('no container');
        }
      }

      var html = makeContainer(this);
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "formArray"
      }, html);
    }
  }]);

  return FormArray;
}(_react["default"].Component);

;
var _default = FormArray;
exports["default"] = _default;