import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Box from "@material-ui/core/Box";
import {connect} from 'react-redux';
import CopyButton from "components/CopyButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from "@fortawesome/free-solid-svg-icons";
import * as styles from 'styles';
import * as actions from 'actions';

class URLBox extends Component {
  constructor(props) {
    super(props);
  }

  render = () => {
    return (
      <div className="URLField">
      { this.props.show ?
        <div>
            <TextField
              autoFocus={true}
              label="Enter URL here"
              onChange={this.props.handleChange}
              onKeyDown={this.props.handleKeyDown}/>
            <Button
              variant="contained"
              color="primary"
              style={styles.app.button}
              href={null}
              onClick={this.props.handleSubmit}>
              &gt; Shrink &lt;
            </Button>
        </div>
        :
        <div className="URLResult" style={styles.app.content}>
          {!this.props.isComplete && <CircularProgress/>}
          {this.props.isComplete &&
            <div>
              <FontAwesomeIcon icon={faLink} />
              {"     " + this.props.shortURL}
              <CopyButton url={this.props.shortURL} text="Copy to clipboard"/>
            </div>
          }
        </div> }
      </div>
    );
  };
}

export default connect(null, actions)(URLBox);
