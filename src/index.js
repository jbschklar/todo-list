"use strict";
import _ from "lodash";
import "./style.css";
// view variables
const collapseBtns = document.querySelectorAll(".collapsible");

// to toggle collapsible lists of todos and projects
// view code
collapseBtns.forEach((btn) => {
	btn.addEventListener("click", (e) => {
		// for todo's in main display area notes
		if (e.target.classList.contains("fi-rr-notebook")) {
			const notes = e.target.closest(".dropdown").querySelector(".todo-notes");
			notes.classList.toggle("active");
			return;
		}
		// for todo steps and aside category dropdowns
		const target = e.target.closest(".collapsible");
		const list = target.nextElementSibling;
		const icons = target.querySelectorAll("i");
		list.classList.toggle("active");
		icons.forEach((icon) => {
			icon.classList.toggle("active");
		});
	});
});
