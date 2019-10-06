import {ON_INIT, ON_TICK} from "components/Timer/types";

const INITIAL_STATE = {
  minutes: 0,
  seconds: 0,
};

export default function(state=INITIAL_STATE, action) {
  switch(action.type) {
    case ON_INIT:
      return {...state, minutes: action.minutes, seconds: action.seconds};
    case ON_TICK:
      return {...state, minutes: action.minutes, seconds: action.seconds};
    default:
      return state;
  }
};
