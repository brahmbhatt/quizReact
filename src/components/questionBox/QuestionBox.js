import React from 'react';
import { connect } from 'react-redux';
import './questionBox.css';

class QuestionBox extends React.Component {
  render() {
    return (
      <div className="QuestionBox-main">
        <div className="que-number"><p className="que-number-p">Question {this.props.num}</p></div>
        <div className="question"><p className="question-p">{this.props.que}</p></div>
        <div className="options">
          <div className="options-div">
            <form className="form">
              {this.props.options}
            </form>
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({


});
const mapStateToProps = state => ({
  ques: state.ques,
  users: state.users,
  scores: state.scores,
});
export default connect(mapStateToProps, mapDispatchToProps)(QuestionBox);
