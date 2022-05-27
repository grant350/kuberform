
import FormControl from './FormControl.js';
import FormArray from './FormArray.js';
import React from 'react';
import {Observable,merge} from 'rxjs';
import {Input,Container} from './components/index';
class FormGroup extends React.Component {

  constructor(props) {
    super(props);
    this.type = "formGroup";
    this.name = this.props.name
    this.state = {
      children:props.form,
      status:  "VALID",
      value: this.props.value? this.props.value: {}
    }
    this.submit = props.submit
    this.makeChildren = this.makeChildren.bind(this);
    this.update = this.update.bind(this);
    this.getData = this.getData.bind(this);
    this.loadValues = this.loadValues.bind(this);
    this.loadValues();
  }

  loadValues(){
    var object = Object.assign({},this.state.children)
    Object.keys(object).forEach( (k)=>{
      var v = object[k];
      if (v.type === "formControl"){
        this.state.value[k] = v.value;
      } else if (v.type === "formArray") {
        console.log('formarray',v)
        var mapped = v.children.map(item=>{
          return item.value
        })
        this.state.value[k] = mapped;
      } else if (v.type === "formGroup"){
        this.state.value[k] = {};
        Object.keys(v.form).forEach(key=>{
          var val = v.form[key].value;
          this.state.value[k][key] = val
        })
      }
    })
  }

  componentDidMount(){
    setTimeout( ()=>{
      this.setState({status:'INVALID'},function(){
        // console.log(this.state)
      });
    },2000)
  }
  update(name,value){
    this.state.children[name].value = value
    this.setState({children:this.state.children},function(){})
  }

  makeChildren(){
    var controls = [];
    Object.keys(this.state.children).forEach( (key, index)=>{
      var child = this.state.children[key];

      if (child.type === 'formControl' ){
        if (child.JSXElement === undefined ){
          child.JSXElement = Input
        }
        controls.push(<FormControl  index={key} update={this.update} JSXElement={child.JSXElement} name={key} value={child.value} status={'VALID'} key={key}/>)
      }
      if (child.type === 'formArray' ){
        if (child.JSXContainer === undefined ){
          child.JSXContainer = Container
        }
        controls.push(<FormArray value={this.state.value[key]} name={key} key={key}  index={key} JSXContainer={child.JSXContainer} form={child.children} />)
      }
      if (child.type === 'formGroup' ){
        if (child.JSXContainer === undefined ){
          child.JSXContainer = Container
        }
        controls.push(<FormGroup value={this.state.value[key]}  name={key}  form={child.form} JSXContainer={child.JSXContainer} key={key} />)
      }
    })
    return controls;
  }

  getData(e){
    return this.state.value
  }

  render() {
     var children = this.makeChildren();
      return (
        <React.Fragment>
        <div className = "formGroup" >
          {/* {this.props.JSXContainer(this.makeChildren())} */}
        <this.props.JSXContainer children={children}></this.props.JSXContainer>
       </div>
        {this.submit? <this.submit getData={this.getData}/>: null}
      </React.Fragment>)
    }

  };
export default FormGroup;
