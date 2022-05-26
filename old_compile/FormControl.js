import React from 'react';
import {Observable,merge} from 'rxjs';
// React.
class FormControl extends React.Component {

  constructor(props) {
    super(props)
    this.name = this.props.name;
    this.type = "formControl";
    this.validator = this.props.validator !== undefined ? this.props.validator : null;
    this.html =this.props.html;
    this.state = {
      value: this.props.value !== undefined && this.props.value !== null ? this.props.value : null,
      status: 'VALID',
      errors:[]
    }
    this.VALIDATE = this.VALIDATE.bind(this);
    this.statusChanges = this.statusChanges.bind(this);
    this.valueChanges = this.valueChanges.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount(){
    console.log('MOUNTED');
    this.VALIDATE(this.state.value)
  }

  getBorder(){
    var status = this.state.status;
    switch (status){
      case 'VALID':return  {borderLeft:"10px solid green"}
      break;
      case 'PENDING': return{borderLeft:"10px solid blue"}
      break;
      default:  return {borderLeft:"10px solid red"};
    }
  }

  valueChanges(){
      var ob = Observable.create((obs)=> {
      obs.next(this.state.value)
    })
    return ob;
  }
  statusChanges(){
    var ob =Observable.create((obs)=> {
      obs.next(this.state.status)
    })
    return ob;
  }

  VALIDATE(value,cb) {
    console.log('validate called')
    var subscription = Observable.create((obs)=> {
      obs.next(null)
      if (this.validator !== null){
        this.validator(value,obs)
      }
    }).subscribe(res => {
      switch (res) {
        case null:
          this.setState({status:'PENDING',value:value});
          if (cb){
            cb('PENDING',value)
          }
          break
        case false:
          this.setState({status:'INVALID',value:value});
          if (cb){
            cb('INVALID',value)
          }
          break;
        default:
          this.setState({status:'VALID',value:value});
          if (cb){
            cb('VALID',value)
          }

      }

    });
    setTimeout(function(){
      subscription.unsubscribe()
    },5000)

  }

  render(){

   return( <div className="formControl">
      {/* {this.html(this)} */}
      <this.html state={this.state} VALIDATE={this.VALIDATE}/>
    </div>
   )
  }
}
export default FormControl