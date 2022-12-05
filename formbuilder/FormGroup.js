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
          return React.cloneElement(child, {  ref: newref,parent: this, defaultValue:child.props.defaultValue })
        } else {
          return React.cloneElement(child, {  ref: newref, parent: this })
        }
      } else if (child.props.groupName || child.props.arrayName) {
        if (child.props.arrayName){
          const newref = element => {
            this.controls[child.props.arrayName] = element;
          };
          return React.cloneElement(child, { parent: this, ref: newref })
        }
        if (child.props.groupName){
          const newref = element => {
            this.controls[child.props.groupName] = element;
          };
          return React.cloneElement(child, { parent: this, ref: newref })
        }
      } else {
        return React.cloneElement(child,{})
      }
    }), writable: false });

  }

  getControl(control){return this.controls[control]}

  setValue(value) {
    Object.keys(value).forEach(name => {
      this.controls[name].setValue(value[name]);
    });
  }

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
            if (this.state.status !== groupStatus){
            this.setState({status:groupStatus},()=>{
              this.status$.next(groupStatus);
            })
          }
          })
        }
        if (child.valueChanges) {
          child.valueChanges().subscribe(val => {
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
    //work around for not having state is to run another react.clone children or abodnand state all togeher and force render
    return (
      <div className="formGroup">
        {this.props.container ? <this.props.container>{this.clonedChildren}</this.props.container> :
        <React.Fragment>{React.Children.map(this.clonedChildren, (child) => {
          return React.cloneElement(child, {status:this.state.status})
        })}</React.Fragment>}
      </div>)
  }
};
export default FormGroup;
