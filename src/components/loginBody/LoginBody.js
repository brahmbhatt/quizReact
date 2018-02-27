import React from 'react';
import './loginBody.css';

export default class LoginBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textValue: '',
    };
  }

  onClick = () => {
    fetch('http://localhost:3000/quiz/checkUser', {
      method: 'POST',
      body: JSON.stringify({ uname: this.state.textValue }),
    }).then(data => data.json())
      .then((data) => {
        console.log('user came', data);
        this.props.login();
      });
  }
  handleChange = (event) => {
    this.setState({ textValue: event.target.value });
  }
  render() {
    return (
      <div className="LoginBody-main">
        <div className="loginBox">
          <div className="welcome-div">
            <p className="welcome">Welcome</p>
            <p className="to">to</p>
            <p className="quizzy">Quuizzy!</p>
          </div>
          <div className="login-div">
            <p className="login">login</p>
            <div className="username-div">
              <p className="username">username</p>
              <textarea className="textArea" onChange={this.handleChange} />
            </div>
            <button className="login-button" onClick={this.onClick}>login</button>
          </div>
        </div>
      </div>
    );
  }
}
