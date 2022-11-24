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
        var val = child.props.defaultValue !== undefined? child.props.defaultValue:'';
        this.controls[child.props.fieldName] = React.createRef();
        return React.cloneElement(child, {  ref: this.controls[child.props.fieldName],parent: this, defaultValue:val })
      } else if (child.props.groupName || child.props.arrayName) {
        if (child.props.arrayName){
          this.controls[child.props.arrayName] = React.createRef();
          return React.cloneElement(child, { parent: this, ref: this.controls[child.props.arrayName] })
        }
        if (child.props.groupName){ this.controls[child.props.groupName] = React.createRef();
          return React.cloneElement(child, { parent: this, ref: this.controls[child.props.groupName] })
        }
      } else {
        return React.cloneElement(child, {})
      }
    }), writable: false });
    if (this.props.getControls){
      this.props.getControls(this.controls);
    }
  }

  anyControls(condition){
    for (const [fieldName, control] of Object.entries(this.controls)){
      if (condition(control.current)){
        return true;
        break;
      }
    }
    return false;
  }

  componentDidMount() {
    Object.keys(this.controls).forEach(key => {
      const child = this.controls[key];
      if (child.current !== null) {
        if (child.current.statusChanges) {
          child.current.statusChanges().subscribe(status => {
            const groupStatus = this.calculateStatus();
            this.setState({status:groupStatus},()=>{
              this.status$.next(groupStatus);
            })
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
