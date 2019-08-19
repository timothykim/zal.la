import React, {Component} from 'react';
import URLBox from 'components/URLBox';
import PrimarySearchAppBar from "components/PrimarySearchAppBar";
import 'styles/App.css';
import * as styles from 'styles';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.firebase = props.firebase;
    this.state = {
      box: {
        show: true,
        url: "",
        isComplete: false,
        shortURL: "",
      },
      bar: {
        show: false,
        msg: "",
      }
    };
    this.handleURLBoxChanged = this.handleURLBoxChanged.bind(this);
    this.handleURLBoxEnterPressed = this.handleURLBoxEnterPressed.bind(this);
    this.handleURLBoxSubmitted = this.handleURLBoxSubmitted.bind(this);
  }

  componentDidMount() {
    document.body.style.margin = 0;
  }

  componentWillUnmount() {
    document.body.style.margin = null;
  }

  handleURLBoxChanged = (e) => {
    this.setState({
      box: {
        ...this.state.box,
        url: e.target.value,
      },
    });
  };

  handleURLBoxEnterPressed = e => {
    if (e.key === 'Enter') {
      this.handleURLBoxSubmitted();
    }
  };

  handleURLBoxSubmitted = () => {
    this.setState({
      box: {
        ...this.state.box,
        show: false,
      }
    }, () => {
      this.firebase.shrink(this.state.box.url)
        .then((shortURL) => {
          this.setState({
            box: {
              ...this.state.box,
              isComplete: true,
              shortURL: shortURL,
              show: false,
            }
          });
        });
    });
  };

  render = () => {
    return (
      <div className="App" style={styles.app.container}>
        <PrimarySearchAppBar/>
        <div style={styles.app.content}>
          <URLBox
            show={this.state.box.show}
            isComplete={this.state.box.isComplete}
            shortURL={this.state.box.shortURL}
            url={this.state.box.url}
            handleChange={this.handleURLBoxChanged}
            handleKeyDown={this.handleURLBoxEnterPressed}
            handleSubmit={this.handleURLBoxSubmitted} />
        </div>
      </div>
    );
  };
}
