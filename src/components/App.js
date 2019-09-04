import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import MainBar from "components/MainBar";
import UrlBox from 'components/UrlBox';
import 'styles/App.css';
import * as styles from 'styles';

const App = () => {
  return (
    <div className="App"
         style={styles.app.container}>
      <MainBar />
      <div style={styles.app.content}>
        <UrlBox />
      </div>
    </div>
  );
};

export default connect()(App);
