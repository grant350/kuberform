import React from 'react';
import { BehaviorSubject } from 'rxjs';
import AbstractControl from './AbstractControl';
// import FormError from './FormError.js';
/* @extends React.Component */
class FormArray extends AbstractControl {
  constructor(props) {
    super(props);
    this.state = {
      value: [], status: 'VALID', touched: false, dirty: false
    };
    this.controls = [];
    Object.defineProperty(this, 'arrayName', { value: this.props.arrayName, writable: false });
    Object.defineProperty(this, 'valueChanges', { value: new BehaviorSubject({}), writable: false });
    this.reduceChildren = this.reduceChildren.bind(this);
    this.recurseDom = this.recurseDom.bind(this);
    Object.defineProperty(this, 'clonedChildren', {
      value: this.recurseDom(this.props.children, this.controls, 0), writable: false
    });
  }

  recurseDom(children, controls, depth) {
    // changing to function
    // eslint-disable-next-line consistent-return
    return React.Children.map(children, (child)=> {
      if (child.props) {
        if (child.props.controlName) {
          const NEWREF = (element)=> {
            // check if control already exists in array.
            controls.push(element);
          };
          // child.props.children.hasOwnProperty('type')
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
            controls.push(element);
          };
          return React.cloneElement(child, { parent: this, ref: NEWREF });
        }
        if (child.props.arrayName) {
          const NEWREF = (element)=> {
            controls.push(element);
          };
          return React.cloneElement(child, { parent: this, ref: NEWREF });
        }
        if (child.props.children
          && child.props.groupName === undefined
          && child.props.arrayName === undefined) {
          return React.cloneElement(child, {
            children: this.recurseDom(child.props.children, controls, depth + 1)
          });
        }
      } else {
        return child;
      }
    });
  }

  getControl(index) { return this.controls[index]; }

  setValue(value) {
    value.forEach((controlValue, index)=> {
      this.controls[index].setValue(controlValue);
    });
  }

  anyControls(condition) {
    for (let i = 0; i < this.controls.length; i++) {
      if (condition(this.controls[i])) {
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
    const NEW_VALUE = this.controls.reduce((acc, control, index)=> {
      acc[index] = control.getValue();
      return acc;
    }, []);
    this.setState({ value: NEW_VALUE });
    this.valueChanges.next(NEW_VALUE);
  }

  updateValue() {
    this.reduceChildren();
  }

  render() {
    return (
      // eslint-disable-next-line react/no-unknown-property
      <div className="formArray" sx={this.props.sx}>
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

export default FormArray;
