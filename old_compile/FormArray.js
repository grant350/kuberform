import FormGroup from './FormGroup.js';
import DefaultContainer from './components/DefaultContainer.js';
import {Observable,merge} from 'rxjs';
import React from 'react';

class FormArray extends React.Component{
  constructor(props){
    super(props);
    this.name = this.props.name;
    this.type = "formArray";
    this.controls = this.props.formArray !== undefined ? this.props.formArray:[];
    this.pending = false;
    this.invalid = false;
    this.value = [];
    this.valid = true;
    this.disabled = false;
    this.htmlContainer = this.props.htmlContainer !== undefined ?  this.props.htmlContainer : DefaultContainer;
    this.errors = [];
    this.status = 'VALID';
    this.containerClass = this.props.containerClass !== undefined ? this.props.containerClass : 'defaultContainer';
    // this.subscribeChanges = this.subscribeChanges.bind(this)
    this.addGroup = this.addGroup.bind(this)
    this.state = {
      controls: this.controls,
      status:this.status,
      value: this.value
    }
  }

  // subscribeChanges(){
  //   var that = this;
  //   var statuses = [];
  //     Observable.create(function(obs) {
  //     that.controls.forEach(control=>{
  //       if ( control.type !== 'formGroup' && control.type !== 'formArray'){
  //         control.VALIDATE(control.value, function(){
  //           control.valueChanges().subscribe(value=>{
  //             control.value = value
  //             that.value.push(value)
  //           }).unsubscribe()
  //           control.statusChanges().subscribe(status=>{
  //             statuses.push(status)
  //           }).unsubscribe()
  //         })
  //       }
  //       });
  //       if (statuses.includes('INVALID')){
  //         obs.next('INVALID')
  //       } else if (statuses.includes('PENDING')){
  //         obs.next('PENDING')
  //       } else {
  //         obs.next('VALID')
  //       }
  //     }).subscribe(status=>{
  //       that.status = status
  //     })

  // }
  editGroup(id){

  }
  deleteGroup(id){

  }
  addGroup(group){
    this.controls.push(group)
    console.log(this.value)

  }

  render(){
    function makeContainer(obj){
      var objcontrols = obj.controls;
      if (!Array.isArray(obj.controls)){
        objcontrols = Object.keys(obj.controls).map(key=>{return obj.controls[key]});
      }
      var container = obj.htmlContainer;
      var controls = [];
      objcontrols.forEach(control=>{
            if (control.htmlContainer){
              controls.push(makeContainer(control))
            } else {
              controls.push(<control value={control.value} name={control.name} state={control.state} validator={control.validator} html={control.html} />)
            }
        })
        if (container !== undefined){
          return container(controls,obj.type);
        } else {
          console.log('no container')
        }
    }
    var html = makeContainer(this);
    return (<div className="formArray">
        {html}
    </div>)
  }

};
export default FormArray;
