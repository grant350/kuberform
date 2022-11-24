import { Observable, BehaviorSubject, mergeMap, map } from 'rxjs';

const value$ = new BehaviorSubject({});
const status$ = new BehaviorSubject("VALID");

const initialState = {
  value:{},
  status: "INVALID"
};

let state = initialState;


export const stateStore = {
  subscribeValue: (setValue)=>{
    value$.subscribe(state=>{
      console.log('state',state);
      setValue(state);
    })
  },
  subscribeStatus: (setStatus)=>{
    status$.subscribe(state=>{
      console.log('state',state);
      setValue(state);
    })
  }
}