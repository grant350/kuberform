import FormGroup from './FormGroup.js';
import FormControl from './FormControl.js';
import {BehaviorSubject} from 'rxjs';
import React from 'react';
import {Input,Container} from './index.js';

class FormArray extends React.Component{
  constructor(props){
    super(props);
    this.type = "formArray";
    this.name = this.props.name
    console.log('props in formarray',this.props)
    this.state = {
      value: this.props.value? this.props.value: [],
      status: this.props.status? this.props.status: "VALID",
      ctls:this.props.controls,
      statuses:[],
      color:"#36bc78"
    }
    //setting the value types
    this.setControlType = this.setControlType.bind(this)
    this.setControlType();

    //children
    this.makeChildren = this.makeChildren.bind(this);
    this.addChild = this.addChild.bind(this);
    this.removeChild = this.removeChild.bind(this);
    this.resetControl= this.resetControl.bind(this);

    // rxjs
    this.subject$ = new BehaviorSubject(null);
    this.VALIDATE = this.VALIDATE.bind(this);

    // a copy of control to add controls to array
    this.copy = Object.assign({}, this.props.controls.slice(0,1)[0]);
    //this function return the color type for validity
    this.statusToColor = this.statusToColor.bind(this);
  }
  //last but not least is to change value from [] to put in controls.
  setControlType(){
    this.props.controls.forEach((control,index)=>{
      var empty = '';
      if (control.type === "formArray"){
        empty=[];
      } else if (control.type === "formGroup"){
        empty={};
      }
      this.state.value[index]=control.value? control.value:empty;
      this.state.statuses[index]=control.status? control.status:'VALID';
    });
  }

  VALIDATE(name,index,value,validator) {
    this.index= index;
    this.state.value[index] = value;
    this.setState({value:this.state.value},()=>{
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
      console.log('in subscriber',res);
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
      if (this.state.statuses.includes('INVALID')){
        parentStatus = 'INVALID'
      } else if (Object.values(this.state.statuses).includes('PENDING')){
        parentStatus= 'PENDING'
      } else {
        parentStatus= 'VALID'
      }
     var color = this.statusToColor(parentStatus);
     console.log('fA color',color)
     console.log('fA status',status);
      this.setState({color:color,status:status},function(){
        console.log('fA',this.state)

        if (this.props.VALIDATE){
          // this.props.VALIDATE(this.name,this.props.index,this.state.value);
        }
      });
    });
  }
  resetControl(control,keepcontrols){
    var removeValues = (control)=>{
      control = Object.assign({},control);
        if (control.type == "formArray"){
          if (!keepcontrols || keepcontrols === undefined){
          control.controls = control.controls.slice(0,1).map((ctl,index)=>{
            return removeValues(ctl)
          })
        } else {
          control.controls = control.controls.slice(0).map((ctl,index)=>{
            return removeValues(ctl)
          })
        }

        } else if (control.type == "formGroup"){
          Object.keys(control.controls).forEach(key=>{
            var ctl = control.controls[key];
            control.controls[key] = removeValues(ctl)
          })
        }
        else if (control.type  === "formControl"){
          if (control.keepvalue){
            //keep the value
          } else {
            control.value = undefined
          }
        }
        return control;
    }

    var result= removeValues(control);
    return result;
  }
    makeChildren(ctls){
     return  ctls.map( (child, index)=>{
        if (child.type === 'formControl' ){
          if (child.JSXElement === undefined ){
            child.JSXElement = Input;
          }
          console.log(child.validator);
          return <FormControl validator={child.validator}  VALIDATE={this.VALIDATE} index={index}  JSXElement={child.JSXElement} name={child.name} key={index}  value={this.state.value[index]} status={this.state.statuses[index]} />
          }
        if (child.type === 'formArray' ){
          if (child.JSXContainer === undefined ){
            child.JSXContainer = Container;
          }
          return  <FormArray index={index} VALIDATE={this.VALIDATE} value={this.state.value[index]} name={child.name} key={index}  JSXContainer={child.JSXContainer} controls={child.controls} />;
        }
        if (child.type === 'formGroup' ){
          if (child.JSXContainer === undefined ){
            child.JSXContainer = Container;
          }
          return <FormGroup index={index} VALIDATE={this.VALIDATE} value={this.state.value[index]}  name={child.name}  key={index}  controls={child.controls} JSXContainer={child.JSXContainer} />;

        }
      })
    }

  addChild(){
    this.state.ctls.push(this.resetControl(this.copy))
    this.setState({ctls:this.state.ctls});
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
  removeChild(index){
    if (index === undefined ){
      index == this.state.ctls.lenght -1;
    }
    if (this.state.ctls.length >0){
      this.state.ctls.splice(index,1);
      this.setState({ctls:this.state.ctls});
    }
  }

  render(){
    return (
      <React.Fragment>
    <div className="formArray" style={{"borderLeft":"10px solid " +this.state.color}}>
      <this.props.JSXContainer children={this.makeChildren(this.state.ctls)} />
    </div>
    <button onClick={this.addChild}> addChild</button>
    <button onClick={this.removeChild}> removeChild</button>

    </React.Fragment>
    )
  }

};
export default FormArray;
