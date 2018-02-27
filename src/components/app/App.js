import React from 'react';
import { connect } from 'react-redux';
import Header from '../header/Header';
import LoginBody from '../loginBody/LoginBody';
import createStore from '../../redux/actions/createStore';
import './app.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      ans: 0,
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
  handleOnClick = () => {
    this.setState({ page: 1 });
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
    return (
      <div className="App-mainDiv">
        hi
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  createStore: obj => dispatch(createStore(obj)),

});
const mapStateToProps = state => ({
  ques: state.ques,
  users: state.users,
  scores: state.scores,
});
export default connect(mapStateToProps, mapDispatchToProps)(App);

