import React from 'react';
import Question from '../components/Question';
import AnswerOption from '../components/AnswerOption';

function Quiz(props) {
	function renderAnswerOptions(key) {
		return (
			<AnswerOption
				key={key.content}
				answerContent={key.content}
				answerType={key.type}
				answer={props.answer}
				questionId={props.questionId}
				onAnswerSelected={props.onAnswerSelected}
			/>
		);
	}

	return (
		<div className="Quiz">
			<div className="Count">
				[ {props.questionId} / {props.questionTotal} ]
			</div>
			<Question content={props.question} />
			<div className="Answers-wrapper">
				{props.answerOptions.map(renderAnswerOptions)}
			</div>
		</div>
	);
}

export default Quiz;