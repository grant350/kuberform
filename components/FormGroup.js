
import FormControl from './FormControl.js';
import FormArray from './FormArray.js';
import React from 'react';
import {Observable,BehaviorSubject,mergeMap,map,forkJoin} from 'rxjs';
import {Input,Container} from './index.js';

class FormGroup extends React.Component {
  // Cannot create property 'firstname' on string 'a'
  // _this2.state.value[key] = value;
  constructor(props) {
    super(props);
    this.type = "formGroup";
    this.name = this.props.name;

    this.state = {
      value: this.props.value? this.props.value: {},
      status: this.props.status? this.props.status: "VALID",
      ctls:this.props.controls,
      statuses:{},
      color:"#36bc78"
     }

     Object.keys(this.props.controls).forEach(k=>{
      var empty = '';
      if (this.props.controls[k].type === "formArray"){
        empty=[];
      } else if (this.props.controls[k].type === "formGroup"){
        empty={};
      }
       this.state.value[k] = this.props.controls[k].value? this.props.controls[k].value: empty;
     });
    // this.subscribeChanges = this.subscribeChanges.bind(this);
    this.makeChildren = this.makeChildren.bind(this);
    // this.makeChildren();


    this.submit = this.props.submit? this.props.submit:null;
    this.getData = this.getData.bind(this);
    // this.checkStatusControls = this.checkStatusControls.bind(this);
    this.statusToColor = this.statusToColor.bind(this);
    this.VALIDATE = this.VALIDATE.bind(this);
    this.subject$ = new BehaviorSubject(null);

  }

componentDidMount(){}

VALIDATE(name,index,value,validator) {
  this.index = name
  this.state.value[name] = value;
  this.setState({value: this.state.value},()=>{
    this.subject$.next(null)
    if (validator !== null && validator !== undefined){
          validator(value,this.subject$)
        } else {
          this.subject$.next(true)
      }
  })



}
componentDidMount(){
  this.subject$.next(true);
  this.subject$.subscribe(res => {
    var status;
    switch (res) {
      case null:
        status = 'PENDING'
        break
      case false:
        status = 'INVALID';
        break;
      default:
        status = 'VALID';
    }

    this.state.statuses[this.index] = status;

    var parentStatus;
    if (Object.values(this.state.statuses).includes('INVALID')){
      parentStatus = 'INVALID'
    } else if (Object.values(this.state.statuses).includes('PENDING')){
      parentStatus= 'PENDING'
    } else {
      parentStatus= 'VALID'
    }
   var color = this.statusToColor(parentStatus);
   console.log('fg color',color)
   console.log('fg status',status);
    this.setState({color:color,value:this.state.value,status:status},function(){
      console.log('fg',this.state)
      if (this.props.VALIDATE){
        //set parent not validate;
        // this.props.VALIDATE(this.name,this.props.index,this.state.value);
      }
    });
  });
}

setParent(key,value){
  //key = value
  //set state
}
  makeChildren(ctls){

   return Object.keys(ctls).map( (key, index)=>{
      var child = ctls[key];

      if (child.type === 'formControl' ){
        if (child.JSXElement === undefined ){
          child.JSXElement = Input;
        }
        return <FormControl validator={child.validator} parent={this} VALIDATE={this.VALIDATE} index={index}  JSXElement={child.JSXElement} name={key} value={this.state.value[key]} status={this.state.statuses[key]} key={key}/>
        }
      if (child.type === 'formArray' ){
        if (child.JSXContainer === undefined ){
          child.JSXContainer = Container;
        }
        return  <FormArray parent={this} VALIDATE={this.VALIDATE} value={this.state.value[key]} name={key} key={key}  index={index} JSXContainer={child.JSXContainer} controls={child.controls} />;
      }
      if (child.type === 'formGroup' ){
        if (child.JSXContainer === undefined ){
          child.JSXContainer = Container;
        }
        return <FormGroup parent={this} VALIDATE={this.VALIDATE} value={this.state.value[key]} index={index}  name={key}  controls={child.controls} JSXContainer={child.JSXContainer} key={key} />;

      }
    })
  }

  getData(e){
    return this.state.value
  }
  statusToColor(status){
    if (status === "VALID") {
      return "#36bc78"
    } else if (status === "PENDING") {
      return "#f2da33";
    } else {
      return "#cb1842";
    }
  }

  render() {
      return (
        <React.Fragment>
        <div className = "formGroup"  style={{"borderLeft":"10px solid " +this.state.color}}>
        <this.props.JSXContainer children={this.makeChildren(this.state.ctls)}/>
       </div>
        {this.submit? <this.submit getData={this.getData}/>: null}
      </React.Fragment>)
    }

  };
export default FormGroup;
