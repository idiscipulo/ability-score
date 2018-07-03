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
				dexterity: 10,
				constitution: 10,
				intelligence: 10,
				wisdom: 10,
				charisma: 10
			},
			result: ''
		};

		this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
		this.reset = this.reset.bind(this);
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
				mod = -2;
				break;
			case "str1":
				ability = "strength";
				mod = 0;
				break;
			case "str2":
				ability = "strength";
				mod = 2;
				break;
			case "dex0":
				ability = "dexterity";
				mod = -2;
				break;
			case "dex1":
				ability = "dexterity";
				mod = 0;
				break;
			case "dex2":
				ability = "dexterity";
				mod = 2;
				break;
			case "con0":
				ability = "constitution";
				mod = -2;
				break;
			case "con1":
				ability = "constitution";
				mod = 0;
				break;
			case "con2":
				ability = "constitution";
				mod = 2;
				break;
			case "int0":
				ability = "intelligence";
				mod = -2;
				break;
			case "int1":
				ability = "intelligence";
				mod = 0;
				break;
			case "int2":
				ability = "intelligence";
				mod = 2;
				break;
			case "wis0":
				ability = "wisdom";
				mod = -2;
				break;
			case "wis1":
				ability = "wisdom";
				mod = 0;
				break;
			case "wis2":
				ability = "wisdom";
				mod = 2;
				break;
			case "cha0":
				ability = "charisma";
				mod = -2;
				break;
			case "cha1":
				ability = "charisma";
				mod = 0;
				break;
			case "cha2":
				ability = "charisma";
				mod = 2;
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

	reset() {
		this.setState({
			counter: 0,
			questionId: 1,
			question: quizQuestions[0].question,
			answerOptions: quizQuestions[0].answers,
			answer: '',
			abilityList: {
				strength: 10,
				dexterity: 10,
				constitution: 10,
				intelligence: 10,
				wisdom: 10,
				charisma: 10
			},
			result: ''
		});
	}
	
	render () {
		return (
			<div className="App">
				<div className="App-header">
					<h1 className="Header-text">My D&D Abilities</h1>
				</div>
				{this.state.result ? this.renderResult() : this.renderQuiz()}
				<div className="Reset">
					<p onClick={this.reset}>Reset</p>
				</div>
				<div className="App-footer">
					<p className="Footer-line">Created by Isaiah Discipulo</p>
					<p className="Footer-line">ikdiscipulo@gmail.com</p>
					<br />
					<p className="Footer-line">Thanks to Zach Kumaishi</p>
				</div>
			</div>
		);
	}
}

export default App;