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
    Object.defineProperty(this,'valueChanges', {value:new BehaviorSubject({}),writable:false});
    this.reduceChildren = this.reduceChildren.bind(this);
     const returnMapChildren = (children)=>{
      return React.Children.map(children, (child) => {
         if (child.props.fieldName) {
          if (child.props.children.hasOwnProperty('type') === false){
            console.log('reset child');
            child = React.cloneElement(child,{children:<child.props.children></child.props.children>});
          }
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
           if (child.props.container){
            return React.cloneElement(child,{children:returnMapChildren(child.props.children)})
           }
           return React.cloneElement(child,{})
         }
       })
      }
    Object.defineProperty(this, 'clonedChildren',  { value: returnMapChildren(this.props.children), writable: false });
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

  reduceChildren(){
    const newValue = Object.reduce(this.controls,(acc,control,key)=>{
      acc[key] = control.state.getValue();
      return acc;
    },"non");
    this.setState({value:newValue});
    this.valueChanges.next(newValue);
  }

  updateValue(){
    this.reduceChildren();
  }

  componentDidMount() {}

  render() {
    return (
      <div className="formGroup" sx={this.props.sx}>
        <React.Fragment>{React.Children.map(this.clonedChildren, (child) => {
          if (child.props.container){
            return React.cloneElement(child, {status:this.state.status})
          } else {
            return child;
          }
        })}</React.Fragment>
      </div>)
  }
};
export default FormGroup;
