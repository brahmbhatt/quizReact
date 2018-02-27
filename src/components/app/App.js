import React from 'react';
import Header from '../header/Header';
import LoginBody from '../loginBody/LoginBody';
import './app.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      ans: 0,
    };
  }
  render() {
    if (this.state.page === 0) {
      return (
        <div className="App-mainDiv">
          <Header />
          <LoginBody />
        </div>
      );
    }
    return (
      <div className="App-mainDiv">
        hi
      </div>
    );
  }
}
