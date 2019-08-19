import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as styles from 'styles.js';

class Linker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: props.match.params.code,
      isLoading: true,
      redirect: false,
      redirectTo: '',
      error: {
        show: false,
        msg: ''
      }
    };
  }

  componentWillMount = () => {
    this.store.expand(this.state.code)
      .then((url) => {
        this.setState({
          isLoading: false,
          redirect: true,
          redirectTo: url,
        }, () => {
          window.location.assign(url)
        });
      })
      .catch((err) => {
        this.setState({
          isLoading: false,
          redirect: false,
          redirectTo: '/',
          error: {
            show: true,
            msg: "No URL found. Please try again."
          }
        });
      })
  };

  componentDidMount = () => {
  };

  render = () => {
    return (
      <div style={styles.linker}>
        {this.state.error.show && <Redirect to={{pathname: this.state.redirectTo, state: {bar:{show: true, msg: "No URL found"}}}} />}
        {this.state.isLoading && <CircularProgress /> }
      </div>
    )
  };
}

export default withRouter(Linker);