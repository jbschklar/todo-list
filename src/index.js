"use strict";
import _, { update } from "lodash";
import "./style.css";
// view variables
const collapseBtns = document.querySelectorAll(".collapsible");
const addCheckListItemBtn = document.querySelector(".add-checklist-item");

// to toggle collapsible lists of todos and projects
// View code
collapseBtns.forEach((btn) => {
	btn.addEventListener("click", (e) => {
		// for todo's in main display
		if (
			e.target.closest("svg") &&
			e.target.closest("svg").classList.contains("notebook")
		) {
			const notes = e.target.closest(".dropdown").querySelector(".todo-notes");
			notes.classList.toggle("active");
			return;
		}
		// // for checklist
		if (
			e.target.closest("svg") &&
			// e.target.closest("svg").classList.contains("checklist-icon")
			e.target.classList.contains("checklist-icon")
		) {
			const checkList = e.target
				.closest(".dropdown")
				.querySelector(".todo-steps");
			checkList.classList.toggle("active");
			return;
		}
		// for aside category dropdowns
		if (!e.target.closest("aside")) return;
		const target = e.target.closest(".collapsible");
		const list = target.nextElementSibling;
		const icons = target.querySelectorAll(".dropdown-icon");
		list.classList.toggle("active");
		icons.forEach((icon) => {
			icon.classList.toggle("active");
		});
	});
});

addCheckListItemBtn.addEventListener("click", (e) => {
	console.log("works");
	const list = e.target.closest(".todo-steps").firstElementChild;
	const newStep = document.createElement("li");
	newStep.innerHTML = `<input type="checkbox" name="steps" id="steps" />${prompt()}`;
	list.appendChild(newStep);
});

// Model code

const createTodo = function (obj) {
	return {
		title: obj.title,
		description: obj.description,
		dueDate: obj.dueDate,
		priority: obj.priority,
		checkList: obj.checkList,
		notes: obj.notes,
	};
};
