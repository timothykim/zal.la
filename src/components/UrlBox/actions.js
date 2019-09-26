import {ON_ERROR, ON_URL_CHANGE, ON_ACQUIRING_SHORT_URL, ON_VIEW_CHANGE, ON_REDIRECT} from "components/UrlBox/types";

// actions generators
export const setUrl = (url) => {
  return {
    type: ON_URL_CHANGE,
    payload: url,
  }
};

export const setShortUrl = url => {
  return {
    type: ON_ACQUIRING_SHORT_URL,
    payload: url,
  }
};

export const setView = view => {
  return {
    type: ON_VIEW_CHANGE,
    payload: view,
  }
};

export const handleError = msg => {
  return {
    type: ON_ERROR,
    payload: msg,
  }
};

export const handleRedirect = endpoint => {
  return {
    type: ON_REDIRECT,
    payload: endpoint,
  }
};
