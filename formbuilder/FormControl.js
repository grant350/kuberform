"use strict"
import React from 'react';
import { Observable, BehaviorSubject,map, take, Subject } from 'rxjs';
import AbstractControl from './AbstractControl';

class FormControl extends AbstractControl {
  constructor(props) {
    super(props);
    this.updateOn = this.props.updateOn? this.props.updateOn:'change';
    this.state = {status:"VALID", value:this.props.defaultValue ? this.props.defaultValue : '', errors:null,touched:false,dirty:false};
    Object.defineProperty(this,'fieldName', {value:this.props.fieldName,writable:false});
    Object.defineProperty(this,'value$', {value: new BehaviorSubject(this.props.value ? this.props.value : ''),writable:false});
    Object.defineProperty(this.state,'status', {value:'VALID',writable:false});
    Object.defineProperty(this.state,'value', {value:'',writable:false});
    Object.defineProperty(this.state,'errors', {value:null,writable:false});
    Object.defineProperty(this,'onChange', {value:this.onChange.bind(this),writable:false});
    Object.defineProperty(this,'onBlur', {value:this.onBlur.bind(this),writable:false});

  }

  componentDidMount() {
    this.setValue(this.props.defaultValue !== undefined? this.props.defaultValue: '');
  }

  validate(value) {
    if (this.props.validators === undefined || this.props.validators === null || !Array.isArray(this.props.validators)) {
      throw new SyntaxError("validators is not of type Array")
    }
    if (this.props.validators.length > 0) {
      this.status$.next("PENDING");
      this.setState({ status: "PENDING" });
    }
    this.validator.subscribe(errs=>{
      this.setErrors(errs);
    });
  }

  onChange(e){
    if (this.updateOn === "change"){
    var value = e.target.value;
    if (value === "true"){value = true};
    if (value === "false"){value = false};
    if (value !== null && value !== undefined){
      this.setValue(value)
    }
  }
  }

  onBlur(e){
    if (this.updateOn === "blur"){
      var value = e.target.value;
      if (value === "true"){value = true};
      if (value === "false"){value = false};
      if (value !== null && value !== undefined){
        this.setValue(value);
      }
    }
    this.setTouched();
  }

  render() {
    return (<div className="formControl"  onBlur={this.onBlur} onChange={this.onChange} ><this.props.element errorMessages={this.props.errorMessages} dirty={this.state.dirty} errors={this.state.errors} getStatus={this.getStatus} label={this.props.label} touched={this.state.touched} status={this.state.status} fieldName={this.fieldName} setValue={this.setValue}></this.props.element></div>)
  }
};
export default FormControl;
