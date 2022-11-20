"use strict";

import React from 'react';
import { Observable, BehaviorSubject, mergeMap, map } from 'rxjs';
import AbstractControl from './AbstractControl';

class FormGroup extends AbstractControl {

  constructor(props) {
    super(props)

    this.state = {
      value: {},
      status: "VALID"
    }
    this.value$ = new BehaviorSubject({});
    this.controls = {};

    Object.defineProperty(this, 'clonedChildren',  { value: React.Children.map(this.props.children, (child) => {
      if (child.props.fieldName) {
        this.controls[child.props.fieldName] = React.createRef();
        return React.cloneElement(child, { parent: this, ref: this.controls[child.props.fieldName] })
      } else if (child.props.groupName || child.props.arrayName) {
        if (child.props.arrayName){
          this.controls[child.props.arrayName] = React.createRef();
          return React.cloneElement(child, { ref: this.controls[child.props.arrayName] })
        }
        if (child.props.groupName){ this.controls[child.props.groupName] = React.createRef();
          return React.cloneElement(child, { ref: this.controls[child.props.groupName] })
        }
      }
    }), writable: false });
  }

  anyControls(condition){
      Object.entries(this.controls).forEach(([key,value])=>{
        const fieldName=key;
        const control=value.current.state;
        return condition(control);
    })
  }

  componentDidMount() {

    Object.keys(this.controls).forEach(key => {
      const child = this.controls[key];
      if (child.current !== null) {
        if (child.current.statusChanges) {
          child.current.statusChanges().subscribe(status => {
            this.status$.next(this.calculateStatus());
          })
        }
        if (child.current.valueChanges) {
          child.current.valueChanges().subscribe(val => {
            this.state.value[key] = val;
            this.setState({ value: this.state.value }, () => {
              this.value$.next(this.state.value);
            });
          })
        }
      }
    });
  }



  render() {
    return (
      <div className="formGroup">
        {this.props.container ? <this.props.container>{this.clonedChildren}</this.props.container> : <React.Fragment>{this.clonedChildren}</React.Fragment>}
      </div>)
  }
};
export default FormGroup;
