import React from 'react';
import {
  Observable,
  BehaviorSubject,
  forkJoin,
  map
} from 'rxjs';
// import ReactDOM from 'react-dom';
import ErrorHandler from './ErrorHandler';

class AbstractControl extends React.Component {
  constructor(props) {
    super(props);
    // eslint-disable-next-line react/no-unused-class-component-methods
    this.errorHandler = new ErrorHandler(this);
    Object.defineProperty(this, 'statusChanges', { value: new BehaviorSubject('VALID'), writable: false });
  }

  // eslint-disable-next-line react/no-unused-class-component-methods
  getErrors() {
    const { STATE } = this.state;
    return STATE.errors;
  }

  // eslint-disable-next-line react/no-unused-class-component-methods
  getValue() {
    const { STATE } = this.state;
    return STATE.value;
  }

  // eslint-disable-next-line react/no-unused-class-component-methods
  getStatus() {
    const { STATE } = this.state;
    return STATE.status;
  }

  setStateAndView(obj, fn) {
    this.setState(obj, ()=> {
      // do something to disable the inputs
      fn();
    });
  }

  // eslint-disable-next-line react/no-unused-class-component-methods
  get invalid() {
    const { STATE } = this.state;
    return STATE.status === 'INVALID';
  }

  // eslint-disable-next-line react/no-unused-class-component-methods
  setTouched(options) {
    this.setStateAndView({ touched: true }, ()=> {
      if (this.parent && !options.onlySelf) { this.parent.setTouched(options); }
    });
  }

  // eslint-disable-next-line react/no-unused-class-component-methods
  setDirty(value, options) {
    this.setStateAndView({ dirty: true }, ()=> {
      if (this.parent && !options.onlySelf) { this.parent.setDirty(options); }
    });
  }

  // eslint-disable-next-line react/sort-comp
  isDisabled() {
    const { STATE } = this.state;
    return STATE.disabled;
  }

  calculateStatus() {
    const { STATE } = this.state;
    if (STATE.errors) {
      return 'INVALID';
    } if (this.anyControlsHaveStatus('INVALID')) {
      return 'INVALID';
    } if (this.isDisabled()) {
      return 'DISABLED';
    } if (this.anyControlsHaveStatus('PENDING')) {
      return 'PENDING';
    }
    return 'VALID';
  }

  anyControlsHaveStatus(status) {
    return this.anyControls((control)=> control.state.status === status);
  }

  anyControls(condition) {
    condition(this);
  }

  // eslint-disable-next-line react/no-unused-class-component-methods
  composeAsyncValidators(validators) {
    return validators != null ? this.mergeValidators(validators) : null;
  }

  mergeValidators() {
    const PROPS = this.props;
    return (control)=> {
      const ASYNC_OBSERVABLES = PROPS.validators.map(
        (validator)=> new Observable((error$)=> validator(control, error$))
      );
      return forkJoin(ASYNC_OBSERVABLES).pipe(map(this.mergeErrors));
    };
  }

  mergeErrors(arrayOfErrors) {
    let totalErrors = {};
    arrayOfErrors.forEach((errorsObj)=> {
      if (errorsObj !== null) {
        totalErrors = Object.assign(totalErrors, errorsObj);
      }
    });
    return Object.keys(totalErrors).length === 0 ? null : totalErrors;
  }

  updateControlsErrors() {
    const STATUS = this.calculateStatus();
    this.setStateAndView({ status: STATUS }, ()=> {
      this.statusChanges.next(STATUS);
      if (this.parent) {
        this.parent.updateControlsErrors();
      }
    });
  }

  setErrors(errorObject) {
    this.setStateAndView({ errors: errorObject }, ()=> {
      this.updateControlsErrors();
    });
  }

  runAsyncValidator() {
    if (this.asyncValidator) {
      this.setStateAndView({ status: 'PENDING' }, ()=> {
        this.asyncSubscription = this.asyncValidator(this).subscribe((errs)=> {
          this.setErrors(errs);
        });
      });
    }
  }

  // eslint-disable-next-line class-methods-use-this
  updateValue() {
    // do nohing as theres no controls to update
  }

  setInitialStatusAndErrors(cb) {
    this.setStateAndView({ status: this.isDisabled() ? 'DISABLED' : 'VALID', errors: null }, cb);
  }

  updateValueAndValidity(options) {
    this.setInitialStatusAndErrors(()=> {
      const STATUS = this.calculateStatus();
      const PROPS = this.props;
      const { STATE } = this.state;
      this.updateValue();
      this.setStateAndView({ STATUS }, ()=> {
        if (STATE.enabled) {
          if (this.asyncSubscription) { this.asyncSubscription.unsubscribe(); }
          if (STATE.status === 'VALID' || STATE.status === 'PENDING') {
            this.runAsyncValidator(options);
          }
        }
        this.valueChanges.next(STATE.value);
        this.statusChanges.next(STATE.status);
        if (PROPS.parent && !options.onlySelf) {
          PROPS.parent.updateValueAndValidity(options);
        }
      });
    });
  }

  // eslint-disable-next-line react/no-unused-class-component-methods
  setValue(value, options) {
    this.setStateAndView({ value }, ()=> {
      this.updateValueAndValidity(options);
    });
  }
}

export default AbstractControl;
