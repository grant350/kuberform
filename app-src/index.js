import React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './app/app.js'
//
class Root extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
    <div>
      <App/>
    </div>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<Root/>);
