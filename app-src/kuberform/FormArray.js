"use strict";
import React from 'react';
import { Observable, BehaviorSubject, mergeMap, map } from 'rxjs';
import AbstractControl from './AbstractControl';
import FormError from './FormError.js';

class FormArray extends AbstractControl {
  constructor(props) {
    super(props);
    this.state = { value: [], status: "VALID", touched: false, dirty:false };
    this.controls = [];

    Object.defineProperty(this, 'arrayName', { value: this.props.arrayName, writable: false });
    Object.defineProperty(this, 'valueChanges', { value: new BehaviorSubject({}), writable: false });
    this.reduceChildren = this.reduceChildren.bind(this);
    this.recurseDom = this.recurseDom.bind(this);
    Object.defineProperty(this, 'clonedChildren', { value: this.recurseDom(this.props.children, this.controls, 0), writable: false });
  }

  recurseDom(children, controls, depth) {

    return React.Children.map(children, (child,index) => {
      if (child.props) {
        if (child.props.controlName) {
          const newref = element => {
            //check if control already exists in array.
            controls.push(element);
          };
          if (child.props.children.hasOwnProperty('type') === false) {
            child =  React.cloneElement(child, { children: <child.props.children></child.props.children> });
          }
          return React.cloneElement(child, { ref: newref, parent: this, defaultValue: child.props.defaultValue })
        }
        if (child.props.groupName) {
          const newref = element => {
            controls.push(element);
          };
          return React.cloneElement(child, { parent: this, ref: newref })
        }
        if (child.props.arrayName) {
          const newref = element => {
            controls.push(element);
          };
          return React.cloneElement(child, { parent: this, ref: newref })
        }
        if (child.props.children && child.props.groupName === undefined && child.props.arrayName === undefined) {
          return React.cloneElement(child, { children: this.recurseDom(child.props.children, controls, depth + 1) });
        }
      } else {
        return child;
      }
    })
  }

  getControl(index) { return this.controls[index] }

  setValue(value) {
    value.forEach((value,index) => {
      this.controls[index].setValue(value);
    });
  }

  anyControls(condition) {
    for (const control of this.controls) {
      if (condition(control)) {
        return true;
        break;
      }
    }
    return false;
  }

  reduceObject(object,fn,initValue){
      if (Array.isArray(initValue) || typeof initValue === "string"){
        throw new SyntaxError("initial value must be an object!")
      }
      Object.keys(object).forEach(key=>{
        initValue = fn(initValue,object[key],key)
      });
      return initValue;
  }
  reduceChildren() {
    const newValue = this.controls.reduce((acc, control,index) => {
      acc[index] = control.getValue();
      return acc;
    }, []);
    this.setState({ value: newValue });
    this.valueChanges.next(newValue);
  }

  updateValue() {
    this.reduceChildren();
  }

  componentDidMount() { }

  render() {
    return (
      <div className="formArray" sx={this.props.sx}>
        <React.Fragment>{React.Children.map(this.clonedChildren, (child) => {
          if (child.props.container) {
            return React.cloneElement(child, { status: this.state.status })
          } else {
            return child;
          }
        })}</React.Fragment>
      </div>)
  }
};
export default FormArray;