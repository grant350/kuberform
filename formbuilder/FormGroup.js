//
// import FormControl from './FormControl.js';
// import FormArray from './FormArray.js';
import React from 'react';
import { Observable, BehaviorSubject, mergeMap, map } from 'rxjs';

class FormGroup extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      value: {},
      status: "VALID",
      statuses: {},
      ref: {}
    }
    this.ref = {};

    this.children = React.Children.map(this.props.children, (child) => {
      if (child.props.fieldName) {
        this.ref[child.props.fieldName] = React.createRef();
        return React.cloneElement(child, { parent: this, status:this.state.status,ref: this.ref[child.props.fieldName] })
      } else if (child.props.groupName) {
        this.ref[child.props.groupName] = React.createRef();
        return React.cloneElement(child, { ref: this.ref[child.props.groupName],status:this.state.status })
      }
    })
    // console.log('children',this.children)
  }

  getParent(){
    return this;
  }

  getStatus(){
    return this.state.status;
  }

  getValue(){
    return this.state.value
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

  componentDidMount() {
    var checkStatuses = (status) => {
      if (Object.values(this.state.statuses).includes(null)) {
        this.setState({ status: this.getStatusString(null), statuses: this.state.statuses })
      } else if (Object.values(this.state.statuses).includes(false)) {
        this.setState({ status: this.getStatusString(false), statuses: this.state.statuses })
      } else {
        this.setState({ status: this.getStatusString(true), statuses: this.state.statuses })
      }
      console.log(this.state);
    }
    Object.keys(this.ref).forEach(key => {
      const child = this.ref[key];
      if (child.current !== null) {
        if (child.current.status$) {
          child.current.status$.subscribe(status => {
            this.state.statuses[key] = status;
            console.log('status',key,status)
            checkStatuses(status);
          })
        }
        if (child.current.value$) {
          child.current.value$.subscribe(val => {
            this.state.value[key] = val;
            this.setState({ value: this.state.value }, () => {
            })
          })
        }
      }
    });
  }



  render() {
    return (
      <div className="formGroup">
        {this.props.container ? <this.props.container>{this.children}</this.props.container> : <React.Fragment>{this.children}</React.Fragment>}
      </div>)
  }
};
export default FormGroup;
