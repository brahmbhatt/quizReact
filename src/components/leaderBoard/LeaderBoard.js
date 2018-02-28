import React from 'react';
import { connect } from 'react-redux';
import './leaderBoard.css';

class LeaderBoard extends React.Component {
  getUserScore = () => {
    for (let i = 0; i < this.props.scores.length; i += 1) {
      if (this.props.scores[i].uname === this.props.user) {
        return this.props.scores[i].score;
      }
    }
    return 0;
  }
  getTotal = () => this.props.ques.length
  sample = () => {
    const arr = [];
    for (let i = 0; i < this.props.scores.length && i < 5; i += 1) {
      arr.push(<div className="lead-box">
        <div className={this.props.scores[i].uname === this.props.user ? 'unameBlue' : 'uname'}> {this.props.scores[i].uname}</div>
        <div className="score"> {this.props.scores[i].score}</div>
               </div>);
    }
    return arr;
  }
  render() {
    return (
      <div className="lead-main">
        <div className="score-main">
          <div className="your">your score</div>
          <div className="getScore-main"><div className="userrr">{this.getUserScore()}</div>/<div className="totalll">{this.getTotal()}</div></div>
        </div>
        <div className="lead">
          {this.sample()}
          <p className="p">leaderBoard</p>
        </div>
        <button className="play" onClick={this.props.playAgain}>play Again</button>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({

});
const mapStateToProps = (state) => {
  console.log(state);
  return {
    ques: state.reducer.ques,
    users: state.reducer.users,
    scores: state.reducer.scores,
  };
};

LeaderBoard.defaultProps = {
  scores: [],
};
export default connect(mapStateToProps, mapDispatchToProps)(LeaderBoard);
