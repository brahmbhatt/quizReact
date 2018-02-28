import React from 'react';
import { connect } from 'react-redux';
import QuestionBox from '../questionBox/QuestionBox';
import saveAns from '../../redux/actions/saveAns';
import './questionBody.css';

class QuestionBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ans: 0,
    };
  }
  onClick = (qid, option) => {
    console.log('radio butoon clicked with option:', option, ' and qid:', qid);
    for (let i = 0; i < this.props.users.length; i += 1) {
      if (this.props.users[i].uname === this.props.user && this.props.users[i].qid === qid) {
        const obj = {
          qid, option, user: this.props.user, ans: option,
        };
        this.props.saveAns(obj);
        fetch('http://localhost:3000/quiz/saveAns', {
          method: 'POST',
          body: JSON.stringify(obj),
        }).then(data => data.text())
          .then((data) => {
            console.log('sav Ans API:', data);
          });
      }
    }
    console.log('lets check user table:', this.props.users);
  }
  enableButton = () => {

  }
  check = (qid, option) => {
    // console.log('inside check function qid:', qid, ' and ans:', option);
    // for (let i = 0; i < this.props.users.length; i += 1) {
    //   if (this.props.users[i].uname === this.props.user && this.props.users[i].qid === qid) {
    for (let j = 0; j < this.props.users.length; j += 1) {
      if (this.props.users[j].qid === qid && this.props.users[j].uname === this.props.user && this.props.users[j].ans === option) {
        console.log('returning true');

        return true;
      }
    }
    return false;
  }
  //   return false;
  // }

showQuestions = () => {
  const arr = [];
  // for (let i = 0; i < this.props.users.length; i += 1) {
  //   if (this.props.users[i].uname === this.props.user && this.props.users[i].ans === '#') {
  //     break;
  //   } else {
  //     this.setState({ enable: false });
  //     break;
  //   }
  // }
  // checked={this.check(this.props.ques[i].qid, this.props.ques[i].ans)}
  for (let i = 0; i < this.props.ques.length; i += 1) {
    const keys = Object.keys(this.props.ques[i].options);
    const options = [];
    for (let j = 0; j < keys.length; j += 1) {
      options.push(<label><input type="radio" name="option" checked={this.check(this.props.ques[i].qid, this.props.ques[i].options[keys[j]])} onChange={event => this.handleChange(event)} onClick={() => this.onClick(this.props.ques[i].qid, this.props.ques[i].options[keys[j]])} />{this.props.ques[i].options[keys[j]]}</label>);
      options.push(<br />);
    }
    arr.push(<QuestionBox num={i} key={i} que={this.props.ques[i].que} options={options} />);
  }
  return arr;
};
handleChange = (event) => {
  console.log('eventtttt:', event.target);

  event.target.checked = true;
}
enableButton = () => {
  for (let i = 0; i < this.props.users.length; i += 1) {
    if (this.props.users[i].uname === this.props.user && this.props.users[i].ans === '#') {
      return true;
    }

    return false;
  }
  return true;
}
calculateScore = () => {
  let score = 0;
  for (let i = 0; i < this.props.users.length; i += 1) {
    if (this.props.users[i].uname === this.props.user) {
      for (let j = 0; j < this.props.ques.length; j += 1) {
        if (this.props.users[i].qid === this.props.ques[j].qid) {
          if (this.props.users[i].ans === this.props.ques[j].ans) {
            score += 1;
          }
        }
      }
    }
  }
  const obj = {
    user: this.props.user,
    score,
  };
  console.log('score is:', score);
  fetch('http://localhost:3000/quiz/saveScore', {
    method: 'POST',
    body: JSON.stringify(obj),
  }).then(data => data.text())
    .then((data) => {
      console.log('sav Ans API:', data);
    });

  for (let i = 0; i < this.props.scores.length; i += 1) {
    if (this.props.scores[i].uname === this.props.user) {
      this.props.scores[i].score = score;
    }
  }
  console.log('userScore', this.props.scores);
  this.props.leaderBoard();
  this.cal();
}
cal = () => {
  const arr = this.props.scores;
  // const userScore = [];
  // for (let i = 0; i < this.props.scores.length; i += 1) {
  //   userScore[i] = this.props.scores[i].score;
  // }
  //   userScore = userScore.sort();
  //   usersDetails = [];
  //   // console.log('userScore:', userScore);
  //   for (let i = 0; i < userScore.length && i < 5; i += 1) {
  //     for (let j = 0; j < this.props.scores.length; j += 1) {
  // if()
  //     }
  //   }
  // const sortable = [];
  // for (let i = 0; i < this.props.scores.length; i += 1) {
  //   sortable.push([vehicle, maxSpeed[vehicle]]);
  // }

  // sortable.sort((a, b) => a[1] - b[1]);
  function compare(a, b) {
    if (a.score < b.score) { return -1; }
    if (a.score > b.score) { return 1; }
    return 0;
  }

  this.props.scores.sort(compare);
  console.log('userScore::::::::::::::::', this.props.scores);
  // this.props.scores = arr;
}
disButton = () => {
  for (let i = 0; i < this.props.users.length; i += 1) {
    if (this.props.users[i].uname === this.props.user && this.props.users[i].ans === '#') {
      return true;
    }
  }
  return false;
}
render() {
  return (
    <div className="QuestionBody-main">
      <div className="questionBox">
        {/* {() => this.enableButton()} */}
        {this.showQuestions()}
      </div>
      <div className="calculate-div">
        {this.enableButton}
        <button className="calculate" disabled={this.disButton()} onClick={this.calculateScore}>calculate</button>
      </div>
    </div>
  );
}
}

const mapDispatchToProps = dispatch => ({
  saveAns: obj => dispatch(saveAns(obj)),

});
const mapStateToProps = state => ({
  ques: state.reducer.ques,
  users: state.reducer.users,
  scores: state.reducer.scores,
});
export default connect(mapStateToProps, mapDispatchToProps)(QuestionBody);

