import _classCallCheck from '@babel/runtime/helpers/classCallCheck';
import _createClass from '@babel/runtime/helpers/createClass';
import _inherits from '@babel/runtime/helpers/inherits';
import _possibleConstructorReturn from '@babel/runtime/helpers/possibleConstructorReturn';
import _getPrototypeOf from '@babel/runtime/helpers/getPrototypeOf';
import React from 'react';
import { TextField } from '@mui/material';
import _assertThisInitialized from '@babel/runtime/helpers/assertThisInitialized';
import { BehaviorSubject } from 'rxjs';

function _createSuper$4(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$4(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$4() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var Container = /*#__PURE__*/function (_React$Component) {
  _inherits(Container, _React$Component);

  var _super = _createSuper$4(Container);

  function Container(props) {
    _classCallCheck(this, Container);

    return _super.call(this, props);
  }

  _createClass(Container, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", {
        className: "container",
        style: {
          width: "100%",
          height: "auto",
          position: "relative",
          "left": "20px"
        }
      }, this.props.children.map(function (item) {
        return item;
      }));
    }
  }]);

  return Container;
}(React.Component);

function _createSuper$3(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$3(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$3() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var Input = /*#__PURE__*/function (_React$Component) {
  _inherits(Input, _React$Component);

  var _super = _createSuper$3(Input);

  function Input(props) {
    _classCallCheck(this, Input);

    return _super.call(this, props);
  }

  _createClass(Input, [{
    key: "render",
    value: function render() {
      var _this = this;

      return /*#__PURE__*/React.createElement("div", {
        className: "input",
        style: {
          position: "relative",
          left: this.props.tabOver ? this.props.tabOver.toString() + "px" : "0px"
        }
      }, /*#__PURE__*/React.createElement("label", {
        style: {
          display: "block",
          width: "100%",
          position: "relative",
          margin: "5px"
        }
      }, " ", this.props.labelName), /*#__PURE__*/React.createElement(TextField, {
        size: "small",
        onChange: function onChange(e) {
          _this.props.update(e.target.value);
        },
        value: this.props.value,
        label: this.props.label ? this.props.label : "type here",
        error: this.props.error ? this.props.error : false,
        required: this.props.required ? this.props.required : false,
        disabled: this.props.disabled ? this.props.disabled : false,
        helperText: this.props.helperText ? this.props.helperText : "",
        InputProps: {
          style: {
            fontSize: this.props.InputProps ? this.props.InputProp : 10
          }
        },
        InputLabelProps: {
          style: {
            fontSize: this.props.InputLabelProps ? this.props.InputLabelProps : 12
          }
        },
        style: {
          background: 'white',
          "borderLeft": "20px solid " + this.props.border,
          "borderRadius": "10px",
          width: this.props.width !== undefined ? this.props.width.toString() + "px" : "100px"
        },
        id: "filled-basic",
        variant: "filled"
      }));
    }
  }]);

  return Input;
}(React.Component);

function _createSuper$2(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$2(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var FormControl = /*#__PURE__*/function (_React$Component) {
  _inherits(FormControl, _React$Component);

  var _super = _createSuper$2(FormControl);

  function FormControl(props) {
    var _this;

    _classCallCheck(this, FormControl);

    _this = _super.call(this, props);
    _this.name = _this.props.name;
    _this.type = "formControl";
    _this.validator = _this.props.validator;
    _this.required = props.required;
    _this.update = _this.update.bind(_assertThisInitialized(_this));
    _this.statusToColor = _this.statusToColor.bind(_assertThisInitialized(_this));
    _this.value = _this.props.value ? _this.props.value : null;
    _this.status = _this.props.status ? _this.props.status : "VALID"; // this.subject$ = new BehaviorSubject({value:this.props.value, status:this.props.status});
    // this.subject$.next =  this.subject$.next.bind(this.subject$);
    // this.changes = this.changes.bind(this);
    // this.VALIDATE = this.VALIDATE.bind(this);

    return _this;
  }

  _createClass(FormControl, [{
    key: "componentDidMount",
    value: function componentDidMount() {// this.props.VALIDATE(this.name,this.props.index,this.props.value,this.props.validator);
    }
  }, {
    key: "statusToColor",
    value: function statusToColor() {
      if (this.props.status === "INVALID") {
        return "#cb1842";
      } else if (this.props.status === "PENDING") {
        return "#f2da33";
      } else {
        return "#36bc78";
      }
    }
  }, {
    key: "update",
    value: function update(value) {
      this.props.VALIDATE(this.name, this.props.index, value, this.props.validator);
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", {
        className: "formControl"
      }, /*#__PURE__*/React.createElement(this.props.JSXElement, {
        update: this.update,
        border: this.statusToColor(),
        name: this.props.name,
        value: this.props.value,
        status: this.props.status
      }));
    }
  }]);

  return FormControl;
}(React.Component);

function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var FormArray = /*#__PURE__*/function (_React$Component) {
  _inherits(FormArray, _React$Component);

  var _super = _createSuper$1(FormArray);

  function FormArray(props) {
    var _this;

    _classCallCheck(this, FormArray);

    _this = _super.call(this, props);
    _this.type = "formArray";
    _this.name = _this.props.name;
    _this.state = {
      value: _this.props.value ? _this.props.value : [],
      status: _this.props.status ? _this.props.status : "VALID",
      ctls: _this.props.controls,
      statuses: [],
      color: "#36bc78"
    }; //setting the value types

    _this.setControlType = _this.setControlType.bind(_assertThisInitialized(_this));

    _this.setControlType(); //children


    _this.makeChildren = _this.makeChildren.bind(_assertThisInitialized(_this));
    _this.addChild = _this.addChild.bind(_assertThisInitialized(_this));
    _this.removeChild = _this.removeChild.bind(_assertThisInitialized(_this));
    _this.resetControl = _this.resetControl.bind(_assertThisInitialized(_this)); // rxjs

    _this.subject$ = new BehaviorSubject(null);
    _this.VALIDATE = _this.VALIDATE.bind(_assertThisInitialized(_this)); // a copy of control to add controls to array

    _this.copy = Object.assign({}, _this.props.controls.slice(0, 1)[0]); //this function return the color type for validity

    _this.statusToColor = _this.statusToColor.bind(_assertThisInitialized(_this));
    return _this;
  } //last but not least is to change value from [] to put in controls.


  _createClass(FormArray, [{
    key: "setControlType",
    value: function setControlType() {
      var _this2 = this;

      this.props.controls.forEach(function (control, index) {
        var empty = '';

        if (control.type === "formArray") {
          empty = [];
        } else if (control.type === "formGroup") {
          empty = {};
        }

        _this2.state.value[index] = control.value ? control.value : empty;
        _this2.state.statuses[index] = control.status ? control.status : 'VALID';
      });
    }
  }, {
    key: "VALIDATE",
    value: function VALIDATE(name, index, value, validator) {
      var _this3 = this;

      this.index = index;
      this.state.value[index] = value;
      this.setState({
        value: this.state.value
      }, function () {
        _this3.subject$.next(null);

        if (validator !== null && validator !== undefined) {
          validator(value, _this3.subject$);
        } else {
          _this3.subject$.next(true);
        }
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this4 = this;

      this.subject$.next(true);
      this.subject$.subscribe(function (res) {
        console.log('in subscriber', res);
        var status;

        switch (res) {
          case null:
            status = 'PENDING';
            break;

          case false:
            status = 'INVALID';
            break;

          default:
            status = 'VALID';
        }

        _this4.state.statuses[_this4.index] = status;
        var parentStatus;

        if (_this4.state.statuses.includes('INVALID')) {
          parentStatus = 'INVALID';
        } else if (Object.values(_this4.state.statuses).includes('PENDING')) {
          parentStatus = 'PENDING';
        } else {
          parentStatus = 'VALID';
        }

        var color = _this4.statusToColor(parentStatus);

        console.log('fA color', color);
        console.log('fA status', status);

        _this4.setState({
          color: color,
          status: status
        }, function () {
          console.log('fA', this.state);

          if (this.props.VALIDATE) ;
        });
      });
    }
  }, {
    key: "resetControl",
    value: function resetControl(control, keepcontrols) {
      var removeValues = function removeValues(control) {
        control = Object.assign({}, control);

        if (control.type == "formArray") {
          if (!keepcontrols || keepcontrols === undefined) {
            control.controls = control.controls.slice(0, 1).map(function (ctl, index) {
              return removeValues(ctl);
            });
          } else {
            control.controls = control.controls.slice(0).map(function (ctl, index) {
              return removeValues(ctl);
            });
          }
        } else if (control.type == "formGroup") {
          Object.keys(control.controls).forEach(function (key) {
            var ctl = control.controls[key];
            control.controls[key] = removeValues(ctl);
          });
        } else if (control.type === "formControl") {
          if (control.keepvalue) ; else {
            control.value = undefined;
          }
        }

        return control;
      };

      var result = removeValues(control);
      return result;
    }
  }, {
    key: "makeChildren",
    value: function makeChildren(ctls) {
      var _this5 = this;

      return ctls.map(function (child, index) {
        if (child.type === 'formControl') {
          if (child.JSXElement === undefined) {
            child.JSXElement = Input;
          }

          console.log(child.validator);
          return /*#__PURE__*/React.createElement(FormControl, {
            validator: child.validator,
            VALIDATE: _this5.VALIDATE,
            index: index,
            JSXElement: child.JSXElement,
            name: child.name,
            key: index,
            value: _this5.state.value[index],
            status: _this5.state.statuses[index]
          });
        }

        if (child.type === 'formArray') {
          if (child.JSXContainer === undefined) {
            child.JSXContainer = Container;
          }

          return /*#__PURE__*/React.createElement(FormArray, {
            index: index,
            VALIDATE: _this5.VALIDATE,
            value: _this5.state.value[index],
            name: child.name,
            key: index,
            JSXContainer: child.JSXContainer,
            controls: child.controls
          });
        }

        if (child.type === 'formGroup') {
          if (child.JSXContainer === undefined) {
            child.JSXContainer = Container;
          }

          return /*#__PURE__*/React.createElement(FormGroup$1, {
            index: index,
            VALIDATE: _this5.VALIDATE,
            value: _this5.state.value[index],
            name: child.name,
            key: index,
            controls: child.controls,
            JSXContainer: child.JSXContainer
          });
        }
      });
    }
  }, {
    key: "addChild",
    value: function addChild() {
      this.state.ctls.push(this.resetControl(this.copy));
      this.setState({
        ctls: this.state.ctls
      });
    }
  }, {
    key: "statusToColor",
    value: function statusToColor(status) {
      if (status === "VALID") {
        return "#36bc78";
      } else if (status === "PENDING") {
        return "#f2da33";
      } else {
        return "#cb1842";
      }
    }
  }, {
    key: "removeChild",
    value: function removeChild(index) {
      if (index === undefined) {
        index == this.state.ctls.lenght - 1;
      }

      if (this.state.ctls.length > 0) {
        this.state.ctls.splice(index, 1);
        this.setState({
          ctls: this.state.ctls
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
        className: "formArray",
        style: {
          "borderLeft": "10px solid " + this.state.color
        }
      }, /*#__PURE__*/React.createElement(this.props.JSXContainer, {
        children: this.makeChildren(this.state.ctls)
      })), /*#__PURE__*/React.createElement("button", {
        onClick: this.addChild
      }, " addChild"), /*#__PURE__*/React.createElement("button", {
        onClick: this.removeChild
      }, " removeChild"));
    }
  }]);

  return FormArray;
}(React.Component);

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var FormGroup = /*#__PURE__*/function (_React$Component) {
  _inherits(FormGroup, _React$Component);

  var _super = _createSuper(FormGroup);

  // Cannot create property 'firstname' on string 'a'
  // _this2.state.value[key] = value;
  function FormGroup(props) {
    var _this;

    _classCallCheck(this, FormGroup);

    _this = _super.call(this, props);
    _this.type = "formGroup";
    _this.name = _this.props.name;
    _this.state = {
      value: _this.props.value ? _this.props.value : {},
      status: _this.props.status ? _this.props.status : "VALID",
      ctls: _this.props.controls,
      statuses: {},
      color: "#36bc78"
    };
    Object.keys(_this.props.controls).forEach(function (k) {
      var empty = '';

      if (_this.props.controls[k].type === "formArray") {
        empty = [];
      } else if (_this.props.controls[k].type === "formGroup") {
        empty = {};
      }

      _this.state.value[k] = _this.props.controls[k].value ? _this.props.controls[k].value : empty;
    }); // this.subscribeChanges = this.subscribeChanges.bind(this);

    _this.makeChildren = _this.makeChildren.bind(_assertThisInitialized(_this)); // this.makeChildren();

    _this.submit = _this.props.submit ? _this.props.submit : null;
    _this.getData = _this.getData.bind(_assertThisInitialized(_this)); // this.checkStatusControls = this.checkStatusControls.bind(this);

    _this.statusToColor = _this.statusToColor.bind(_assertThisInitialized(_this));
    _this.VALIDATE = _this.VALIDATE.bind(_assertThisInitialized(_this));
    _this.subject$ = new BehaviorSubject(null);
    return _this;
  }

  _createClass(FormGroup, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.subject$.next(true);
      this.subject$.subscribe(function (res) {
        var status;

        switch (res) {
          case null:
            status = 'PENDING';
            break;

          case false:
            status = 'INVALID';
            break;

          default:
            status = 'VALID';
        }

        _this2.state.statuses[_this2.index] = status;
        var parentStatus;

        if (Object.values(_this2.state.statuses).includes('INVALID')) {
          parentStatus = 'INVALID';
        } else if (Object.values(_this2.state.statuses).includes('PENDING')) {
          parentStatus = 'PENDING';
        } else {
          parentStatus = 'VALID';
        }

        var color = _this2.statusToColor(parentStatus);

        console.log('fg color', color);
        console.log('fg status', status);

        _this2.setState({
          color: color,
          value: _this2.state.value,
          status: status
        }, function () {
          console.log('fg', this.state);

          if (this.props.VALIDATE) ;
        });
      });
    }
  }, {
    key: "VALIDATE",
    value: function VALIDATE(name, index, value, validator) {
      var _this3 = this;

      this.index = name;
      this.state.value[name] = value;
      this.setState({
        value: this.state.value
      }, function () {
        _this3.subject$.next(null);

        if (validator !== null && validator !== undefined) {
          validator(value, _this3.subject$);
        } else {
          _this3.subject$.next(true);
        }
      });
    }
  }, {
    key: "setParent",
    value: function setParent(key, value) {//key = value
      //set state
    }
  }, {
    key: "makeChildren",
    value: function makeChildren(ctls) {
      var _this4 = this;

      return Object.keys(ctls).map(function (key, index) {
        var child = ctls[key];

        if (child.type === 'formControl') {
          if (child.JSXElement === undefined) {
            child.JSXElement = Input;
          }

          return /*#__PURE__*/React.createElement(FormControl, {
            validator: child.validator,
            parent: _this4,
            VALIDATE: _this4.VALIDATE,
            index: index,
            JSXElement: child.JSXElement,
            name: key,
            value: _this4.state.value[key],
            status: _this4.state.statuses[key],
            key: key
          });
        }

        if (child.type === 'formArray') {
          if (child.JSXContainer === undefined) {
            child.JSXContainer = Container;
          }

          return /*#__PURE__*/React.createElement(FormArray, {
            parent: _this4,
            VALIDATE: _this4.VALIDATE,
            value: _this4.state.value[key],
            name: key,
            key: key,
            index: index,
            JSXContainer: child.JSXContainer,
            controls: child.controls
          });
        }

        if (child.type === 'formGroup') {
          if (child.JSXContainer === undefined) {
            child.JSXContainer = Container;
          }

          return /*#__PURE__*/React.createElement(FormGroup, {
            parent: _this4,
            VALIDATE: _this4.VALIDATE,
            value: _this4.state.value[key],
            index: index,
            name: key,
            controls: child.controls,
            JSXContainer: child.JSXContainer,
            key: key
          });
        }
      });
    }
  }, {
    key: "getData",
    value: function getData(e) {
      return this.state.value;
    }
  }, {
    key: "statusToColor",
    value: function statusToColor(status) {
      if (status === "VALID") {
        return "#36bc78";
      } else if (status === "PENDING") {
        return "#f2da33";
      } else {
        return "#cb1842";
      }
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
        className: "formGroup",
        style: {
          "borderLeft": "10px solid " + this.state.color
        }
      }, /*#__PURE__*/React.createElement(this.props.JSXContainer, {
        children: this.makeChildren(this.state.ctls)
      })), this.submit ? /*#__PURE__*/React.createElement(this.submit, {
        getData: this.getData
      }) : null);
    }
  }]);

  return FormGroup;
}(React.Component);
var FormGroup$1 = FormGroup;

export { Container, FormArray, FormControl, FormGroup$1 as FormGroup, Input };
