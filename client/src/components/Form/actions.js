import {
  ON_ERROR,
  ON_URL_CHANGE,
  ON_ACQUIRING_SHORT_URL,
  ON_STATUS_CHANGE,
  ON_REDIRECT,
  ON_CUSTOM_LINK_CHANGE
} from "components/Form/types";

// actions generators
export const setUrl = (url) => {
  return {
    type: ON_URL_CHANGE,
    payload: url,
  }
};

export const setCustomLink = (link) => {
  return {
    type: ON_CUSTOM_LINK_CHANGE,
    payload: link
  }
};

export const setShortUrl = url => {
  return {
    type: ON_ACQUIRING_SHORT_URL,
    payload: url,
  }
};

export const setStatus = status => {
  return {
    type: ON_STATUS_CHANGE,
    payload: status,
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
