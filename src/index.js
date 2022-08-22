"use strict";
import _ from "lodash";
import "./style.css";

const collapseBtns = document.querySelectorAll(".collapsible");

collapseBtns.forEach((btn) => {
	btn.addEventListener("click", (e) => {
		console.log("click");
		const list = e.target.closest(".btn-lable").nextElementSibling;

		list.classList.toggle("active");
		console.log(list.classList);
	});
});

console.log(collapseBtns);
