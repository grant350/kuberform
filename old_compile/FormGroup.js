
import FormControl from './FormControl.js';
import FormArray from './FormArray.js';
import DefaultContainer from './components/DefaultContainer.js';
import React from 'react';
import {Observable,merge} from 'rxjs';

class FormGroup extends React.Component {

  constructor(props) {
    super(props);
    this.controls = {};
    this.name = this.props.name!== undefined && this.props.name !== null ? this.props.name : 'mainformgroup';
    this.type = "formGroup";
    this.htmlContainer = this.props.htmlContainer !== undefined && this.props.htmlContainer !== null ? this.props.htmlContainer : DefaultContainer;
    this.disabled = false;
    this.containerClass = this.props.containerClass !== undefined ? this.props.containerClass : 'defaultContainer';
    this.makeControls = this.makeControls.bind(this);
    this.subscribeChanges = this.subscribeChanges.bind(this)
    this.state = {
      controls: this.controls,
      errors: [],
      status: 'VALID',
      value: {}
    }
    this.updateState = this.updateState.bind(this);
    // this.makeControls();
    // function makeContainer(obj){
    //   var objcontrols = obj.controls;
    //   if (!Array.isArray(obj.controls)){
    //     objcontrols = Object.keys(obj.controls).map(key=>{return Object.assign(obj.controls[key],{name:key})});
    //   }
    //   // console.log('objcontrols',objcontrols)
    //   var container = obj.htmlContainer;
    //   var controls = [];
    //   objcontrols.forEach(control=>{
    //         if (control.type === 'formGroup' || control.type === 'formArray'){
    //           controls.push(makeContainer(control))
    //         } else {
    //           controls.push(<control value={control.value} name={control.name} state={control.state} validator={control.validator} html={control.html} />)
    //         }
    //     })
    //     if (container !== undefined && container !==  null){
    //       return container(controls,obj.type);
    //     } else {
    //       console.log('no container')
    //     }
    // }
    // this.html = makeContainer(this);

  }

  componentDidMount(){
    // this will go to async when finished its either invalid| valid
    console.log('called did mount');
      //  console.log('html',this.html.props.children[2].props.children.props.children[0].props)
    this.subscribeChanges();
  }

   subscribeChanges(){
    //this is asnch so it will place status as pending so looks all good. glad it works
    var tmpstate={}
      Observable.create((obs)=> {
        var statuses=[];
      Object.keys(this.state.controls).forEach(k=>{
        if ( this.state.controls[k].type !== 'formGroup' && this.state.controls[k].type !== 'formArray'){
          this.state.controls[k].VALIDATE(this.state.controls[k].state.value,(status,value)=>{
            statuses.push(status)
            tmpstate[k] = value
          })
        }
        });
        if (statuses.includes('INVALID')){
          obs.next('INVALID')
        } else if (statuses.includes('PENDING')){
          obs.next('PENDING')
        } else {
          obs.next('VALID')
        }
      }).subscribe(status=>{
        console.log('setting state')
        this.setState({status:status,value:tmpstate})
        tmpstate={};
      });
//store statuss in map object turn to array to check but change only one at a time not run this entire thing every time
  }


  formControl(obj) {
    var setStatus;
    var validator;
    var showStatus;
    if (obj.showStatus){
      showStatus=obj.showStatus
    }
    if (obj.validator){
      validator=obj.validator
    }
    // console.log(obj)

    return new FormControl({'name':obj.name, 'value':obj.value, 'html':obj.html, 'validator':validator});
  }

  formArray(obj) {
    var items = [];
    obj.controls.forEach(item => {
      if (item.type === 'formControl') {
        items.push(this.formControl(item))
      } else if (item.type === 'formArray') {
        items.push(this.formArray(item))
      } else if (item.type === 'formGroup'){
        items.push(this.formGroup(item,{}))
      }
    })
    return new FormArray({'name':obj.name, 'formArray':items, 'htmlContainer':obj.htmlContainer,'containerClass':obj.containerClass})
  }
  formGroup(obj,formobject) {
      // console.log('obj',obj)
      if (obj.controls){
    Object.keys(obj.controls).forEach(key => {
      console.log('key',key)
      var item = obj.controls[key];
      if (item.type === 'formControl') {
        formobject[key] = this.formControl(item)
      } else if (item.type === 'formArray'){
        formobject[key] = this.formArray(item)
      } else if (item.type === 'formGroup'){
        formobject[key] = this.formGroup(item,{})
      }
    })

  }
  console.log('formObject',formobject)

    var fg =  new FormGroup({'name':obj.name, 'formObject':formobject, 'htmlContainer':obj.htmlContainer,'containerClass':obj.containerClass});
    return fg;
  }



  updateState(cb){
    this.setState({status:'INVALID'},function(){
      cb(this.state)
    });
  }
  makeControls(){
    var formObject = this.props.formObject
    if (formObject){
       return  this.formGroup({'controls':formObject},{});
    } else {
      throw new Error('no form object provided')
    }
    console.log('controls',this.controls);
  }

  render() {


    return ( <div className = "formGroup" >
        <span className="update" onClick={this.updateState}> </span>
        {this.html}
      </div>)
    }



  };
export default FormGroup;
