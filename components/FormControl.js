import React from 'react';
import {Observable,BehaviorSubject} from 'rxjs';
class FormControl extends React.Component {

  constructor(props) {
    super(props)
    this.name = this.props.name;
    this.type = "formControl"
    this.validator = this.props.validator? this.props.validator:null;
    this.required = props.required;
    this.update = this.update.bind(this);
    this.value = this.props.value? this.props.value: '';
    this.status = this.props.status? this.props.status: "VALID";
    this.subject$;
    this.state={status:'VALID'}
  }


  componentDidMount(){
    this.subject$ = new BehaviorSubject(null);
    this.update(this.value)

  }

  update(value){
    this.subject$.next(true);
      if (this.props.validator){
        this.subject$.next(null);
        this.props.validator(value,this.subject$);
      }
      this.subject$.subscribe((x)=>{
      var status;
      if (x === null){
        status = 'PENDING'
      } else if (x === false){
        status ='INVALID'
      } else {
        status = "VALID"
      }
      if (this.props.parent.type === 'formGroup'){
        this.props.setParent(this.name,value,status)
        this.setState({status:status})
      }
      if (this.props.parent.type === 'formArray'){
        this.props.setParent(this.props.index,value,status)
        this.setState({status:status})
      }
    })
  }

  render(){
    var getBorder = ()=>{
      if (this.state.status === "VALID") {
        return "#36bc78"
      } else if (this.state.status === "PENDING") {
        return "#f2da33";
      } else {
        return "#cb1842";
      }
    }

   return( <div className="formControl">

            <this.props.JSXElement labelName={this.name} update={this.update} border={getBorder()} name={this.props.name}  value={this.props.value } status={this.props.status}/>
    </div>
   )
  }
}
export default FormControl;