//
// import FormControl from './FormControl.js';
// import FormArray from './FormArray.js';
import React from 'react';
import {Observable,BehaviorSubject,mergeMap,map} from 'rxjs';
// import {Input,Container} from './index.js';

class FormArray extends React.Component {
    constructor(props){
      super(props)
    }

    render(){
      return( <div className="formArray">{this.props.children}</div>)
    }
  };
export default FormArray;
