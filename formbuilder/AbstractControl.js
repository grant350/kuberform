import React from 'react';
import { Observable, BehaviorSubject, map,take,Subject } from 'rxjs';

class AbstractControl extends React.Component {
  constructor(props) {
    super(props)
    // this.state = {value: null, status: "VALID"}
    this.status$ = new BehaviorSubject("VALID");
    this.setValue = this.setValue.bind(this);
    this.valueChanges= this.valueChanges.bind(this);
    this.statusChanges= this.statusChanges.bind(this);
    this.setErrors = this.setErrors.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.calculateStatus = this.calculateStatus.bind(this);
    this.anyControlsHaveStatus = this.anyControlsHaveStatus.bind(this);
    this.anyControls = this.anyControls.bind(this);
  }

  getRawValue(){
    return this.state.value;
  }
  updateStatus(status){
    this.setState({status:status},()=>{
      this.status$.next(status);
    });
  }

  calculateStatus(){
    if (this.state.errors !== null) {
      return "INVALID"
    } else
    if (this.anyControlsHaveStatus("INVALID")){
      return "INVALID"
    } else {
    return "VALID";
    }
  }

  anyControlsHaveStatus(status){
    return this.anyControls( (control)=>{return control.status == status})
  }

  anyControls(condition){
    condition(this.state);
  }

  setErrors(errorObject){
    if (errorObject !== null){
      this.setState({errors:errorObject},()=>{
        const status = this.calculateStatus();
        console.log('statu',status);
        this.status$.next(status)
        this.setState({status:status});
      });
    } else {
      const status = this.calculateStatus();
      console.log('statu',status);
      this.status$.next(status)
      this.setState({status:status});
    }
  }

  valueChanges(){
    return this.value$.asObservable();
  }
  statusChanges(){
    return this.status$.asObservable();
  }

  setValue(value) {
    this.value$.next(value);
    if (this.props.validators) {
      this.validate(value);
    }
  }

};
export default AbstractControl;
