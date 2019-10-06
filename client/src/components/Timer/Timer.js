import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {useInterval} from "hooks/customHooks";
import {initialize, tick} from "components/Timer/actions";

import {Typography} from "@material-ui/core";

const Timer = (props) => {
  useInterval(() => {
    props.tick(props.minute, props.second);
  }, 1000);


  return (
    <Typography>
      {props.minutes}
      {props.seconds}
    </Typography>
  );
};

const mapStateToProps = (state) => {
  return {
    minute: state.Timer.minute,
    second: state.Timer.second,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    tick: (minute, second) => dispatch(tick(minute, second)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Timer));
