import React, { Component } from 'react';
import './App.css';

import Quiz from './components/Quiz';
import Result from './components/Result';
import quizQuestions from './api/quizQuestions';

import update from 'react-addons-update';

class App extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      counter: 0,
      questionId: 1,
      question: '',
      answerOptions: [],
      answer: '',
      abilityList: {
        strength: 10,
        dexterity: 10
      },
      result: ''
    };

    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
  }

  componentWillMount() {
    this.setState({
      question: quizQuestions[0].question,
      answerOptions: quizQuestions[0].answers
    });
  }

  setUserAnswer(answer) {
    var ability = ''
    var mod = 0;

    switch(answer.value) {
      case "str0":
        ability = "strength";
        mod = -1;
        break;
      case "str1":
        ability = "strength";
        mod = 0;
        break;
      case "str2":
        ability = "strength";
        mod = 1;
        break;
      default:
        ability = "strength";
        mod = 0;
    }

    const updatedAbilityList = update(this.state.abilityList, {
      [ability]: {$apply: (currentValue) => currentValue + mod}
    });

    this.setState({
      abilityList: updatedAbilityList,
      answer: answer
    });
  }


  setNextQuestion() {
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;

    this.setState({
      counter: counter,
      questionId: questionId,
      question: quizQuestions[counter].question,
      answerOptions: quizQuestions[counter].answers,
      answer: ''
    });
  }

  handleAnswerSelected(event) {
    this.setUserAnswer(event.currentTarget);

    if(this.state.questionId < quizQuestions.length) {
      setTimeout(() => this.setNextQuestion(), 300);
    }else {
      setTimeout(() => this.setResults(), 300);
    }
  }

  setResults() {
    this.setState({result: true});
  }

  renderQuiz() {
    return (
      <Quiz
        answer={this.state.answer}
        answerOptions={this.state.answerOptions}
        questionId={this.state.questionId}
        question={this.state.question}
        questionTotal={quizQuestions.length}
        onAnswerSelected={this.handleAnswerSelected}
      />
    );
  }

  renderResult() {
    return (
      <Result quizResult={this.state.abilityList} />
    );
  }

  render () {
    return (
      <div className="App">
        <div className="App-header">
          <h1 className="Header-text">My D&D Stats</h1>
        </div>
        {this.state.result ? this.renderResult() : this.renderQuiz()}
      </div>
    );
  }
}

export default App;