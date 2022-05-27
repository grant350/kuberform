import React from 'react';
import {Observable,merge} from 'rxjs';
class FormControl extends React.Component {

  constructor(props) {
    super(props)
    this.name = this.props.name
    this.update = this.update.bind(this);
    this.statusToColor = this.statusToColor.bind(this);
  }
  statusToColor(){
    if (this.props.status === "VALID") {
      return "#36bc78"
    } else if (this.props.status === "PENDING") {
      return "#f2da33";
    } else {
      return "#cb1842";
    }
  }

  update(name,value){
    this.props.update(this.props.index,value)
  }

  render(){
    console.log(this.props.update)
   return( <div className="formControl">
            <this.props.JSXElement update={this.update} border={this.statusToColor()} name={this.props.name}  value={this.props.value} status={this.props.status}></this.props.JSXElement>
    </div>
   )
  }
}
export default FormControl;