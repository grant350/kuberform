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


 # what is JSXElmenet and JSXContainer?

 ## JSXElement is exactly what it says. look below, Babel turns this into jsx it can also be a class as well.

 ```js
 var Input = function (props){
  return (<div className="input">
      <span style={{width:'100%'}}>{props.status}</span>
    {props.name} <input onChange={ (e)=>{props.update(props.name,e.target.value)}} value={props.value}/>
        </div>)
}
```


# how to update changes from input feilds.
## from the example above there is an update function passed down in props. you can use  this to update the state.

 ```ts
  update(props.name:<string>, e.target.value:<any>)
```

# submit button



# getdata from form




# how to work with prebuilt components

<p align="center">
  <img src="https://github.com/grant350/reactformbuilder/blob/master/examplecontainer.png?raw=true" width="600px" height="600px"/>
</p>


## before we talked about how to make a form, but now we are going to talk about how to structure your form.

## container work for formgroups and formArrays as each will output an array of JSXElements

### in each container  there is a prop called children

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
//each child of the children array is a JSXElement you have defined in the form.
 ```

 # as we discussed each contianer has JSXElements this is an example of a JSXElement

 ## you can create it in any way you want. also if you do not call update on a character change or submit  the value will never change nor will it validate. it order for it to work you are required to call update on event.
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