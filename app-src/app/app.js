import React from 'react';
import FormExample1 from './FormExample1/index.js';
// place all form examples and test the examples on this page
class App extends React.Component {

  constructor(props){
    super(props);
  }
  render(){
    return (
      <div className="form-page">
        <FormExample1></FormExample1>
      </div>
    );
  }
}

export default App;