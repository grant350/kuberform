export class Validators {

  constructor(){};

  get isFloat(){
    return (control, obs) => {
      function isFloat(n){
        return Number(n) === n && n % 1 !== 0;
      }
      if (isFloat(control.getValue())){
        obs.next(null);
      } else {
        obs.next({invalidFloat:true});
      }
    }
  }

  get isInterger(){

  }
  get isShort(){

  }
  get isArray(){

  }

  get isObject(){

  }

  get isBoolean(){
    return (control, obs) => {
      const val = control.getValue().toLowerCase();
      if (val === "true" || val === "false"){
        obs.next(null);
      } else {
        obs.next({invalidBoolean:true});
      }
    }
  }

  get isDate(format){
    return (control, obs) => {
      if (moment(control.getValue(), format, true).isValid()){
        obs.next(null);
        return;
      }
      obs.next({invalidDate:true});
    }
  }

  get isTimeStamp(format){
    //can be int or string to seconds
  }

  get isNumber(){
    return (control, obs) => {
      try {
        parseInt(control.getValue());
        obs.next(null);
      } catch {
        obs.next({invalidNumber:true});
      }
    }
  }

 get regex(regex){
  return (control, obs) => {
      if (control.getValue().match(regex)){
        obs.next(null);
      } else {
        obs.next({invalidRegex:true});
      };
  }
}

  get isDouble(){
    return (control, obs) => {
      this.isNumber(control,obs);
      const regex = /^[0-9]*[.]?[0-9]+$/;
      try {
        if (control.getValue().match(regex)){
          obs.next(null);
        } else {
          throw new Error("Not A Double");
        };
      } catch {
        obs.next({invalidDouble:true});
      }
    }
  }

  get max(interger) {
    return (control, obs) => {
      const VALUE = control.getValue();
        if (VALUE.length > interger) {
          obs.next({ maxLengthInvalid: true })
        } else {
          obs.next(null);
        }
    }
  }

  get min(interger) {
    return (control, obs) => {
      const VALUE = control.getValue();
        if (VALUE.length < interger) {
          obs.next({ minLengthInvalid: true })
        } else {
          obs.next(null);
        }
    }
  }

  get required() {
    return (control, obs) => {
      const VALUE = control.getValue();
      if (typeof VALUE === "string") {
        if (VALUE.length <= 0) {
          obs.next({ required: true })
        } else {
          obs.next(null);
        }
      } else if (VALUE == null || VALUE == undefined) {
        obs.next({ required: true })
      } else {
        obs.next(null);
      }
    }
  }

}

export default Validators;
