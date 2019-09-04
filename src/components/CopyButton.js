import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import * as styles from 'styles';

const CopyButton = props => {
  const [isComplete, setIsComplete] = useState(false);
  const [message, setMessage] = useState('Copy to clipboard');

  const saveToClipboard = () => {
    let element = document.createElement("input");
    document.body.appendChild(element);
    element.setAttribute('value', props.url);
    element.select();
    document.execCommand('copy');
    document.body.removeChild(element);
    setIsComplete(true);
    setMessage("Copied");
  };

  return (
    <Button url={props.url}
            variant="contained"
            color="primary"
            style={styles.app.button}
            disabled={document.queryCommandEnabled('copy')}
            onClick={!isComplete ? saveToClipboard : undefined}
            href={null}>
      {message}
    </Button>
  );
};

export default CopyButton
