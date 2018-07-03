import React from 'react';

function AnswerOption(props) {
	return (
		<div className="Answer-option">
			<input 
			type="radio"
			className="radioCustomButton"
			name="radioGroup"
			checked={props.answerType === props.answer}
			id={props.answerType}
			value={props.answerType}
			disabled={props.answer}
			onChange={props.onAnswerSelected}
			/>
			<label className="Answer" htmlFor={props.answerType}>
				{props.answerContent}
			</label>
		</div>
	);
}

export default AnswerOption;