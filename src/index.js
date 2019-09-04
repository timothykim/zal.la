import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch} from 'react-router-dom'
import { Provider } from 'react-redux';
import * as serviceWorker from 'serviceWorker';

import App from 'components/App';
import Linker from 'components/Linker';
import store from "store";
import firebase from 'modules/Firebase';

const routes = (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact={true}
               path="/"
               render={(props) => <App {...props} firebase={firebase} />} />
        <Route exact={true}
               path="/result"
               component={App} />
        <Route path="/:code" component={Linker} />
      </Switch>
    </Router>
  </Provider>
);


ReactDOM.render(routes, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
