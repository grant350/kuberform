import React from 'react';
class Container extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    return (
      <div className="container" style={{ width:"100%", height:"auto",position:"relative","left":"20px"}}>
          {this.props.children.map(item=>{
            return item
          })}
      </div>
    );
  }
}
export default Container;
