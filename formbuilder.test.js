import React from 'react';
import ReactDOM from 'react-dom';
import testInput from './testinput';
import TestRenderer from 'react-test-renderer'; // ES6
import {FormGroup,FormControl,FormArray} from './dist/index';

/*
NEVER CHASE THE HOT THING. WHAT EVER IT IS. THAT'S LIKE TRYING TO CATCH THE WAVE,
YOULL NEVER CATCH IT. YOU NEED TO POSITION YOURSELF AND WAIT FOR THE WAVE.
 AND THE WAY YOU DO THAT IS PICK SOMETHING YOUR PASSIONATE ABOUT.
*/

describe('functions work', function(){
  var fg = new FormGroup({formObject:testInput,name:'mainformgroup'});

test('input data is correct',function(){
  expect(typeof testInput).toEqual('object');
  expect(Array.isArray(testInput)).toEqual(false)
  // console.log(testInput)
})
// console.log(testInput.innerformgroup)
// var classes = fg.formGroup({'controls':testInput,type:'formGroup',name:'mainformgroup'});
//   test('classes is an object', function(){
//     expect(typeof classes).toEqual('object');
//     expect(Array.isArray(classes)).toEqual(false)
//   })
  test('make controls works', function(){
    fg.makeControls();

    expect(Object.keys(fg.controls).length > 0).toBe(true)
    console.log(fg.controls)
  })
})




// describe('testing formbulder', function(){

//   var testRenderer = TestRenderer.create(<FormGroup name="main" formObject={testInput} htmlContainer={null} containerClass="someClassct" />);
//   var instance = testRenderer.getInstance();
//   var root = testRenderer.root;
//   var tree = testRenderer.toTree();
//   // console.log(root)
//   // console.log(instance.state)

//   test('testinput is array',function(){
//     expect(Array.isArray(testInput)).toEqual(true)
//   })
//   test('testrenderer exist',function(){
//     expect(testRenderer).not.toBe(undefined);
//   })

//   test('instance exist',function(){
//     expect(instance).not.toBe(undefined);
//     expect(instance).not.toBe(null);
//   })

//   // console.log(instance);

//   test('formgroup state controls are correct',function(){
//     var controls = instance.controls;
//     expect(controls['name']).not.toBe(undefined)
//     expect(controls['name']).not.toBe(null)
//   })


//   //test that all html component have rendered properly from looping function in formbuilder;


//   //test out state change.

//   test('formGroup can change state',function(done){
//     // console.log('instance ', tree)
//     // console.log('state beginning ', instance.state)
//     expect(instance.state.status).toEqual('PENDING')
//     var updatebtn = root.find(element => element.props.className === 'update');
//     // console.log('updatebtn',updatebtn)
//     updatebtn.props.onClick(function(){
//       expect(instance.state.status).toEqual('INVALID')
//       done();
//     });
//   })

//   test('formgroup html starts with formgroup and has default container', function(){

//     var currentNode = tree.rendered;
//     expect(currentNode.props.className).toBe('formGroup');
//     expect(currentNode.rendered.length > 0).toBe(true);

//   })

// });

// describe('tree must have all nodes and formcontrols need to update', function(){

//  var testRenderer = TestRenderer.create(<FormGroup name="main" buildArray={testInput} htmlContainer={null} containerClass="someClassct" />);
//   var instance = testRenderer.getInstance();
//   var root = testRenderer.root;
//   var tree = testRenderer.toTree();
//   var node = tree.rendered.rendered[1]
//   var name2 = instance.state.controls['name2'];
//   test('node not be undefined or null',function(){
//     expect(node).not.toBe(undefined)
//     expect(node).not.toBe(null)

//   })
//   test('formgroups first child is a formControl',function(){
//     var formControl = node.rendered[1]
//     expect(formControl).not.toBe(undefined);
//     expect(formControl).not.toBe(null);
//     expect(formControl.props.className).toBe('input');
//   });

// //test the containers and their inputs

//   test('input changes value onchange',function(done){
//     var inputdiv = node.rendered[1]
//     console.log('inputdiv',inputdiv)
//     var input = inputdiv.rendered[0]
//     console.log(input)
//     console.log(input.props)

//     const mEvent = { target: { value: 'a' } };
//     expect(input).not.toBe(undefined);
//     expect(input.props.onChange).not.toBe(undefined);
//     // input.props.onChange(mEvent);
//     // setTimeout(function(){
//     //   expect(name2.state.status).toBe('INVALID');
//     // },6000)
//   });

//   //test onchange


// });


//describe('formgroup listens to input changes',function(){})



//check Formarray can add control group and edit and delete control groups


// check if value is update in input field.

// describe('make sure formControl returns right class', function(){
// var array= testInput[2]
// var formGroup = new FormGroup({},'main',testInput,null,'someClassct');

// var control = formGroup.formArray(array)
//   console.log(control)
//   test('is formArray ',function(){
//       expect(control.name === "products").toBe(true);
//       expect(control.type === "formArray").toBe(true);
//   })
// })

// describe('make sure formArray returns right class', function(){



// })

// describe('make sure formGroup returns right class', function(){



// })


// describe('validation works', function(){



// })

// describe('html comes out correct', function(){



// })