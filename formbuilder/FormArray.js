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
        const newref = element => {
          this.controls[index] = element;
        };
        if (child.props.defaultValue){
          // this.controls[index] = React.createRef();
          return React.cloneElement(child, { parent: this, defaultValue:child.props.defaultValue, ref: newref })
        } else {
          // this.controls[index] = React.createRef();
          return React.cloneElement(child, { parent: this,ref: newref })
        }

      } else if (child.props.groupName || child.props.arrayName) {

        if (child.props.arrayName){
          const newref = element => {
            this.controls[index] = element;
          };
          // this.controls[index] = React.createRef();
          return React.cloneElement(child, { ref: newref });
        }
        if (child.props.groupName){
          //  this.controls[index] = React.createRef();
          const newref = element => {
            this.controls[index] = element;
          };
          return React.cloneElement(child, { ref: newref})
        }
      }
    }), writable: false });
  }


  anyControls(condition){
    for (const control of this.controls){
      if (condition(control)){
        return true;
        break;
      }
    }
    return false;
  }

  componentDidMount() {
    this.controls.forEach((child,index) => {
      if (child !== null) {
        if (child.statusChanges) {
          child.statusChanges().subscribe(status => {
            const arrayStatus = this.calculateStatus();
            this.setState({status:arrayStatus},()=>{
              this.status$.next(arrayStatus);
            })
          })
        }
        if (child.valueChanges) {
          child.valueChanges().subscribe(val => {
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
