import FormControl from './FormControl.js';
import FormArray from './FormArray.js';
import React from 'react';
import { Observable, merge } from 'rxjs';

class FormGroup extends React.Component {
  constructor(props) {
    super(props); // { field array formgroup}

    this.type = "formGroup";
    this.name = this.props.name;
    this.state = {
      children: props.form,
      status: "VALID",
      value: this.props.value ? this.props.value : {}
    }; // console.log('my props',props)

    this.submit = props.submit;
    this.makeChildren = this.makeChildren.bind(this);
    this.update = this.update.bind(this);
    this.getData = this.getData.bind(this);
    this.loadValues = this.loadValues.bind(this);
    this.loadValues();
  }

  loadValues() {
    var object = Object.assign({}, this.state.children);
    Object.keys(object).forEach(k => {
      var v = object[k];

      if (v.type === "formControl") {
        this.state.value[k] = v.value;
      } else if (v.type === "formArray") {
        console.log('formarray', v);
        var mapped = v.children.map(item => {
          return item.value;
        });
        this.state.value[k] = mapped;
      } else if (v.type === "formGroup") {
        this.state.value[k] = {};
        Object.keys(v.form).forEach(key => {
          var val = v.form[key].value;
          this.state.value[k][key] = val;
        });
      }
    });
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        status: 'INVALID'
      }, function () {// console.log(this.state)
      });
    }, 2000);
  }

  update(name, value) {
    this.state.children[name].value = value;
    this.setState({
      children: this.state.children
    }, function () {});
  }

  makeChildren() {
    var controls = [];
    Object.keys(this.state.children).forEach((key, index) => {
      var child = this.state.children[key];

      if (child.type === 'formControl') {
        controls.push(FormControl({
          index: key,
          update: this.update,
          JSXElement: child.JSXElement,
          name: key,
          value: child.value,
          status: 'VALID',
          key: key
        }));
      }

      if (child.type === 'formArray') {
        controls.push(FormArray({
          value: this.state.value[key],
          name: key,
          key: key,
          index: key,
          JSXContainer: child.JSXContainer,
          form: child.children
        }));
      }

      if (child.type === 'formGroup') {
        controls.push(FormGroup({
          value: this.state.value[key],
          name: key,
          form: child.form,
          JSXContainer: child.JSXContainer,
          key: key
        }));
      }
    });
    return controls;
  }

  getData(e) {
    return this.state.value;
  }

  render() {
    var children = this.makeChildren();
    return React.Fragment(null, React.DOM.div({
      className: "formGroup"
    }, this.props.JSXContainer({
      children: children
    })), this.submit ? this.submit({
      getData: this.getData
    }) : null);
  }

}

;
export default FormGroup;