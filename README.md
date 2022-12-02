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
  container: React.Element | undefined;
  groupName: String;
}
```

### FormArray props

```ts
interface Props {
  container: React.Element | undefined;
  arrayName: String;
}
```


### FormControl props


```ts

interface Props {
  element: React.Element;
  fieldName: String;
  errorMessages: {[key:String]:String} | undefined;
  defaultValue: any;
  validators:Array< (value: string, observable: Observable<{[key:String]:String} | null>) => void > | undefined;
  label: String | undefined;
  setValue: (value: any)=> void;
  touched: boolean;
  dirty: boolean;
  errors: {[key:String]: Boolean | any};
  invalid: Boolean;
}
```
#

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

  render(){
    return (
        <FormGroup ref={this.myform} groupName="form">
          <FormControl
            validators={[requiredValidator()]}
            errorMessages={{myError:"my message"}}
            element={InputField}
            fieldName="productName"
            label="Product Name">
          </FormControl>
        <FormGroup />
    )
  }
}
```
###  Here is an example of how to make a form by directly using your component

```jsx
import React from 'react';
import {FormGroup,FormControl,FormArray} from '@kuberspace/kuberform';
import InputField from 'yourinputfield';

class myform extends React.component {

  constructor(props){
    super(props);
    this.myform = React.createRef();
  }

  render(){
    return (
        <FormGroup ref={this.myform} groupName="form">
          <FormControl
            validators={[requiredValidator()]}
            errorMessages={{myError:"my message"}}
            fieldName="productName"
            label="Product Name">
            <InputField width="200" name="my inputfield" >
          </FormControl>
        <FormGroup />
    )
  }
}
```


## Making a validator
### A validator is a function that will provide you a value and observable. You do not need to know how rxjs works all you need to know is to call the method next() on the observable. there is only two available inputs for next, and that is null for valid and an object of errors meaning invalid.

```jsx
export default function required() {
  return (value, obs) => {
    if (value === "bob"){
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
  this.myform.getRawValue();
 }
```


### callable methods on formGroup refrence

```ts

interface Methods {
  getRawValue: ()=> Object | null | String;
  getRawStatus: ()=> "VALID" | "INVALID" | "PENDING";
  getControl: (control:String) => React.Refrence;
  setValue: (value: any) => void;
  valueChanges: ()=>Observable<Object>;
  statusChanges: ()=>Observable<"VALID" | "INVALID" | "PENDING">;
}
```

### How to make a reusable Input field

#### hence most inputs have active events such as blur and onchange so you do not need to manualy setValue. the time you would need to call setValue is when your uploading an image.

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


