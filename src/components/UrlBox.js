import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {withRouter, Redirect} from 'react-router-dom';
import firebase from "modules/Firebase";
import {setUrl, setShortUrl, setView, handleError, handleRedirect} from "actions/UrlBox";

import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faLink} from "@fortawesome/free-solid-svg-icons";
import CopyButton from "components/CopyButton";

import * as styles from 'styles';

const UrlBox = props => {
  const handleChange = event => props.setUrl(event.target.value);
  const handleEnter = event => event.key === 'Enter' && handleSubmit();
  const handleSubmit = () => {
    let url = props.url;
    if (!url.includes('https://') || !url.includes('http://')) {
      url = `https://${props.url}`;
    }

    try {
      new URL(url);
    } catch {
      props.handleError(`${props.url} is not a correct URL`);
    }

    props.setView('result');
    setTimeout(() => {
      firebase.shrink(url).then(shortUrl => {
        props.setShortUrl(shortUrl);
        props.handleRedirect('/result');
      })
    }, 2000);
  };

  useEffect(() => {
    console.log(props);
    if (props.history.action === 'POP' && props.history.location.pathname === '/') {
      props.setView('default');
      props.handleRedirect('/');
      props.setUrl("");
      props.setShortUrl("");
    }
  }, [props.history.action]);

  return (
    <div className="URLBox">
      {props.view === 'default' &&
      <div>
        <TextField
          autoFocus={true}
          label={props.label}
          onChange={handleChange}
          onKeyDown={handleEnter}
          error={props.error}/>
        &nbsp;
        <Button
          variant="contained"
          color="primary"
          style={styles.app.button}
          href={null}
          onClick={handleSubmit}>
          Go
        </Button>
      </div>}
      {props.view === 'result' &&
      <div style={styles.app.content}>
        {props.shortUrl === '' && <CircularProgress/>}
        {props.shortUrl !== '' &&
        <div>
          <FontAwesomeIcon icon={faLink}/>
          &nbsp;
          {props.shortUrl}
          &nbsp;
          <CopyButton url={props.shortUrl} text="Copy to clipboard"/>
        </div>}
      </div>}
      {props.redirect && <Redirect push to={props.redirectTo}/>}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    view: state.UrlBox.view,
    url: state.UrlBox.url,
    shortUrl: state.UrlBox.shortUrl,
    label: state.UrlBox.label,
    error: state.UrlBox.error,
    redirect: state.UrlBox.redirect,
    redirectTo: state.UrlBox.redirectTo,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    setView: view => dispatch(setView(view)),
    setUrl: url => dispatch(setUrl(url)),
    setShortUrl: url => dispatch(setShortUrl(url)),
    handleError: msg => dispatch(handleError(msg)),
    handleRedirect: endpoint => dispatch(handleRedirect(endpoint)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UrlBox));
