"use strict";
import React from 'react';
import { Observable, BehaviorSubject, mergeMap, map } from 'rxjs';
import AbstractControl from './AbstractControl';

class FormArray extends AbstractControl {
  constructor(props) {
    super(props);
    this.state = { value: [], status: "VALID", touched:false };
    this.controls = [];
    Object.defineProperty(this,'value$', {value:new BehaviorSubject([]),writable:false});
    Object.defineProperty(this,'arrayName', {value:this.props.arrayName,writable:false});

    Object.defineProperty(this, 'clonedChildren',  { value: React.Children.map(this.props.children, (child,index) => {
      if (child.props.fieldName) {
        var val = child.props.defaultValue !== undefined? child.props.defaultValue:'';
        this.controls[index] = React.createRef();
        return React.cloneElement(child, { parent: this, defaultValue:val,ref: this.controls[index] })
      } else if (child.props.groupName || child.props.arrayName) {
        if (child.props.arrayName){
          this.controls[index] = React.createRef();
          return React.cloneElement(child, { ref: this.controls[index] });
        }
        if (child.props.groupName){ this.controls[index] = React.createRef();
          return React.cloneElement(child, { ref: this.controls[index] })
        }
      }
    }), writable: false });
  }


  anyControls(condition){
    for (const control of this.controls){
      if (condition(control.current)){
        return true;
        break;
      }
    }
    return false;
  }

  componentDidMount() {
    this.controls.forEach((child,index) => {
      if (child.current !== null) {
        if (child.current.statusChanges) {
          child.current.statusChanges().subscribe(status => {
            const arrayStatus = this.calculateStatus();
            this.setState({status:arrayStatus},()=>{
              this.status$.next(arrayStatus);
            })
          })
        }
        if (child.current.valueChanges) {
          child.current.valueChanges().subscribe(val => {
            this.state.value[index] = val;
            this.setState({ value: this.state.value }, () => {
              this.value$.next(this.state.value);
            });
          })
        }
      }
    });
  }

  addChild(index){

    // adds a child by copying the current chlid in line.
    // or adds what current index child
  }

  removeChild(index){
    // by index or by last item if no index provided
  }

  render() {
    return (
      <div className="formArray">
        {this.props.container ? <this.props.container>{this.clonedChildren}</this.props.container> : <React.Fragment>{this.clonedChildren}</React.Fragment>}
      </div>)
  }
};
export default FormArray;
