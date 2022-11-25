"use strict";
import React from 'react';
import { Observable, BehaviorSubject, mergeMap, map } from 'rxjs';
import AbstractControl from './AbstractControl';

class FormGroup extends AbstractControl {
  constructor(props) {
    super(props);
    this.state = { value: {}, status: "VALID", touched:false };
    this.controls = {};

    Object.defineProperty(this,'groupName', {value:this.props.groupName,writable:false});
    Object.defineProperty(this,'value$', {value:new BehaviorSubject({}),writable:false});
    Object.defineProperty(this, 'clonedChildren',  { value: React.Children.map(this.props.children, (child) => {
      if (child.props.fieldName) {
        const newref = element => {
          this.controls[child.props.fieldName] = element;
        };
        if (child.props.defaultValue){
          // this.controls[child.props.fieldName] = React.createRef();
          return React.cloneElement(child, {  ref: newref,parent: this, defaultValue:child.props.defaultValue })
        } else {
          // this.controls[child.props.fieldName] = React.createRef();
          return React.cloneElement(child, {  ref: newref, parent: this })
        }
      } else if (child.props.groupName || child.props.arrayName) {
        if (child.props.arrayName){
          const newref = element => {
            this.controls[child.props.arrayName] = element;
          };
          // this.controls[child.props.arrayName] = React.createRef();
          return React.cloneElement(child, { parent: this, ref: newref })
        }
        if (child.props.groupName){
          // this.controls[child.props.groupName] = React.createRef();
          const newref = element => {
            this.controls[child.props.groupName] = element;
          };
          return React.cloneElement(child, { parent: this, ref: newref })
        }
      } else {
        return React.cloneElement(child, {})
      }
    }), writable: false });
    if (this.props.getControls){
      this.props.getControls(this.controls);
    }
  }

  getControl(control){return this.controls[control]}

  anyControls(condition){
    for (const [fieldName, control] of Object.entries(this.controls)){
      if (condition(control)){
        return true;
        break;
      }
    }
    return false;
  }

  componentDidMount() {
    Object.keys(this.controls).forEach(key => {
      const child = this.controls[key];
      if (child !== null) {
        if (child.statusChanges) {
          child.statusChanges().subscribe(status => {
            const groupStatus = this.calculateStatus();
            this.setState({status:groupStatus},()=>{
              this.status$.next(groupStatus);
            })
          })
        }
        if (child.valueChanges) {
          child.valueChanges().subscribe(val => {
            //if state value === null then set it to an object.
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
