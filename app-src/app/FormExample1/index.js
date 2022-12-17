import React from 'react';
import { FormArray, FormGroup, FormControl } from '../../kuberform/index';
import './index.scss';

class FormExample1 extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.submit = this.submit.bind(this);
  }

  submit() {
    // console.log(this.ref.current.getValue());
    return false;
  }

  /*
  This is a single FormGroup form with basic information.
  this does not have any mui.
  */

  render() {
    return (
      <FormGroup ref={this.ref} groupName="login">
        <div className="container">
          <div className="card">
            <div className="card-image">
              <h2 className="card-heading">
                Get started
                <small>Let us create your account</small>
              </h2>
            </div>
            <form className="card-form">
              <FormControl controlName="fullName" defaultValue="Alexander Parkinson">
                {(props)=> (
                  <div className="input">
                    <label className="input-label">
                      Full name
                      <input type="text" className="input-field" defaultValue={props.value} required />
                    </label>
                  </div>
                )}
              </FormControl>
              <FormControl controlName="email" defaultValue="vlockn@gmail.com">
                {(props)=> (
                  <div className="input">
                    <label className="input-label">
                      Email
                      <input type="text" className="input-field" defaultValue={props.value} required />
                    </label>
                  </div>
                )}
              </FormControl>
              <FormControl controlName="password">
                {()=> (
                  <div className="input">
                    <label className="input-label">
                      Password
                      <input type="password" className="input-field" required />
                    </label>
                  </div>
                )}
              </FormControl>
              <FormArray arrayName="nestedArray">
                <FormControl controlName="secretid">
                  {()=> (
                    <div className="input">
                      <label className="input-label">
                        secretid
                        <input type="text" className="input-field" required />
                      </label>
                    </div>
                  )}
                </FormControl>
              </FormArray>
              <div className="action">
                <button type="button" onClick={this.submit} className="action-button">Get started</button>
              </div>
            </form>
            <div className="card-info">
              <p>
                By signing up you are agreeing to our
                <a href="/">
                  Terms and Conditions
                </a>
              </p>
            </div>
          </div>
        </div>
      </FormGroup>
    );
  }
}
export default FormExample1;
