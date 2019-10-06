import {
  ON_ERROR,
  ON_URL_CHANGE,
  ON_ACQUIRING_SHORT_URL,
  ON_STATUS_CHANGE,
  ON_REDIRECT,
  ON_CUSTOM_LINK_CHANGE
} from 'components/Form/types';

const INITIAL_STATE = {
  status: "initial",
  url: "",
  link: "",
  shortUrl: "",
  label: "",
  error: false,
  redirect: false,
  redirectTo: "",
};

export default function(state=INITIAL_STATE, action) {
  switch(action.type) {
    case ON_URL_CHANGE:
      return {...state, url: action.payload};
    case ON_CUSTOM_LINK_CHANGE:
      return {...state, link: action.payload};
    case ON_ACQUIRING_SHORT_URL:
      return {...state, shortUrl: action.payload};
    case ON_STATUS_CHANGE:
      return {...state, status: action.payload};
    case ON_ERROR:
      return {...state, error: true, label: action.payload};
    case ON_REDIRECT:
      return {...state, redirect: true, redirectTo: action.payload};
    default:
      return state;
  }
}