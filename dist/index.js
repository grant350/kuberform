import _classCallCheck from '@babel/runtime/helpers/classCallCheck';
import _createClass from '@babel/runtime/helpers/createClass';
import _inherits from '@babel/runtime/helpers/inherits';
import _possibleConstructorReturn from '@babel/runtime/helpers/possibleConstructorReturn';
import _getPrototypeOf from '@babel/runtime/helpers/getPrototypeOf';
import React from 'react';
import { TextField } from '@mui/material';
import _assertThisInitialized from '@babel/runtime/helpers/assertThisInitialized';

function _createSuper$4(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$4(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$4() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var Container = /*#__PURE__*/function (_React$Component) {
  _inherits(Container, _React$Component);

  var _super = _createSuper$4(Container);

  function Container(props) {
    var _this;

    _classCallCheck(this, Container);

    _this = _super.call(this, props);
    console.log(_this.props);
    return _this;
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
          _this.props.update(_this.props.name, e.target.value);
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
    _this.update = _this.update.bind(_assertThisInitialized(_this));
    _this.statusToColor = _this.statusToColor.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(FormControl, [{
    key: "statusToColor",
    value: function statusToColor() {
      if (this.props.status === "VALID") {
        return "#36bc78";
      } else if (this.props.status === "PENDING") {
        return "#f2da33";
      } else {
        return "#cb1842";
      }
    }
  }, {
    key: "update",
    value: function update(name, value) {
      this.props.update(this.props.index, value);
    }
  }, {
    key: "render",
    value: function render() {
      console.log(this.props.update);
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
      children: _this.props.form,
      status: "VALID",
      value: _this.props.value
    };
    _this.makeChildren = _this.makeChildren.bind(_assertThisInitialized(_this));
    _this.update = _this.update.bind(_assertThisInitialized(_this));
    _this.addChild = _this.addChild.bind(_assertThisInitialized(_this));
    _this.removeChild = _this.removeChild.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(FormArray, [{
    key: "componentDidMount",
    value: function componentDidMount() {}
  }, {
    key: "update",
    value: function update(index, value) {
      this.state.children[index].value = value;
      this.setState({
        children: this.state.children
      }, function () {});
    }
  }, {
    key: "addChild",
    value: function addChild() {
      var child = Object.create(this.state.children[0]);
      child.value = "";
      this.state.children.push(child);
      this.setState({
        children: this.state.children
      }, function () {// console.log(this.state)
      });
    }
  }, {
    key: "removeChild",
    value: function removeChild(index) {
      if (index === undefined) {
        index == this.state.children.lenght - 1;
      }

      if (this.state.children.length > 0) {
        this.state.children.splice(index, 1);
        this.setState({
          children: this.state.children
        }, function () {// console.log(this.state)
        });
      }
    }
  }, {
    key: "makeChildren",
    value: function makeChildren() {
      var _this2 = this;

      var controls = [];
      this.props.form.forEach(function (child, index) {
        // console.log('echild',child)
        if (child.type === 'formControl') {
          // var children = this.state.children;
          // children.push(child)
          // this.setState({value: this.state.value , children:children})
          if (child.JSXElement === undefined) {
            child.JSXElement = Input;
          }

          controls.push( /*#__PURE__*/React.createElement(FormControl, {
            index: index,
            update: _this2.update,
            JSXElement: child.JSXElement,
            name: child.name,
            value: child.value,
            status: 'VALID',
            key: index
          }));
        }

        if (child.type === 'formArray') {
          // loop to get children pass object down
          // console.log('the child',child)
          if (child.JSXContainer === undefined) {
            child.JSXElement = Container;
          }

          controls.push( /*#__PURE__*/React.createElement(FormArray, {
            key: index,
            JSXContainer: child.JSXContainer,
            form: child.children
          }));
        }

        if (child.type === 'formGroup') {
          // loop to get children pass object down
          if (child.JSXContainer === undefined) {
            child.JSXElement = Container;
          }

          controls.push( /*#__PURE__*/React.createElement(FormGroup$1, {
            form: child.form,
            JSXContainer: child.JSXContainer,
            key: index
          }));
        } // if field then return field jsx
        // else return container which has fields jsx

      });
      return controls;
    }
  }, {
    key: "render",
    value: function render() {
      var children = this.makeChildren();
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
        className: "formArray"
      }, /*#__PURE__*/React.createElement(this.props.JSXContainer, {
        children: children
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

  function FormGroup(props) {
    var _this;

    _classCallCheck(this, FormGroup);

    _this = _super.call(this, props);
    _this.type = "formGroup";
    _this.name = _this.props.name;
    _this.state = {
      children: _this.props.form,
      status: "VALID",
      value: _this.props.value ? _this.props.value : {}
    };
    _this.submit = _this.props.submit ? _this.props.submit : null;
    _this.makeChildren = _this.makeChildren.bind(_assertThisInitialized(_this));
    _this.update = _this.update.bind(_assertThisInitialized(_this));
    _this.getData = _this.getData.bind(_assertThisInitialized(_this));
    _this.loadValues = _this.loadValues.bind(_assertThisInitialized(_this));

    _this.loadValues();

    return _this;
  }

  _createClass(FormGroup, [{
    key: "loadValues",
    value: function loadValues() {
      var _this2 = this;

      var object = Object.assign({}, this.state.children);
      Object.keys(object).forEach(function (k) {
        var v = object[k];

        if (v.type === "formControl") {
          _this2.state.value[k] = v.value;
        } else if (v.type === "formArray") {
          var mapped = v.children.map(function (item) {
            return item.value;
          });
          _this2.state.value[k] = mapped;
        } else if (v.type === "formGroup") {
          _this2.state.value[k] = {};
          Object.keys(v.form).forEach(function (key) {
            var val = v.form[key].value;
            _this2.state.value[k][key] = val;
          });
        }
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this3 = this;

      setTimeout(function () {
        _this3.setState({
          status: 'INVALID'
        }, function () {// console.log(this.state)
        });
      }, 2000);
    }
  }, {
    key: "update",
    value: function update(name, value) {
      this.state.children[name].value = value;
      this.setState({
        children: this.state.children
      }, function () {});
    }
  }, {
    key: "makeChildren",
    value: function makeChildren() {
      var _this4 = this;

      var controls = [];
      Object.keys(this.state.children).forEach(function (key, index) {
        var child = _this4.state.children[key];

        if (child.type === 'formControl') {
          if (child.JSXElement === undefined) {
            child.JSXElement = Input;
          }

          controls.push( /*#__PURE__*/React.createElement(FormControl, {
            index: key,
            update: _this4.update,
            JSXElement: child.JSXElement,
            name: key,
            value: child.value,
            status: 'VALID',
            key: key
          }));
        }

        if (child.type === 'formArray') {
          if (child.JSXContainer === undefined) {
            child.JSXContainer = Container;
          }

          controls.push( /*#__PURE__*/React.createElement(FormArray, {
            value: _this4.state.value[key],
            name: key,
            key: key,
            index: key,
            JSXContainer: child.JSXContainer,
            form: child.children
          }));
        }

        if (child.type === 'formGroup') {
          if (child.JSXContainer === undefined) {
            child.JSXContainer = Container;
          }

          controls.push( /*#__PURE__*/React.createElement(FormGroup, {
            value: _this4.state.value[key],
            name: key,
            form: child.form,
            JSXContainer: child.JSXContainer,
            key: key
          }));
        }
      });
      return controls;
    }
  }, {
    key: "getData",
    value: function getData(e) {
      return this.state.value;
    }
  }, {
    key: "render",
    value: function render() {
      var children = this.makeChildren();
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
        className: "formGroup"
      }, /*#__PURE__*/React.createElement(this.props.JSXContainer, {
        children: children
      })), this.submit ? /*#__PURE__*/React.createElement(this.submit, {
        getData: this.getData
      }) : null);
    }
  }]);

  return FormGroup;
}(React.Component);
var FormGroup$1 = FormGroup;

export { Container, FormArray, FormControl, FormGroup$1 as FormGroup, Input };
