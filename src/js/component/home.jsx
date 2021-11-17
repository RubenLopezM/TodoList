import { element } from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import Task from "./Task.jsx";

//include images into your bundle

//create your first component
const Home = () => {
	const INPUT = document.querySelector("input");

	const [List, SetList] = useState([]);
	const [todoList, SettodoList] = useState([]);
	const [update, Setupdate] = useState(false);

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/ruben", {
			headers: new Headers({
				"Content-Type": "application/json"
			})
		})
			.then(response => {
				console.log(response);

				if (response.ok) {
					return response.json();
				}
			})
			.then(responseAsJSON => {
				Setupdate(false);
				SetList(responseAsJSON);
			});
	}, []);

	useEffect(() => {
		if (update == true) {
			fetch("https://assets.breatheco.de/apis/fake/todos/user/ruben", {
				method: "PUT",
				body: JSON.stringify(List),
				headers: {
					"Content-Type": "application/json"
				}
			})
				.then(response => {
					if (!response.ok) {
						throw new Error("Fallo");
					}
					Setupdate(false);
				})
				.catch(error => {
					alert("Ha habido un error");
				});
		}
	}, [update]);

	useEffect(() => {
		if (List.length > 0) {
			SettodoList(
				List.map((element, index) => {
					return (
						<Task
							label={element.label}
							key={index.toString()}
							filter={updatetodo}></Task>
					);
				})
			);
		}
	}, [List]);

	function updatetodo(itemtoupdate) {
		SetList(List.filter(element => element.label != itemtoupdate));
		Setupdate(true);
	}

	return (
		<Fragment>
			<h1>My todo List</h1>
			<form
				onSubmit={event => {
					event.preventDefault();
					Setupdate(true);
					SetList([...List, { label: INPUT.value, done: false }]);
					INPUT.value = "";
				}}>
				<input type="text"></input>
				<input className="addtask" type="submit" value="Add"></input>
			</form>
			<ul>{todoList}</ul>
		</Fragment>
	);
};

export default Home;
