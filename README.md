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



