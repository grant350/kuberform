import React from 'react';
import { BehaviorSubject } from 'rxjs';
import AbstractControl from './AbstractControl';
import FormError from './FormError';

class FormGroup extends AbstractControl {
  constructor(props) {
    super(props);
    this.state = {
      value: {}, status: 'VALID', touched: false, dirty: false
    };
    this.controls = {};

    Object.defineProperty(this, 'groupName', { value: this.props.groupName, writable: false });
    Object.defineProperty(this, 'valueChanges', { value: new BehaviorSubject({}), writable: false });
    this.reduceChildren = this.reduceChildren.bind(this);
    this.recurseDom = this.recurseDom.bind(this);
    Object.defineProperty(this, 'clonedChildren', {
      value: this.recurseDom(this.props.children, this.controls, 0), writable: false
    });
  }

  recurseDom(children, controls, depth) {
    return React.Children.map(children, (child)=> {
      if (child.props) {
        if (child.props.controlName) {
          const NEWREF = (element)=> {
            if (controls[child.props.controlName]) {
              throw new FormError('duplicate controlName');
            }
            // eslint-disable-next-line no-param-reassign
            controls[child.props.controlName] = element;
          };
          if (Object.prototype.hasOwnProperty.call(child.props.children, 'type') === false) {
            return React.cloneElement(child, {
              ref: NEWREF,
              parent: this,
              defaultValue: child.props.defaultValue,
              children: <child.props.children />
            });
          }
          return React.cloneElement(child, {
            ref: NEWREF, parent: this, defaultValue: child.props.defaultValue
          });
        }
        if (child.props.groupName) {
          const NEWREF = (element)=> {
            if (controls[child.props.groupName]) {
              throw new FormError('duplicate groupName');
            }
            // eslint-disable-next-line no-param-reassign
            controls[child.props.groupName] = element;
          };
          return React.cloneElement(child, { parent: this, ref: NEWREF });
        }
        if (child.props.arrayName) {
          const NEWREF = (element)=> {
            if (controls[child.props.arrayName]) {
              throw new FormError('duplicate arrayName');
            }
            // eslint-disable-next-line no-param-reassign
            controls[child.props.arrayName] = element;
          };
          return React.cloneElement(child, { parent: this, ref: NEWREF });
        }
        if (child.props.children && child.props.groupName === undefined && child.props.arrayName === undefined) {
          return React.cloneElement(child, { children: this.recurseDom(child.props.children, controls, depth + 1) });
        }
      }
      return child;
    });
  }

  getControl(control) { return this.controls[control]; }

  setValue(value) {
    Object.keys(value).forEach((name)=> {
      this.controls[name].setValue(value[name]);
    });
  }

  anyControls(condition) {
    // may cause issues
    const ENTRIES = Object.entries(this.controls);
    for (let i = 0; i < ENTRIES.length; i++) {
      const CONTROL = ENTRIES[i][1];
      if (condition(CONTROL)) {
        return true;
      }
    }
    return false;
  }

  reduceObject(object, fn, initValue) {
    if (Array.isArray(initValue) || typeof initValue === 'string') {
      throw new SyntaxError('initial value must be an object!');
    }
    Object.keys(object).forEach((key)=> {
      // eslint-disable-next-line no-param-reassign
      initValue = fn(initValue, object[key], key);
    });
    return initValue;
  }

  reduceChildren() {
    const NEW_VALUE = this.reduceObject(this.controls, (acc, control, key)=> {
      acc[key] = control.getValue();
      return acc;
    }, {});
    this.setState({ value: NEW_VALUE });
    this.valueChanges.next(NEW_VALUE);
  }

  updateValue() {
    this.reduceChildren();
  }

  render() {
    return (
      // eslint-disable-next-line react/no-unknown-property
      <div className="formGroup" sx={this.props.sx}>
        {React.Children.map(this.clonedChildren, (child)=> {
          if (child.props.container) {
            return React.cloneElement(child, { status: this.state.status });
          }
          return child;
        })}
      </div>
    );
  }
}
export default FormGroup;
