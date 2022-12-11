"use strict"
import React from 'react';
import { Observable, BehaviorSubject, map, take, Subject } from 'rxjs';
import AbstractControl from './AbstractControl';

class FormControl extends AbstractControl {
  constructor(props) {
    super(props);
    this.updateOn = this.props.updateOn ? this.props.updateOn : 'change';
    var initValue = '';
    if (this.props.leaveAsNullWhenEmpty){
      initValue=null;
    }
    this.state = {
      status: "VALID",
      value: this.props.defaultValue ? this.props.defaultValue : initValue,
      errors: null,
      touched: false,
      dirty: false,
      disabled: this.props.disabled? true:false,
      enabled: this.props.disabled? false:true
  };
    this.leaveAsNullWhenEmpty = this.props.leaveAsNullWhenEmpty? true:false;
    Object.defineProperty(this, 'fieldName', { value: this.props.fieldName, writable: false });
    Object.defineProperty(this, 'valueChanges', { value: new BehaviorSubject(this.props.defaultValue !== undefined ? this.props.defaultValue : null), writable: false });
    Object.defineProperty(this, 'onChange', { value: this.onChange.bind(this), writable: false });
    Object.defineProperty(this, 'onBlur', { value: this.onBlur.bind(this), writable: false });
    this.asyncValidator = this.props.validators? this.composeAsyncValidators(this.props.validators): null;
    this.asyncSubscription = null;
    this.ref = React.createRef();
    this.controlHasProps = typeof this.props.children.type !== "string";
  }

  componentDidMount() {
    this.setValue(this.state.value);
  }

  onChange(e) {
    var value = e.target.value;
    if (this.updateOn === "change") {
      if (this.leaveAsNullWhenEmpty) {
        if (value === '') { value === null }
      }
      if (this.allowTypeBoolean){
        if (value.toLowerCase() === "true") { value = true };
        if (value.toLowerCase() === "false") { value = false };
      }
      this.setValue(value);
    }
    if (this.state.dirty === false){this.setDirty()};

  }

  onBlur(e) {
    if (this.updateOn === "blur") {
      var value = e.target.value;
      if (this.leaveAsNullWhenEmpty) {
        if (value === '') { value === null }
      }
      if (this.allowTypeBoolean){
        if (value.toLowerCase() === "true") { value = true };
        if (value.toLowerCase() === "false") { value = false };
      }
      this.setValue(value);
    }
    if (this.state.touched === false){this.setTouched()};
  }

  render() {
    return (
      <div className="formControl" ref={this.ref} style={this.props.sx} onBlur={this.onBlur} onChange={this.onChange}  touched={this.state.touched.toString()} dirty={this.state.dirty.toString()}>
          <React.Fragment>{React.Children.map(this.props.children, (child) => {
            // console.log('child',child)
            if (typeof child.type === "string"){
              return React.cloneElement(child, {});
            } else {
              return React.cloneElement(child, { invalid: this.invalid, dirty: this.state.dirty, value: this.state.value, errors: this.state.errors, getStatus: this.getStatus, touched: this.state.touched, status: this.state.status, setValue: this.setValue })
            }
          })[0]}</React.Fragment>

      </div>
    )
  }
};
export default FormControl;
