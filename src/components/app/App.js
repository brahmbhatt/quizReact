import React from 'react';
import { connect } from 'react-redux';
import Header from '../header/Header';
import LoginBody from '../loginBody/LoginBody';
import QuestionBody from '../questionBody/QuestionBody';
import LeaderBoard from '../leaderBoard/LeaderBoard';
import createStore from '../../redux/actions/createStore';

import './app.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      user: '',
      hello: '',
    };
  }

  componentWillMount=() => {
    fetch('http://localhost:3000/quiz/getDbInfo').then(data => data.text())
      .then((text) => {
        console.log('text', text);
        if (text === '0') {
          fetch('http://localhost:3000/quiz/saveQueExx', {
            method: 'POST',
          }).then(response => response.json())
            .then((data) => {
              console.log('data', data);
            }).then(() => {
              fetch('http://localhost:3000/quiz/getQueDb').then(data => data.json())
                .then((data) => {
                  console.log('data', data[0].options.option1);
                  this.props.createStore(data);
                });
            });
        } else {
          fetch('http://localhost:3000/quiz/getQueDb').then(data => data.json())
            .then((data) => {
              console.log('data', data[0].options.option1);
              this.props.createStore(data);
            });
        }
      });
  }
  handleOnClick = (uname) => {
    console.log('hey user is', uname);

    this.setState({
      page: 1,
      user: uname,
      hello: 'Hello',
    });
  }
  leaderBoard = () => {
    this.setState({ page: 2 });
  }
  render() {
    if (this.state.page === 0) {
      return (
        <div className="App-mainDiv">
          <Header />
          <LoginBody login={this.handleOnClick} />
        </div>
      );
    }
    if (this.state.page === 1) {
      return (
        <div className="App-mainDiv">
          <Header user={this.state.user} hello={this.state.hello} />
          <QuestionBody user={this.state.user} leaderBoard={this.leaderBoard} />
        </div>
      );
    }
    if (this.state.page === 2) {
      // console.log('useeeeeeeee', this.props.ques);

      return (
        <div className="App-mainDiv">
          <Header user={this.state.user} hello={this.state.hello} />
          <LeaderBoard user={this.state.user} />
        </div>
      );
    }
  }
}
const mapDispatchToProps = dispatch => ({
  createStore: obj => dispatch(createStore(obj)),
});
const mapStateToProps = state => ({
  ques: state.reducer.ques,
  users: state.reducer.users,
  scores: state.reducer.scores,
});
export default connect(mapStateToProps, mapDispatchToProps)(App);

