import {combineReducers} from "redux";
import UrlBoxReducer from 'reducers/UrlBox';
import LinkerReducer from 'reducers/Linker';

export default combineReducers({
  UrlBox: UrlBoxReducer,
  Linker: LinkerReducer,
});