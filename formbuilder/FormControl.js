"use strict"
import React from 'react';
import { Observable, BehaviorSubject,map, take, Subject } from 'rxjs';
import AbstractControl from './AbstractControl';

class FormControl extends AbstractControl {
  constructor(props) {
    super(props)
    this.state = {status:"VALID", value:this.props.value ? this.props.value : '', errors:null};
    Object.defineProperty(this,'fieldName', {value:this.props.fieldName,writable:false});
    Object.defineProperty(this,'value$', {value: new BehaviorSubject(this.props.value ? this.props.value : ''),writable:false});
    Object.defineProperty(this.state,'status', {value:'VALID',writable:false});
    Object.defineProperty(this.state,'value', {value:'',writable:false});
    Object.defineProperty(this.state,'errors', {value:null,writable:false});
  }

  componentDidMount() {
    this.setValue(this.props.value ? this.props.value : '');
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

  render() {
    return (<div className="formControl"><this.props.element errors={this.state.errors} label={this.props.label} status={this.state.status} fieldName={this.fieldName} setValue={this.setValue}></this.props.element></div>)
  }
};
export default FormControl;
