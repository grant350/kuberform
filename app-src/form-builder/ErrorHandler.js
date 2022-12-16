"use strict";
import React from 'react';

// import FormControl from './FormControl';
// import FormGroup from './FormGroup.js';
import FormError from './FormError.js';

class ErrorHandler  {

  constructor(control){
    this.controls = {};
    if (control.constructor.name === "FormGroup"){
      this.formGroupHandler(control)
    }
  }

  formGroupHandler(control){

    if (control.props.groupName === undefined || typeof control.props.groupName !== "string"){
      throw new FormError("groupName prop not found on '<FormGroup>' component");
    }
    if (control.props.children === undefined ){
      throw new FormError("FormGroup component needs children with one instance of <FormGroup>, <FormArray>, <FormControl>");
    }
  }

  formArrayHandler(){

  }

  formControlHandler(control){
    console.log('controls',this.controls);
    if (this.controls['box']){
      throw new FormError("box exists");
    } else {
      this.controls['box'] = true;
    }
    console.log('control-handler',control)
  }

  checkControlProps(control,controlNames){


      if (control.constructor.name === "FormControl"){

        if (control.props.controlName === undefined || typeof control.props.controlName !== "string"){
          throw new FormError("controlName prop not found on '<FormControl>' component");
        }

        if (control.props.updateOn !== undefined ){
          try {
            if (["change","blur"].includes(control.props.updateOn.toLowerCase()) === false){
              throw new FormError("updateOn prop must be either 'change' or 'blur' ");
            }
          } catch {
            throw new FormError("updateOn prop must be either 'change' or 'blur' ");
          }
        }
        if (control.props.validators){
          if (Array.isArray(control.props.validators) === false){
            throw new FormError("validators prop on '<FormControl>' must be of type Array");
          }
          control.props.validators.forEach(fn=>{
            if (fn instanceof Function === false){
              throw new FormError("validators must be a function with parameters control and observable")
            }
          })
        }

        if (control.props.children === undefined ){
          throw new FormError("FormControl needs children");
        }
     }

  }

}
export default ErrorHandler;