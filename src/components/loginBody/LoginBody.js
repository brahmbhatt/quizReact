import React from 'react';
import './loginBody.css';

export default class LoginBody extends React.Component {
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
              <textarea className="textArea" />
            </div>
            <button className="login-button">login</button>
          </div>
        </div>
      </div>
    );
  }
}
