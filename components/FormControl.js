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
    this.subject$ = new BehaviorSubject(null);;
  }


  componentDidMount(){
    this.update(this.value)
  }

  update(value){
    setTimeout(()=>{
      if (this.validator){
        this.subject$.next(null);
          this.props.validator(value,this.subject$);
      } else {
        this.subject$.next(true);
      }
      this.subject$.subscribe((x)=>{
      var status;
      if (x === null){
        status = 'PENDING'
      } else if (x === false){
        status ='INVALID'
      } else if (x === true){
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
  },50);

  }

  render(){
    var getBorder = ()=>{
      if (this.props.status === "VALID") {
        return "#36bc78"
      } else if (this.props.status === "PENDING") {
        return "#f2da33";
      } else if (this.props.status === "INVALID") {
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