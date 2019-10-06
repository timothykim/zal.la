import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Redirect, withRouter} from 'react-router-dom';
import {handleComplete, handleError, setUrl} from "components/Linker/actions";

import CircularProgress from '@material-ui/core/CircularProgress';
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

const Linker = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {props.isError && <Redirect to={{pathname: "/", state: {bar: {show: true, msg: "No URL found"}}}}/>}
      {!props.isComplete && <CircularProgress/>}
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
