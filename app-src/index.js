import React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
//
class Root extends React.Component {
  render() {
    return (
      <div>
        <App />
      </div>
    );
  }
}

// eslint-disable-next-line no-undef
const ROOT = ReactDOM.createRoot(document.getElementById('app'));
ROOT.render(<Root />);
