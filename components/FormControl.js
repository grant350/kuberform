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
    this.statusToColor = this.statusToColor.bind(this);
    this.value = this.props.value? this.props.value: null;
    this.status = this.props.status? this.props.status: "VALID";
    // this.subject$ = new BehaviorSubject({value:this.props.value, status:this.props.status});
    // this.subject$.next =  this.subject$.next.bind(this.subject$);
    // this.changes = this.changes.bind(this);
    // this.VALIDATE = this.VALIDATE.bind(this);
  }
  componentDidMount(){
    // this.props.VALIDATE(this.name,this.props.index,this.props.value,this.props.validator);
  }



  statusToColor(){
    if (this.props.status === "INVALID") {
      return "#cb1842"
    } else if (this.props.status === "PENDING") {
      return "#f2da33";
    } else {
      return "#36bc78";
    }
  }

  update(value){
    this.props.VALIDATE(this.name,this.props.index,value,this.props.validator)
  }

  render(){
   return( <div className="formControl">
            <this.props.JSXElement update={this.update} border={this.statusToColor()} name={this.props.name}  value={this.props.value } status={this.props.status}/>
    </div>
   )
  }
}
export default FormControl;