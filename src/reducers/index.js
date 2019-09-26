import {combineReducers} from "redux";
import UrlBoxReducer from 'components/UrlBox/reducer';
import LinkerReducer from 'components/Linker/reducer';

export default combineReducers({
  UrlBox: UrlBoxReducer,
  Linker: LinkerReducer,
});