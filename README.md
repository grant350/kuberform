## Kuberform
#
#### Kuberform is a JavaScript package for creating react web forms
#


## Quick start

### Install Kuberform

```bash
  npm install kuberform --save
```

### Import the three necessary components to our react application.

```jsx
    import {FormGroup,FormControl,FormArray} from '@kuberspace/kuberform';
```

### FormGroup props

```ts
interface Props {
  groupName: String;
}
```

### FormArray props

```ts
interface Props {
  arrayName: String;
}
```


### FormControl input props

```ts

interface Props {
  controlName: String;
  defaultValue: any | undefined;
  validators:Array< (value: string, observable: Observable<{[key:String]:String} | null>) => void > | undefined;
}
```

### FormControl output props

```ts

interface Props {
  value: any | null;
  status: String;
  setValue: (value: any): void {};
  invalid: Boolean;
  touched: Boolean;
  dirty: Boolean;
  errors: {[key:String]: Boolean | any};
}
```

### Container output props if container is specified.
```ts

interface Props {
  value: any | null;
  status: String;
  invalid: Boolean;
  touched: Boolean;
  dirty: Boolean;
  addChlid: (index: number): void {} | undefined;
  removeChild: (index:number): void {} | undefined;
}
```


###  Here is an example of how to make a form using element for a control component

```jsx
import React from 'react';
import {FormGroup,FormControl,FormArray} from '@kuberspace/kuberform';
import InputField from 'yourinputfield';

class myform extends React.component {

  constructor(props){
    super(props);
    this.myform = React.createRef();
  }

  submit(){
    console.log(this.myform.current.getValue());
  }
  addChild(){
    this.myform.current.getControl("nestedArray").addChild();
  }

  render(){
    return (
       <FormGroup ref={this.myform} groupName="login">
        <div className="container">
          <div className="card">
            <div className="card-image">
              <h2 className="card-heading">
                Get started
                <small>Let us create your account</small>
              </h2>
            </div>
            <form  className="card-form">
              <FormControl controlName="fullName" defaultValue="Alexander Parkinson">
                {(props) => {
                  return (<div className="input">
                    <input type="text" className="input-field" defaultValue={props.value} required />
                    <label className="input-label">Full name</label>
                  </div>);
                }}
              </FormControl>
              <FormControl controlName="email" defaultValue="vlockn@gmail.com">
                {(props) => {
                  return (<div className="input">
                    <input type="text" className="input-field" defaultValue={props.value} required />
                    <label className="input-label">Email</label>
                  </div>)
                }}
              </FormControl>
              <FormControl controlName="password">
                {(props) => {
                  return (<div className="input">
                    <input type="password" className="input-field" required />
                    <label className="input-label">Password</label>
                  </div>)
                }}
              </FormControl>
              <FormArray arrayName="nestedArray">
                <FormControl controlName="secretId">
                  {(props) => {
                    return (<div className="input">
                      <input type="text" className="input-field" required />
                      <label className="input-label">secret-id</label>
                    </div>)
                  }}
                </FormControl>
                <button type='button' onClick={this.addChild} className="add-secretid">Add Another</button>
              </FormArray>
              <div className="action">
                <button type='button' onClick={this.submit} className="action-button">Get started</button>
              </div>
            </form>
            <div className="card-info">
              <p>By signing up you are agreeing to our <a href="#">Terms and Conditions</a></p>
            </div>
          </div>
        </div>
      </FormGroup>
    )
  }
}
```

## Making a validator
### A validator is a function that will provide you a control and a observable. You do not need to know how rxjs works all you need to know is to call the method next() on the observable. there is only two available inputs for next, and that is null for valid and an object of errors meaning invalid.

```jsx
export default function required() {
  return (control, obs) => {
    if (control.getValue() === "bob"){
      obs.next(null);
      //valid
    } else {
      obs.next({err:true});
      //invalid
    }
  }
}

```

### To get Data from the form you can call getRawValue();
```jsx
 componentDidMount(){
  this.myform.getValue();
 }
```


### callable methods on formGroup refrence

```ts

interface Methods {
  getValue: ()=> Object | null | String;
  getStatus: ()=> "VALID" | "INVALID" | "PENDING";
  getControl: (control:String) => React.Refrence;
  setValue: (value: any) => void;
  valueChanges: ()=>Observable<Object>;
  statusChanges: ()=>Observable<"VALID" | "INVALID" | "PENDING">;
}
```

### Reusable Input field

#### hence most inputs have active events such as blur and onchange so you do not need to manualy call setValue.

```jsx
import React from 'react';
import { FormControl, InputLabel, TextField, FormHelperText } from '@mui/material'

class InputField extends React.Component {
  constructor(props) {super(props);}

  getErrorMessage(){
    if (this.props.errors === null){return null};
    if (this.props.errorMessages && this.props.touched && this.props.invalid){
      return Object.keys(this.props.errorMessages).map(key=>{
        if (this.props.errors[key]){
          return (<FormHelperText key={key} error={true}> {this.props.errorMessages[key]}</FormHelperText>)
        }
      })
    }
  }

  render() {
    return (
      <div id={this.props.fieldName}>
        <FormControl >
         <TextField variant="filled"
         sx={{width:this.props.width}}
          error={ this.props.touched && this.props.invalid ? true:false}
          multiline
          maxRows={2}
          id="outlined-error"
          label={this.props.label}
        />
        {this.getErrorMessage()}
        </FormControl>
      </div>
    );
  }
}

```


