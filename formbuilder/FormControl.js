//
// import FormControl from './FormControl.js';
// import FormArray from './FormArray.js';
import React from 'react';
import { Observable, BehaviorSubject, mergeMap, map } from 'rxjs';
// import {Input,Container} from './index.js';
class FormControl extends React.Component {
  constructor(props) {
    super(props)
    this.status$ = new BehaviorSubject(null);
    this.value$ = new BehaviorSubject(this.props.value? this.props.value:'')
    this.update = this.update.bind(this);
    this.state = {status:"VALID"};
    this.getStatusString = this.getStatusString.bind(this);
        // this.update(this.props.value? this.props.value: '')
  }

  componentDidMount(){
    this.update(this.props.value? this.props.value: '');
    this.status$.subscribe(status=>{
      this.setState({status:this.getStatusString(status)})
    })
  }
  getStatusString(status) {
    switch (status) {
      case null: return "PENDING";
        break;
      case false: return "INVALID";
        break;
      default: return "VALID"
    }
  }
  valueChanges(){
    return this.value$;
  }
  statusChanges(){
    return this.status$;
  }

  validate(value){
    //if false set parent errors:{}
    console.log(this.props);
    // later take more than one validator
    if (this.props.validator) {
      this.status$.next(null);
      this.props.validator(value, this.status$);
    }
    else {
      this.status$.next(true);
    }
    //later validator observable subject can send object back with fieldErrorexample: 'field error message' or if error defaulted when false.
  }


  update(value) {
    this.value$.next(value);
    this.validate(value);
  }

  render() {
    return (<div className="formControl"><this.props.element status={this.state.status} fieldName={this.props.fieldName} update={this.update}></this.props.element></div>)
  }
};
export default FormControl;
