import {GENERATE_SHORT_URL, GENERATE_COMPLETE} from "actions/types";

export function generateShortURL(URL) {
  return {
    type: GENERATE_SHORT_URL,
    payload: URL,
  };
}

export function generateComplete() {
  return {
    type: GENERATE_COMPLETE,
    payload: true,
  }
}
