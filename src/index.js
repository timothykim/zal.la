import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux';
import { createStore} from "redux";
import reducers from 'reducers';

import * as serviceWorker from 'serviceWorker';
import App from 'components/App';
import Linker from 'components/Linker';
import * as config from 'config';
import Firebase from 'modules/Firebase';


const firebase = new Firebase(config.firebase);
const store = createStore(reducers, {});
const routes = (
  <Provider store={store}>
    <Router>
      <div>
        <Route
          path="/" exact
          render={(props) => <App {...props} firebase={firebase} />}
        />
        <Route path="/:code" component={Linker}></Route>
      </div>
    </Router>
  </Provider>
);


ReactDOM.render(routes, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
