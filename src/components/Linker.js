import React, {useEffect} from 'react';
import firebase from "modules/Firebase";
import {connect} from 'react-redux';
import {Redirect, withRouter} from 'react-router-dom';
import {handleComplete, handleError, setUrl} from "actions/Linker";

import CircularProgress from '@material-ui/core/CircularProgress';
import * as styles from 'styles.js';

const Linker = props => {
  useEffect(() => {
    setTimeout(() => {
      firebase.expand(props.match.params.code)
        .then(({url}) => {
          if (!url.includes('https://') || !url.includes('http://')) {
            url = `https://${url}`;
          }
          props.handleComplete(true);
          props.setUrl(url);
          document.location.assign(url);
        })
        .catch(err => {
          props.handleComplete(true);
          props.handleError(true);
        });
    }, 2000);
  }, [props.match.params.code]);

  return (
    <div style={styles.linker}>
      {props.isError && <Redirect to={{pathname: "/", state: {bar:{show: true, msg: "No URL found"}}}} />}
      {!props.isComplete && <CircularProgress /> }
    </div>
  )
};

const mapStateToProps = (state) => {
  return {
    isError: state.Linker.isError,
    isComplete: state.Linker.isComplete,
    url: state.Linker.url,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    setUrl: url => dispatch(setUrl(url)),
    handleError: val => dispatch(handleError(val)),
    handleComplete: val => dispatch(handleComplete(val)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Linker));
