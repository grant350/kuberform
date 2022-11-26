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
}
```
#

###  Here is an example of how to make a form

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


