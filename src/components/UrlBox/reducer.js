import {ON_ERROR, ON_URL_CHANGE, ON_ACQUIRING_SHORT_URL, ON_VIEW_CHANGE, ON_REDIRECT} from 'components/UrlBox/types';

const INITIAL_STATE = {
  view: "default",
  url: "",
  shortUrl: "",
  label: "Enter URL here",
  error: false,
  redirect: false,
  redirectTo: "",
};

export default function(state=INITIAL_STATE, action) {
  switch(action.type) {
    case ON_URL_CHANGE:
      return {...state, url: action.payload};
    case ON_ACQUIRING_SHORT_URL:
      return {...state, shortUrl: action.payload};
    case ON_VIEW_CHANGE:
      return {...state, view: action.payload};
    case ON_ERROR:
      return {...state, error: true, label: action.payload};
    case ON_REDIRECT:
      return {...state, redirect: true, redirectTo: action.payload};
    default:
      return state;
  }
}