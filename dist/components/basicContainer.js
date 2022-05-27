import React from 'react';

class Container extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return React.DOM.div({
      className: "container",
      style: {
        background: "red",
        width: "100%",
        height: "auto",
        position: "relative",
        "left": "20px"
      }
    }, this.props.children);
  }

}

export default Container;