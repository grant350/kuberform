"use strict";
import React from 'react';
import { Observable, BehaviorSubject,forkJoin, map,take,Subject } from 'rxjs';

class AbstractControl extends React.Component {
  constructor(props) {
    super(props)
    Object.defineProperty(this,'status$', {value:new BehaviorSubject("VALID"),writable:false});
    Object.defineProperty(this,'setValue', {value:this.setValue.bind(this),writable:false});
    Object.defineProperty(this,'valueChanges', {value:this.valueChanges,writable:false});
    Object.defineProperty(this,'statusChanges', {value:this.statusChanges,writable:false});
    Object.defineProperty(this,'setErrors', {value:this.setErrors,writable:false});
    Object.defineProperty(this,'setTouched', {value:this.setTouched.bind(this),writable:false});
    Object.defineProperty(this,'setDirty', {value:this.setDirty.bind(this),writable:false});
    this.leaveAsNullWhenEmpty = this.props.leaveAsNullWhenEmpty? true:false;
  }

  static setMilk(){
    this.setMilk = 5;
    this.forceUpdate();
  }
  getRawValue(){
    const frozenObjectValue = Object.assign({},this.state.value)
    return Object.defineProperty({},'value', {value:frozenObjectValue,writable:false});
  }

  get invalid(){return this.state.status === "INVALID"? true:false};

  get isEmptyValue(){
    if (this.state.value === null){return true};
    if (this.state.value.length <= 0){return true};
    return false;
  }

  setTouched(){
    this.setState({touched:true});
    if (this.parent){this.parent.setTouched()};
  }

  setDirty(value){
    this.setState({dirty:true});
    if (this.parent){this.parent.setDirty()};
  }

  calculateStatus(){
    if (this.state.errors) {
      return "INVALID"
    } else
    if (this.anyControlsHaveStatus("INVALID")){
      return "INVALID"
    } else {
    return "VALID";
    }
  }

  anyControlsHaveStatus(status){
    return this.anyControls( (control)=>{return control.state.status == status})
  }

  anyControls(condition){
    condition(this);
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
    // let totalWarnings = {};
    arrayOfErrors.forEach((errorsObj) => {
      if (errorsObj !== null){
        totalErrors = Object.assign(totalErrors,errorsObj)
      }
    });
    return Object.keys(totalErrors).length === 0 ? null : totalErrors;
  }

  updateControlsErrors(){
    const status = this.calculateStatus();
    this.setState({status:status},()=>{
      this.status$.next(status);
      this.status = status;
    });

    if (this.props.parent) {
      this.props.parent.updateControlsErrors();
    }
  }
  //this.forceupdate instead of using state and pass in the static values
  getStatus(){
    return this.status;
  }
  setErrors(errorObject){
      this.setState({errors:errorObject},()=>{
        this.updateControlsErrors();
      });
  }

  valueChanges(){
    return this.value$.asObservable();
  }
  statusChanges(){
    return this.status$.asObservable();
  }

  setValue(value) {
    if (this.state.value !== value){
      this.setDirty();
      this.value$.next(value);
      this.setState({value:value},()=>{
        if (this.validator) {
          this.validate(value);
        }
      });
    } else {
      if (this.validator) {
        this.validate(value);
      }
    }
  }

};
export default AbstractControl;
