import React from 'react';
import {Observable,BehaviorSubject} from 'rxjs';
class FormControl extends React.Component {

  constructor(props) {
    super(props)
    this.name = this.props.name;
    this.type = "formControl"
    this.validator = this.props.validator;
    this.required = props.required;
    this.update = this.update.bind(this);
    this.value = this.props.value? this.props.value: '';
    this.status = this.props.status? this.props.status: "VALID";
    console.log('formcontrol',this)
  }

  componentDidMount(){
    if (this.props.parent.type === 'formGroup'){
      this.props.setParent(this.name,this.value)
    }
    if (this.props.parent.type === 'formArray'){
      console.log('index',this.props.index)
      this.props.setParent(this.props.index,this.value)
    }

    // this.VALIDATE(this.name,this.index,this.value,this.validator);
  }

  // VALIDATE(value,validator) {
  //     this.props.subject$.next(null)
  //     if (validator !== null && validator !== undefined){
  //           validator(value,this.props.subject$)
  //         } else {
  //           this.props.subject$.next(true)
  //     }
  // }


  update(value){
    // this.VALIDATE(value,this.validator)
    if (this.props.parent.type === 'formGroup'){
      this.props.setParent(this.name,value)
    }
    if (this.props.parent.type === 'formArray'){
      console.log('index',this.props.index)
      this.props.setParent(this.props.index,value)
    }
  }

  render(){
   return( <div className="formControl">

            <this.props.JSXElement labelName={this.name} update={this.update} border={"red"} name={this.props.name}  value={this.props.value } status={this.props.status}/>
    </div>
   )
  }
}
export default FormControl;