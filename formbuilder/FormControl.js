import React from 'react';
import { Observable, BehaviorSubject, map, take, Subject } from 'rxjs';
import AbstractControl from './AbstractControl';

class FormControl extends AbstractControl {
  constructor(props) {
    super(props)
    this.value$ = new BehaviorSubject(this.props.value ? this.props.value : '')
    this.state = { status: "VALID", errors: null };
    this.errors = null
  }

  componentDidMount() {
    this.setValue(this.props.value ? this.props.value : '');
  }

  validate(value) {
    if (this.props.validators === undefined || this.props.validators === null || !Array.isArray(this.props.validators)) {
      throw new SyntaxError("validators is not of type Array")
    }
    if (this.props.validators.length > 0) {
      this.status$.next("PENDING");
      this.setState({ status: "PENDING" });
    }
    this.props.validators.forEach(validator => {
      const observable = new Observable((error$) => {
        validator(value, error$);
      }).pipe(
        take(1)
      ).subscribe(errors => {
        if (typeof errors === "object") {
            this.setErrors(errors);
        } else {
          throw new SyntaxError('validator observable did not return an object')
        }
      });
    })
  }

  render() {
    return (<div className="formControl"><this.props.element errors={this.state.errors} label={this.props.label} status={this.state.status} fieldName={this.props.fieldName} setValue={this.setValue}></this.props.element></div>)
  }
};
export default FormControl;
