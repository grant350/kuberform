<h1 align="center"> React Formbuilder like angular formbuilder</h1>

<p align="center">
  <img src="https://github.com/grant350/reactformbuilder/blob/master/form.png?raw=true" width="600px" height="600px"/>
</p>
<p align="center">
  <img src="https://github.com/grant350/reactformbuilder/blob/master/readme.png?raw=true" width="600px" height="600px"/>
</p>
<p align="center">
React Formbuilder has asynchornous observables from rxjs
</p>



## Documentation
Get started with reactFormbuilder!


### Prerequisites
 # * have react installed.
 # * have react-dom installed.
 # * Babel configured

# Formgroup

```ts
var formgroup= {
     type:'formGroup',
     JSXContainer: <JSXElement> ,
     name: <String>,
     form:  ("name":<Formgroup> || <FormArray> || <FormControl>){},
     submit: <JSXElement> || null
}
```

# FormArray

```ts
var formArray = {
     type:'formArray',
     JSXContainer: <JSXElement> ,
     name: <String>,
     children: (<Formgroup> || <FormArray> || <FormControl>)[],
}
```

# FormControl

```ts
 var formControl= {
     validate:(value:<any>,status:<any>)=>{ },
     type:'formControl',
     JSXElement: <JSXElement> ,
     name: <String>
     value: <any>
}
```

# example formgroup
 ## remember formgroups are allways the start of a form
  ``` js
  var form = {
  firstname:{
    type: "formControl",
    value: 5,
    JSXElement: Input
  },
  someArray:{
    type: "formArray",
    children: [
      {
         type: "formControl",
        name:'item',
        value: 1,
        JSXElement: Input
      },
      {
        type: "formControl",
        name:'item',
        value: 2,
        JSXElement: Input
      }

    ],
    JSXContainer: ContainerA
  },
  mastergroup:{
    type: "formGroup",
    JSXContainer: ContainerO,
    form: {
      price:{
        type: "formControl",
        value: 3.99,
        JSXElement: Input
      },
      formy: {
        type: 'formArray',
        JSXContainer: ContainerA,
        children: [
          {
            type: "formControl",
           name:'z1',
           value: 'a',
           JSXElement: Input
         },
         {
           type: "formControl",
           name:'z2',
           value: 'b',
           JSXElement: Input
         }
        ]

      }
    }
  },
 };
 ```
 ## so as the example shows above there is the main object which is formgroup and there is nested objects within the main formgroup. these nested objects are called children|form. children is for arrays and form is for objects.

 ```js
  var formArray = {
    type: "formArray",
    children: []
    }
 ```
  ```js
  var formGroup ={
    type: "formGroup",
    form: {}
    }
 ```


 # What is a JSXElmenet?.
 ## A JSXElement is a React Component that can be a class or a functional component.

### To be able to update the values in your input fields you need to call props.update.  also if you want to get the status color for the border of an input field you need to use props.border.

 ```js
 var Input = function (props){
  return (<div className="input" style={"border":"2px solid "+props.border}>
      <span style={{width:'100%'}}>{props.status}</span>
    {props.name} <input onChange={ (e)=>{props.update(e.target.value)}} value={props.value}/>
        </div>)
}
```


# getdata from the formGroup?

 ```js
 // to get data you must use a refrence to the formGroup.
   function submit(){
      var formvalue = this.myRef.current.getData();
      console.log('formvalue',formvalue)
   }
  <FormGroup ref={this.myRef} controls={formgroup} name={'order'}  />
```




# how to work with prebuilt components
## Containers!

### Below is an example of a container class and this is a default for reactformbuilder to use. you can create any type of container you wish as long as you use {this.props.children} in the render or in a functional component, return {this.props.children}

## each child of the children array is a JSXElement you have defined in the form.

```js
class Container extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    return (
      <div className="container" style={{background:"red", width:"100%", height:"auto",position:"relative","left":"20px"}}>
          {this.props.children}
      </div>
    );
  }
}
 ```

 # as we discussed each contianer has JSXElements this is an example of a JSXElement

 ## you can create it in any way you want. If you do not call update on a input change, the value will never change nor will it validate the form.

 ```js
import {TextField} from  '@mui/material';
class Input extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    return (
      <div className="input" style={{position:"relative",left:this.props.tabOver? this.props.tabOver.toString()+"px":"0px"}}>
        <label style={{display:"block", width:"100%",position:"relative", margin: "5px"}}> {this.props.labelName}</label>
        <TextField
        size="small"
        onChange={(e)=>{this.props.update(e.target.value)}}
        value={this.props.value}
        label={this.props.label? this.props.label:"type here"}
        error={this.props.error? this.props.error:false}
        required={this.props.required? this.props.required:false}
        disabled={this.props.disabled? this.props.disabled:false}
        helperText={this.props.helperText? this.props.helperText:""}
        InputProps={{ style: { fontSize: this.props.InputProps? this.props.InputProp:10 } }}
        InputLabelProps={{ style: { fontSize: (this.props.InputLabelProps? this.props.InputLabelProps:12) } }}
        style={{background:'white', "borderLeft":"20px solid "+this.props.border,"borderRadius": "10px",width: this.props.width !== undefined ? this.props.width.toString()+"px":"100px"}}
        id="filled-basic"
        variant="filled" />
      </div>
    );
  }
}
 ```


 # what happend if you dont specify JSXContainer or JSXElment and or its not valid JSX?

 ## reactformbuilder will select a default container so the code does not break and a default input. so if you have a textbox and you are wondering why its an input proably because you have invalid JSX or the component isnt in the form.


# How to get started.

## First import reactformbuilder.

```js
  import {FormGroup,Input,Container} from '@zenabyss/reactformbuilder';
```


## next build a model formgroup
```js
   var formgroup = {
      "name":{
        "type":"formControl",
         "validator": (value,obs)=>{
              //you can use set time out or not or any async call
              // true === "VALID"
              // false === "INVALID"
              // null === "PENDING"
             setTimeout(()=>{
                if (value === "bob"){
                  obs.next(true);
                } else {
                  obs.next(false)
                }
              },3000);
          }
        },
      "address":{
        "type":"formGroup",
        "JSXContainer":JSXContainer
        "controls":{
          "zipcode":{
            "type":"formControl",
            "value":"84932"
          },
          "streetAddress":{
            "type":"formControl",
            "JSXElement":JSXElement
          }
        }
      }
      "skills":{
        "type":"formArray",
        "controls": [{
          "name":"skillname",
          "value":"bob builder mastery",
          "JSXElement":JSXElement
        }]
      }
   }
```

# bugs that need resolving


## removechild doesnt remove the child

## rxjs calls way too many times for rendering the form but maybe thats fine. should implement debounce soon.






