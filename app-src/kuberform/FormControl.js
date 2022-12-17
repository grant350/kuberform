import React from 'react';
import { BehaviorSubject } from 'rxjs';
import AbstractControl from './AbstractControl';

class FormControl extends AbstractControl {
  constructor(props) {
    super(props);
    this.state = {
      status: 'VALID',
      value: this.props.defaultValue ? this.props.defaultValue : '',
      errors: null,
      touched: false,
      dirty: false,
      disabled: this.props.disabled,
      enabled: !this.props.disabled
    };

    Object.defineProperty(this, 'controlName', { value: this.props.controlName, writable: false });
    Object.defineProperty(this, 'valueChanges', {
      value: new BehaviorSubject(this.props.defaultValue !== undefined ? this.props.defaultValue : null),
      writable: false
    });
    Object.defineProperty(this, 'onChange', { value: this.onChange.bind(this), writable: false });
    Object.defineProperty(this, 'onBlur', { value: this.onBlur.bind(this), writable: false });
    this.updateOn = this.props.updateOn ? this.props.updateOn : 'change';
    this.asyncValidator = this.props.validators ? this.composeAsyncValidators(this.props.validators) : null;
    this.asyncSubscription = null;
    this.ref = React.createRef();
  }

  componentDidMount() {
    this.setValue(this.state.value, {});
  }

  onChange(e) {
    const VALUE = e.target.value;
    if (this.updateOn === 'change') { this.setValue(VALUE, {}); }
    if (this.state.dirty === false) { this.setDirty(); }
  }

  onBlur(e) {
    const VALUE = e.target.value;
    if (this.updateOn === 'blur') { this.setValue(VALUE, {}); }
    if (this.state.touched === false) { this.setTouched(); }
  }

  render() {
    return (
      <div
        className="formControl"
        ref={this.ref}
        style={this.props.sx}
        onBlur={this.onBlur}
        onChange={this.onChange}
      >
        {React.Children.map(this.props.children, (child)=> React.cloneElement(child, {
          invalid: this.invalid,
          dirty: this.state.dirty,
          value: this.state.value,
          errors: this.state.errors,
          getStatus: this.getStatus,
          touched: this.state.touched,
          status: this.state.status,
          setValue: this.setValue
        }))}
      </div>
    );
  }
}
export default FormControl;
