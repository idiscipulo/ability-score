import React from 'react';

function Result(props) {
	return (
		<div className="Result-page">
			<h2 className="Page-header">Ability Scores</h2>
			<div className="Result-wrapper">
				<div className="Result-option">
					<div className="Result">
						Strength: <strong>{props.quizResult.strength}</strong>
					</div>
				</div>
				<div className="Result-option">
					<div className="Result">
						Dexterity: <strong>{props.quizResult.dexterity}</strong>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Result;