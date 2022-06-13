
import FormControl from './FormControl.js';
import FormArray from './FormArray.js';
import React from 'react';
import {Observable,BehaviorSubject,mergeMap,map,forkJoin} from 'rxjs';
import {Input,Container} from './index.js';

class FormGroup extends React.Component {
  constructor(props) {
    super(props);
    this.type = "formGroup";
    this.name = this.props.name;
    this.Container = this.props.JSXContainer? this.props.JSXContainer:Container;
    this.state = {
      value: this.props.value? this.props.value: {},
      status: this.props.status? this.props.status: "VALID",
      controls:this.props.controls,
      statuses:{},
      color:"#36bc78"
     }

     Object.keys(this.props.controls).forEach(key=>{
       switch (this.props.controls[key].type){
        case 'formControl': this.state.value[key] = "";
        break;
        case 'formArray': this.state.value[key] = [];
        break;
        case 'FormGroup': this.state.value[key] = {};
        break;
       }
     })
     this.setParent = this.setParent.bind(this);
  }



    componentDidMount(){
      console.log('component did mount',this);
    }


    setParent(key,value){
     var statevalue = Object.assign({},this.state.value);
     statevalue[key] = value;
     this.setState({value:statevalue},()=>{
       console.log(this.state)
      if (this.props.setParent){
          if (this.props.parent.type === "formGroup"){
        this.props.setParent(this.name,this.state.value)
          } else if (this.props.parent.type === "formArray"){
            this.props.setParent(this.props.index,this.state.value)
          }
      }
     });

    }




  makeChildren(ctls){
   return Object.keys(ctls).map( (key, index)=>{
      var child = ctls[key];
      if (child.type === 'formControl' ){
        if (child.JSXElement === undefined ){
          child.JSXElement = Input;
        }
        return <FormControl setParent={this.setParent} parent={this} control={child}  index={index}  JSXElement={child.JSXElement} name={key} value={this.state.value[key]} status={this.state.statuses[key]} key={key}/>
        }
      if (child.type === 'formArray' ){
        if (child.JSXContainer === undefined ){
          child.JSXContainer = Container;
        }
        return  <FormArray setParent={this.setParent}   parent={this}  control={child} value={this.state.value[key]} name={key} key={key}  index={index} JSXContainer={child.JSXContainer} controls={child.controls} />;
      }
      if (child.type === 'formGroup' ){
        if (child.JSXContainer === undefined ){
          child.JSXContainer = Container;
        }
        return <FormGroup setParent={this.setParent}  parent={this}  control={child} value={this.state.value[key]} index={index}  name={key}  controls={child.controls} JSXContainer={child.JSXContainer} key={key} />;
      }
    })
  }


  // statusToColor(status){
  //   if (status === "VALID") {
  //     return "#36bc78"
  //   } else if (status === "PENDING") {
  //     return "#f2da33";
  //   } else {
  //     return "#cb1842";
  //   }
  // }

  render() {

      return (
        <React.Fragment>
        <div className = "formGroup"  style={{"borderLeft":"10px solid " +this.state.color}}>
        <this.Container children={this.makeChildren(this.state.controls)}/>
       </div>
      </React.Fragment>)
    }

  };
export default FormGroup;
