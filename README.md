## Kuberform
#
#### Kuberform is a JavaScript package for creating react web forms
#


## Quick start

### Install Kuberform

<code>

    npm install kuberform --save
</code>

### Import the three necessary components to our react application.

<code>

    import {FormGroup,FormControl,FormArray} from '@kuberspace/kuberform';
</code>

### The recomended way to use Kuberforms is to start with a FormGroup container and add children to the container. You may choose to add a wrapper container to the children components or leave container prop empty. groupName is required.

<code>

    <FormGroup container={Container} groupName="form">
</code>

### element is required as it has the ability to update state value and for you to build your own custom input component
### fieldName is required
### validator is not requied but may be useful to validate input

<code>

           <FormControl element={Control} fieldName="firstName" validator={validator}></FormControl>
</code>

#
## How to make a Container
### Make sure you add this.props.children in the render function else nothing will render properly
```
    class Container extends React.Component {
      constructor(props){
        super(props);
      }
      render(){
        return (<div className="container">{this.props.children}</div>);
      }
    }
```




#
## How to make a Control
### Make sure you call this.props.update or nothing will update in the form data object

<code>

    class Control extends React.Component {
      constructor(props){
        super(props)
    }

      render(){
        return (
          <div className="my-formcontrol">
            <label>{this.props.fieldName}</label>
            <input className="myinput" />
          </div>
        );
      }
    }
</code>

#
## How to get data from the form



## How to manualy update a control and validate


## how to?