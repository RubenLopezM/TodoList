import React from "react";
import PropTypes, { element } from "prop-types";

const Task = props => {
	return (
		<div>
			<li
				className="task"
				onClick={() => {
					props.filter(props.label);
				}}>
				{props.label}
			</li>
		</div>
	);
};

Task.propTypes = {
	label: PropTypes.string,
	filter: PropTypes.func
};

export default Task;
