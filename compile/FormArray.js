import FormGroup from './FormGroup.js';
import FormControl from './FormControl.js';
import {Observable,merge} from 'rxjs';
import React from 'react';
import {Input,Container} from './components/index.js';

class FormArray extends React.Component{
  constructor(props){
    super(props);
    this.type = "formArray";
    this.name = this.props.name
    this.state = {
      children:this.props.form,
      status:  "VALID",
      value:this.props.value
    }
    this.makeChildren = this.makeChildren.bind(this);
    this.update = this.update.bind(this);
    this.addChild = this.addChild.bind(this);
    this.removeChild = this.removeChild.bind(this);
  }

  componentDidMount(){
    // console.log('value',this.props.value)
    // this.state.value = this.state.children.map(item=>{
    //   return item.value
    // });

    // this.setState({value:this.state.value},()=>{
    //   this.props.updateParent(this.state.value,this.props.name)
    // })
  }
  update(index,value){
    // console.log('hello there',index,value)
    // console.log(index)
    // console.log(this.state.children)
    this.state.children[index].value = value;
    // console.log('hellowo state', this.state)
    this.setState({children:this.state.children},function(){
    })
  }

  addChild(){
    var child = Object.create(this.state.children[0]);
    child.value = "";
    this.state.children.push(child);
    this.setState({children:this.state.children},function(){
      // console.log(this.state)
    });


  }
  removeChild(index){
    if (index === undefined ){
      index == this.state.children.lenght -1;
    }
    if (this.state.children.length >0){
      this.state.children.splice(index,1);
      this.setState({children:this.state.children},function(){
        // console.log(this.state)
      });
    }
  }


  makeChildren(){
    var controls = [];
    this.props.form.forEach( (child, index)=>{
      // console.log('echild',child)
      if (child.type === 'formControl' ){
        // var children = this.state.children;
        // children.push(child)
        // this.setState({value: this.state.value , children:children})
        if (child.JSXElement === undefined ){
          child.JSXElement = Input
        }
        controls.push(<FormControl index={index} update={this.update} JSXElement={child.JSXElement} name={child.name} value={child.value} status={'VALID'} key={index}/>)

      }

      if (child.type === 'formArray' ){
        // loop to get children pass object down
        // console.log('the child',child)
        if (child.JSXContainer === undefined ){
          child.JSXElement = Container
        }
        controls.push(<FormArray key={index} JSXContainer={child.JSXContainer} form={child.children} />)
      }
      if (child.type === 'formGroup' ){
        // loop to get children pass object down
        if (child.JSXContainer === undefined ){
          child.JSXElement = Container
        }
        controls.push(<FormGroup form={child.form} JSXContainer={child.JSXContainer} key={index} />)
      }
      // if field then return field jsx
      // else return container which has fields jsx
    })
    return controls;
  }

  render(){
    var children = this.makeChildren();
    return (
      <React.Fragment>
    <div className="formArray">
      <this.props.JSXContainer children={children}></this.props.JSXContainer>
        {/* {this.props.JSXContainer(this.makeChildren())} */}
    </div>
    <button onClick={this.addChild}> addChild</button>
    <button onClick={this.removeChild}> removeChild</button>

    </React.Fragment>
    )
  }

};
export default FormArray;
