"use strict";
import _ from "lodash";
import "./style.css";
// view variables
const collapseBtns = document.querySelectorAll(".collapsible");

// to toggle collapsible lists of todos and projects
// view code
collapseBtns.forEach((btn) => {
	btn.addEventListener("click", (e) => {
		console.log("click");
		const target = e.target.closest(".collapsible");
		const list = target.nextElementSibling;
		const icons = target.querySelectorAll("i");
		console.log(icons);
		list.classList.toggle("active");
		icons.forEach((icon) => {
			icon.classList.toggle("active");
		});
	});
});

console.log(collapseBtns);
