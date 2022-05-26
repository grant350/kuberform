import React from 'react';
import {Observable,merge} from 'rxjs';
class FormControl extends React.Component {

  constructor(props) {
    super(props)
    this.name = this.props.name
    this.update = this.update.bind(this)
  }

  update(name,value){
    this.props.update(this.props.index,value)
  }

  render(){
    console.log(this.props.update)
   return( <div className="formControl">
            <this.props.JSXElement update={this.update}  name={this.props.name}  value={this.props.value} status={this.props.status}></this.props.JSXElement>
    </div>
   )
  }
}
export default FormControl;