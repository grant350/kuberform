"use strict"
import AbstractControl from './AbstractControl';
import React from 'react';
import { Observable, BehaviorSubject, map, take, Subject } from 'rxjs';

class FormControl extends AbstractControl {
  constructor(props) {
    super(props);

    this.state = {
      status: "VALID",
      value: this.props.defaultValue ? this.props.defaultValue : '',
      errors: null,
      touched: false,
      dirty: false,
      disabled: this.props.disabled ? true : false,
      enabled: this.props.disabled ? false : true
    };

    Object.defineProperty(this, 'controlName', { value: this.props.controlName, writable: false });
    Object.defineProperty(this, 'valueChanges', { value: new BehaviorSubject(this.props.defaultValue !== undefined ? this.props.defaultValue : null), writable: false });
    Object.defineProperty(this, 'onChange', { value: this.onChange.bind(this), writable: false });
    Object.defineProperty(this, 'onBlur', { value: this.onBlur.bind(this), writable: false });
    this.updateOn = this.props.updateOn ? this.props.updateOn : 'change';
    this.asyncValidator = this.props.validators ? this.composeAsyncValidators(this.props.validators) : null;
    this.asyncSubscription = null;
    this.ref = React.createRef();
  }

  componentDidMount() {
    this.setValue(this.state.value,{});
  }

  onChange(e) {
    var value = e.target.value;
    if (this.updateOn === "change") {
      this.setValue(value,{});
    }
    if (this.state.dirty === false) { this.setDirty() };

  }

  onBlur(e) {
    if (this.updateOn === "blur") {
      var value = e.target.value;
      this.setValue(value,{});
    }
    if (this.state.touched === false) { this.setTouched() };
  }

  render() {
    return (
      <div className="formControl" ref={this.ref} style={this.props.sx} onBlur={this.onBlur} onChange={this.onChange} touched={this.state.touched.toString()} dirty={this.state.dirty.toString()}>
        <React.Fragment>{React.Children.map(this.props.children, (child) => {
          return React.cloneElement(child, { invalid: this.invalid, dirty: this.state.dirty, value: this.state.value, errors: this.state.errors, getStatus: this.getStatus, touched: this.state.touched, status: this.state.status, setValue: this.setValue })
        })}</React.Fragment>

      </div>
    )
  }
};
export default FormControl;