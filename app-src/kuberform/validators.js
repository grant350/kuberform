import moment from 'moment';

class Validators {
  get isFloat() {
    return (control, obs)=> {
      /**
       * n is the number parameter to determine if the control value is a float
       *
       * @param  {number | string} n — A string to convert into a number.
       * @returns {boolean} if n is a float it will return true else it will return false
       */
      function checkFloat(n) {
        return Number(n) === n && n % 1 !== 0;
      }
      if (checkFloat(control.getValue())) {
        obs.next(null);
      } else {
        obs.next({ invalidFloat: true });
      }
    };
  }

  // get isInterger() {

  // }

  // get isShort(){

  // }
  // get isArray(){

  // }

  // get isObject(){

  // }

  /**
   *
   * @returns {Function} This getter fn returns a function to determin if control value is a Boolean
   */
  get isBoolean() {
    return (control, obs)=> {
      const VALUE = control.getValue().toLowerCase();
      if (VALUE === 'true' || VALUE === 'false') {
        obs.next(null);
      } else {
        obs.next({ invalidBoolean: true });
      }
    };
  }

  /**
   * given a date format this function will match the control value to check if it is a date in the format specified
   *
   * @param {string} format - A date format such as yyyy/mm/d
   * @returns {Function} This fn returns a function to determin if control value is a a Date
   */
  static isDate(format) {
    return (control, obs)=> {
      if (moment(control.getValue(), format, true).isValid()) {
        obs.next(null);
        return;
      }
      obs.next({ invalidDate: true });
    };
  }

  /**
   *
   * @returns {Function} this fn returns a function to determin if control value is a a Number
   */
  get isNumber() {
    return (control, obs)=> {
      try {
        parseInt(control.getValue(), 10);
        obs.next(null);
      } catch {
        obs.next({ invalidNumber: true });
      }
    };
  }

  /**
   * @param {string} regex - A string expression
   * @returns {Function} This fn returns a function to determin if control value matches a given regex argument
   */
  static regex(regex) {
    return (control, obs)=> {
      if (control.getValue().match(regex)) {
        obs.next(null);
      } else {
        obs.next({ invalidRegex: true });
      }
    };
  }

  /**
   * @returns {Function} This fn returns a function to determin if control value is a double
   */
  static get isDouble() {
    return (control, obs)=> {
      this.isNumber(control, obs);
      const REGEX = /^[0-9]*[.]?[0-9]+$/;
      try {
        if (control.getValue().match(REGEX)) {
          obs.next(null);
        } else {
          throw new Error('Not A Double');
        }
      } catch {
        obs.next({ invalidDouble: true });
      }
    };
  }

  /**
   * @param {number} max - A integer
   * @returns {Function} This fn returns a function to determin if control value > than max
   */
  static max(max) {
    return (control, obs)=> {
      const VALUE = control.getValue();
      if (VALUE.length > max) {
        obs.next({ maxLengthInvalid: true });
      } else {
        obs.next(null);
      }
    };
  }

  /**
   * @param {number} min - A integer
   * @returns {Function} This fn returns a function to determin if control value < than min
   */
  static min(min) {
    return (control, obs)=> {
      const VALUE = control.getValue();
      if (VALUE.length < min) {
        obs.next({ minLengthInvalid: true });
      } else {
        obs.next(null);
      }
    };
  }

  /**
   * Checks if control is valid and if there is a value null or if length is 0
   *
   * @returns {Function} This fn returns a function to determin if control value not null or length of 0
   */
  static get required() {
    return (control, obs)=> {
      const VALUE = control.getValue();
      if (typeof VALUE === 'string') {
        if (VALUE.length <= 0) {
          obs.next({ required: true });
        } else {
          obs.next(null);
        }
      } else if (VALUE == null || VALUE === undefined) {
        obs.next({ required: true });
      } else {
        obs.next(null);
      }
    };
  }
}

export default Validators;
