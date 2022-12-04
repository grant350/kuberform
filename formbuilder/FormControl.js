"use strict"
import React from 'react';
import { Observable, BehaviorSubject, map, take, Subject } from 'rxjs';
import AbstractControl from './AbstractControl';

class FormControl extends AbstractControl {
  constructor(props) {
    super(props);
    this.updateOn = this.props.updateOn ? this.props.updateOn : 'change';
    this.state = { status: "VALID", value: this.props.defaultValue !== undefined ? this.props.defaultValue : null, errors: null, touched: false, dirty: false };
    if (!this.props.fieldName){throw new ReferenceError("fieldName does not exists on FormControl")}
    Object.defineProperty(this, 'fieldName', { value: this.props.fieldName, writable: false });
    Object.defineProperty(this, 'value$', { value: new BehaviorSubject(this.props.defaultValue !== undefined ? this.props.defaultValue : null), writable: false });
    Object.defineProperty(this.state, 'status', { value: 'VALID', writable: false });
    Object.defineProperty(this.state, 'value', { value: this.props.defaultValue !== undefined ? this.props.defaultValue : null, writable: false });
    Object.defineProperty(this.state, 'errors', { value: null, writable: false });
    Object.defineProperty(this, 'onChange', { value: this.onChange.bind(this), writable: false });
    Object.defineProperty(this, 'onBlur', { value: this.onBlur.bind(this), writable: false });
    Object.defineProperty(this,'validator', {value:this.props.validators? this.mergeValidators(this.props.validators): null,writable:false});
  }

  componentDidMount() {
    this.setValue(this.state.value);
  }

  validate(value) {
    if (this.props.validators === undefined || this.props.validators === null || !Array.isArray(this.props.validators)) {
      throw new SyntaxError("validators is not of type Array")
    }
    if (this.props.validators.length > 0) {
      this.status$.next("PENDING");
      this.setState({ status: "PENDING" });
    }
    this.validator.subscribe(errs => {
      this.setErrors(errs);
    });
  }

  onChange(e) {
    if (this.updateOn === "change") {
      if (this.leaveAsNullWhenEmpty) {
        if (value === '') { value === null }
      }
      var value = e.target.value;
      if (value.toLowerCase() === "true") { value = true };
      if (value.toLowerCase() === "false") { value = false };
      if (value !== null && value !== undefined) {
        this.setValue(value)
      }
    }
  }

  onBlur(e) {
    if (this.updateOn === "blur") {
      var value = e.target.value;
      if (value === '') { value === null }
      if (value !== null && value !== undefined) {
        this.setValue(value);
      }
    }
    this.setTouched();
  }

  render() {
    return (
      <div className="formControl" style={this.props.sx} onBlur={this.onBlur} onChange={this.onChange} >
        {this.props.element ?
          <this.props.element ref={this.control} invalid={this.invalid} errorMessages={this.props.errorMessages} dirty={this.state.dirty} value={this.state.value} errors={this.state.errors} getStatus={this.getStatus} label={this.props.label} touched={this.state.touched} status={this.state.status} fieldName={this.fieldName} setValue={this.setValue}></this.props.element> :
          <React.Fragment>{React.Children.map(this.props.children, (child) => {
            return React.cloneElement(child, { invalid: this.invalid, errorMessages: this.props.errorMessages, dirty: this.state.dirty, value: this.state.value, errors: this.state.errors, getStatus: this.getStatus, label: child.props.label? child.props.label: this.props.label, touched: this.state.touched, status: this.state.status, setValue: this.setValue })
          })[0]}</React.Fragment>
        }
      </div>
    )
  }
};
export default FormControl;
