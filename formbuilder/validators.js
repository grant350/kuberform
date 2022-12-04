export class Validators {

  constructor(){};


  static required() {
    return (value, obs) => {
      if (typeof value === "string") {
        if (value.length <= 0) {
          obs.next({ required: true })
        } else {
          obs.next(null);
        }
      } else if (value == null || value == undefined) {
        obs.next({ required: true })
      } else {
        obs.next(null);
      }
    }
  }

}

export default Validators;
