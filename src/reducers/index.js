import {combineReducers} from "redux";
import URLBoxReducer from 'reducers/URLBox';

export default combineReducers({
  URLBox: URLBoxReducer,
});