"use strict";
import React from 'react';
import { Observable, BehaviorSubject,forkJoin, map,take,Subject } from 'rxjs';

class AbstractControl extends React.Component {
  constructor(props) {
    super(props)
    Object.defineProperty(this,'status$', {value:new BehaviorSubject("VALID"),writable:false});
    // this.setValue = this.setValue.bind(this);
    Object.defineProperty(this,'setValue', {value:this.setValue.bind(this),writable:false});
    Object.defineProperty(this,'valueChanges', {value:this.valueChanges,writable:false});
    Object.defineProperty(this,'statusChanges', {value:this.statusChanges,writable:false});
    Object.defineProperty(this,'setErrors', {value:this.setErrors,writable:false});
    // Object.defineProperty(this,'calculateStatus', {value:this.calculateStatus,writable:false});
    // Object.defineProperty(this,'anyControlsHaveStatus', {value:this.anyControlsHaveStatus,writable:false});
    // Object.defineProperty(this,'anyControls', {value:this.anyControls,writable:false});
    Object.defineProperty(this,'validator', {value:this.props.validators? this.mergeValidators(this.props.validators): null,writable:false});
  }
  getRawValue(){
    const frozenObjectValue = Object.assign({},this.state.value)
    return Object.defineProperty({},'value', {value:frozenObjectValue,writable:false});
  }


  calculateStatus(){
    if (this.state.errors !== null) {
      return "INVALID"
    } else
    if (this.anyControlsHaveStatus("INVALID")){
      return "INVALID"
    } else {
    return "VALID";
    }
  }

  anyControlsHaveStatus(status){
    return this.anyControls( (control)=>{return control.status == status})
  }
  contains(fieldName){
    if (Array.isArray(this.controls)){
      return this.controls.some((control) => control.hasOwnProperty(fieldName));
    } else {
      return this.controls.hasOwnProperty(fieldName);
    }
  }
  anyControls(condition){
    condition(this.state);
  }
  getRawStatus(){
    return this.state.status;
  }
  mergeValidators(validators){
    const asyncValidatorObservables = this.props.validators.map(validator => {
      return new Observable((error$) => {
        validator(this.state.value, error$);
      }).pipe(
        take(1)
      )
    });
    return forkJoin(asyncValidatorObservables).pipe(map(this.mergeErrors))
  }
  mergeErrors(arrayOfErrors){
    let totalErrors = {};
    arrayOfErrors.forEach((errorsObj) => {
      if (errorsObj !== null){
        totalErrors = Object.assign(totalErrors,errorsObj)
      }
    });
    return Object.keys(totalErrors).length === 0 ? null : totalErrors;
  }

  setErrors(errorObject){
      this.setState({errors:errorObject},()=>{
        const status = this.calculateStatus();
        this.status$.next(status)
        this.setState({status:status});
      });
  }

  valueChanges(){
    return this.value$.asObservable();
  }
  statusChanges(){
    return this.status$.asObservable();
  }

  setValue(value) {
    this.value$.next(value);
    this.setState({value:value},()=>{
      if (this.validator) {
        this.validate(value);
      }
    });

  }

};
export default AbstractControl;
