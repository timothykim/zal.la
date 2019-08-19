import {GENERATE_COMPLETE, GENERATE_SHORT_URL} from "actions/types";

export default function(state=[], action) {
  switch(action.type) {
    case GENERATE_SHORT_URL:
      return [...state, action.payload];
    case GENERATE_COMPLETE:
      return [...state, action.payload];
    default:
      return state;
  }
}