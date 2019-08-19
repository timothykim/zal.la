import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import * as styles from 'styles';

export default class CopyButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: false,
      text: this.props.text,
    };
  }

  copyToClipboard = () => {
    let dummy = document.createElement("input");
    document.body.appendChild(dummy);
    dummy.setAttribute('value', this.props.url);
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
    this.setState({
      copied: true,
      text: "Copied to clipboard!"
    })
  };

  render() {
    return (
      <Button
        url={this.props.url}
        variant="contained"
        color="primary"
        style={styles.app.button}
        disabled={document.queryCommandEnabled('copy')}
        onClick={!this.state.copied && this.copyToClipboard}
        href={null}>
        {this.state.text}
      </Button>
    );
  }
}
