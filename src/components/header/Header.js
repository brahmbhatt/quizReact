import React from 'react';
import './header.css';

export default class Header extends React.Component {
  render() {
    return (
      <div className="Header-main">
        <div className="Header-title">
          <p className="title">Quizzy</p>
        </div>
        <div className="Header-user">
          <p className="user">{this.props.user}</p>
        </div>
      </div>
    );
  }
}
