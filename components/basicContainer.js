import React from 'react';
import { FormGroup as FG} from '@mui/material';

class Container extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    return (
      <FG className="container" style={{ width:"100%", height:"auto",position:"relative","left":"20px"}}>
          {this.props.children.map(item=>{
            return item
          })}
      </FG>
    );
  }
}
export default Container;
