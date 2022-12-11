"use strict";
import React from 'react';
import { Observable, BehaviorSubject, forkJoin, map, take, Subject } from 'rxjs';
import ReactDOM from 'react-dom'

class AbstractControl extends React.Component {
  constructor(props) {
    super(props)
    Object.defineProperty(this, 'statusChanges', { value: new BehaviorSubject("VALID"), writable: false });
  }

  setView(){
    // see if the dom node can handle event listener blur or other things
    if (!this.controlHasProps ){
      // components need to use value prop
      const FORM_CONTROL = ReactDOM.findDOMNode(this.ref.current);
      //find closest Input or target attr
      const TEXTAREA_NODE = FORM_CONTROL.querySelectorAll("textarea")[0];
      const INPUT_NODE = FORM_CONTROL.querySelectorAll("input")[0];
      const TARGET_NODE = FORM_CONTROL.querySelectorAll('[id="target"]')[0];
      //set the values
      const STATUS_NODE = FORM_CONTROL.querySelectorAll('[id="form-status"]')[0];
      if (STATUS_NODE !== undefined){STATUS_NODE.innerText = this.state.status;  }

      if (TARGET_NODE){
        TARGET_NODE.value = this.state.value;
        // this.forceUpdate();
        return;
      }
      if (TEXTAREA_NODE){
        TEXTAREA_NODE.value = this.state.value;
        // this.forceUpdate();
        return;
      }
      if (INPUT_NODE){
        INPUT_NODE.value = this.state.value;
        // this.forceUpdate();
        return;
      }
   }
  }

  getErrors(){
    return this.state.errors;
  }
  getValue() {
    const frozenObjectValue = Object.assign({}, this.state.value);
    return Object.defineProperty({}, 'value', { value: frozenObjectValue, writable: false });
  }
  getStatus(){
    return this.state.status;
  }
  setStateAndView(obj,fn){
    this.setState(obj,()=>{
      //setView first  then run callback
      this.setView();
      fn();
    })
  }

  get invalid() { return this.state.status === "INVALID" ? true : false };

  get isEmptyValue() {
    if (this.state.value === null) { return true };
    if (this.state.value === '') { return true };
    if (this.state.value === undefined) { return true };
    return false;
  }

  setTouched(options) {
    this.setStateAndView({ touched: true }, () => {
      if (this.parent && !options.onlySelf) { this.parent.setTouched(options) };
    });
  }

  setDirty(value, options) {
    this.setStateAndView({ dirty: true }, () => {
      if (this.parent && !options.onlySelf) { this.parent.setDirty(options) };
    });
  }

  isDisabled() {
    return this.state.disabled;
  }

  calculateStatus() {
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


  anyControlsHaveStatus(status) {
    return this.anyControls((control) => { return control.state.status == status })
  }

  anyControls(condition) {
    condition(this);
  }

  composeAsyncValidators(validators) {
    return validators != null ? this.mergeValidators(validators) : null;
  }

  mergeValidators(validators) {
    return (control) => {
      const asyncObservables = this.props.validators.map(validator => {
        return new Observable((error$) => {
          validator(control, error$);
        }).pipe(take(1));
      });
      return forkJoin(asyncObservables).pipe(map(this.mergeErrors))
    }
  }

  mergeErrors(arrayOfErrors) {
    let totalErrors = {};
    arrayOfErrors.forEach((errorsObj) => {
      if (errorsObj !== null) {
        totalErrors = Object.assign(totalErrors, errorsObj)
      }
    });
    return Object.keys(totalErrors).length === 0 ? null : totalErrors;
  }

  updateControlsErrors() {
    const status = this.calculateStatus();
    this.setStateAndView({ status: status }, () => {
      this.statusChanges.next(status);
      if (this.parent) {
        this.parent.updateControlsErrors();
      }
    });
  }
  //this.forceupdate instead of using state and pass in the static values

  setErrors(errorObject) {
    this.setStateAndView({ errors: errorObject }, () => {
      this.updateControlsErrors();
    });
  }

  runAsyncValidator(options) {
    if (this.asyncValidator) {
      this.setStateAndView({ status: "PENDING" }, () => {
        this.asyncSubscription = this.asyncValidator(this).subscribe(errs => {
          this.setErrors(errs);
        });
      });
    }
  }

  updateValue() {
    // do nohing as theres no controls to update
    //if emit is false then dont update state.s
  }
  setInitialStatusAndErrors(cb) {
    this.setStateAndView({ status: this.isDisabled() ? "DISABLED" : "VALID", errors: null }, cb);
  }

  updateValueAndValidity(options) {
    this.setInitialStatusAndErrors(() => {
      const status = this.calculateStatus();
      this.updateValue();
      this.setStateAndView({ status: status }, () => {
        if (this.state.enabled) {
          if (this.asyncSubscription) { this.asyncSubscription.unsubscribe() };
          if (this.state.status === "VALID" || this.state.status === "PENDING") {
            this.runAsyncValidator(options);
          }
        }
        this.valueChanges.next(this.state.value);
        this.statusChanges.next(this.state.status);

        if (this.parent && !options.onlySelf) {
          this.parent.updateValueAndValidity(options);
        }
      })
    })
  }

  setValue(value, options) {
    this.setStateAndView({ value: value }, () => {
      this.setView();
      this.updateValueAndValidity(options);
    });
  }

};
export default AbstractControl;
