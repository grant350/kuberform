import FormGroup from './FormGroup.js';
import FormArray from './FormArray.js';
import FormControl from './FormControl.js';
import Validators from './validators.js'


// var newObject = Object.assign(Object,{});

Object.reduce = (function reduce(object,fn,initValue){
  if (Array.isArray(initValue) || typeof initValue === "string"){
    throw new SyntaxError("initial value must be an object!")
  }
  Object.keys(object).forEach(key=>{
    initValue = fn(initValue,object[key],key)
  });
  return initValue;
});

export {FormGroup,FormControl,FormArray,Validators}