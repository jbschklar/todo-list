"use strict";
import _, { update } from "lodash";
import "./style.css";

// View code ////////////////////////////////////////////////////////////////////////
const View = (() => {
	const mainContainer = document.querySelector(".todo-container");
	const body = document.querySelector("body");
	const createTodoBtn = document.querySelector(".create-todo-btn");
	const createProjectBtn = document.querySelector(".create-project-btn");

	// to toggle dropdowns
	body.addEventListener("click", (e) => {
		// for notes section of todo's in main display
		if (
			e.target.closest("svg") &&
			e.target.closest("svg").classList.contains("notebook")
		) {
			const notes = e.target.closest(".todo").querySelector(".todo-notes");
			notes.classList.toggle("active");
			return;
		}
		// for checklist
		if (
			e.target.closest("svg") &&
			e.target.closest("svg").classList.contains("checklist-icon")
		) {
			const checkList = e.target.closest(".todo").querySelector(".drop-list");
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

	const renderMainArea = function (obj) {
		const todo = `
        <div class="todo">
        <div class="collapsible">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            id="Layer_1"
            viewBox="0 0 24 24"
            class="checklist-icon todo-icon"
            data-name="Layer 1"
        >
            <path
                d="m4 6a2.982 2.982 0 0 1 -2.122-.879l-1.544-1.374a1 1 0 0 1 1.332-1.494l1.585 1.414a1 1 0 0 0 1.456.04l3.604-3.431a1 1 0 0 1 1.378 1.448l-3.589 3.414a2.964 2.964 0 0 1 -2.1.862zm20-2a1 1 0 0 0 -1-1h-10a1 1 0 0 0 0 2h10a1 1 0 0 0 1-1zm-17.9 9.138 3.589-3.414a1 1 0 1 0 -1.378-1.448l-3.6 3.431a1.023 1.023 0 0 1 -1.414 0l-1.59-1.585a1 1 0 0 0 -1.414 1.414l1.585 1.585a3 3 0 0 0 4.226.017zm17.9-1.138a1 1 0 0 0 -1-1h-10a1 1 0 0 0 0 2h10a1 1 0 0 0 1-1zm-17.9 9.138 3.585-3.414a1 1 0 1 0 -1.378-1.448l-3.6 3.431a1 1 0 0 1 -1.456-.04l-1.585-1.414a1 1 0 0 0 -1.332 1.494l1.544 1.374a3 3 0 0 0 4.226.017zm17.9-1.138a1 1 0 0 0 -1-1h-10a1 1 0 0 0 0 2h10a1 1 0 0 0 1-1z"
            />
        </svg>
        <h2>${obj.title}</h2>
        <p class="due-date">${obj.dueDate}</p>
        <div class="todo-icons">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                id="Layer_1"
                height="512"
                viewBox="0 0 24 24"
                class="notebook todo-icon"
                data-name="Layer 1"
            >
                <path
                    d="m19 3.022c0-.008 0-.014 0-.022v-2a1 1 0 0 0 -2 0v1.1a5 5 0 0 0 -1-.1h-1v-1a1 1 0 0 0 -2 0v1h-2v-1a1 1 0 0 0 -2 0v1h-1a5 5 0 0 0 -1 .1v-1.1a1 1 0 0 0 -2 0v2 .022a4.979 4.979 0 0 0 -2 3.978v12a5.006 5.006 0 0 0 5 5h8a5.006 5.006 0 0 0 5-5v-12a4.979 4.979 0 0 0 -2-3.978zm0 15.978a3 3 0 0 1 -3 3h-8a3 3 0 0 1 -3-3v-12a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3zm-2-11a1 1 0 0 1 -1 1h-8a1 1 0 0 1 0-2h8a1 1 0 0 1 1 1zm0 4a1 1 0 0 1 -1 1h-8a1 1 0 0 1 0-2h8a1 1 0 0 1 1 1zm-4 4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 0-2h4a1 1 0 0 1 1 1z"
                />
            </svg>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class="todo-icon"
            >
                <g id="_01_align_center" data-name="01 align center">
                    <polygon
                        points="18.707 6.707 17.293 5.293 12 10.586 6.707 5.293 5.293 6.707 10.586 12 5.293 17.293 6.707 18.707 12 13.414 17.293 18.707 18.707 17.293 13.414 12 18.707 6.707"
                    />
                </g>
            </svg>
        </div>
    </div>
    <div class="drop-list ${obj.id}">
        <ul class="todo-steps">
            <li><h3>Checklist</h3></li>
        </ul>
        <button class="add-checklist-item">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                version="1.1"
                id="Capa_1"
                x="0px"
                y="0px"
                viewBox="0 0 512 512"
                style="enable-background: new 0 0 512 512"
                xml:space="preserve"
                class="add-checklist-icon"
            >
                <g>
                    <path
                        d="M480,224H288V32c0-17.673-14.327-32-32-32s-32,14.327-32,32v192H32c-17.673,0-32,14.327-32,32s14.327,32,32,32h192v192   c0,17.673,14.327,32,32,32s32-14.327,32-32V288h192c17.673,0,32-14.327,32-32S497.673,224,480,224z"
                    />
                </g>
            </svg>
        </button>
    </div>
    <div class="todo-notes" ${obj.id}>
        <textarea
            name="notes"
            class="notes"
            cols="70"
            rows="10"
            placeholder="Notes"
        ></textarea>
    </div>
    </div>
    `;
		mainContainer.insertAdjacentHTML("beforeend", todo);
	};
	// renders checklist under the todo as a drop down menu from todo obj
	const renderCheckList = function (obj) {
		const stepList = document.querySelector(".todo-steps");
		obj.checkList.forEach((step) => {
			const listItem = document.createElement("li");
			listItem.innerHTML = `<input type="checkbox" name="steps" id="steps" /> ${step}`;
			stepList.appendChild(listItem);
		});
	};
	// updates display of checklist with new steps and updates checklist array of todoObj passed as argument
	const updateCheckList = function (todoObj) {
		const targetList = document.querySelector(`.${todoObj.id}`);
		console.log(targetList);
		// to add checklist steps
		targetList.addEventListener("click", (e) => {
			if (
				e.target.closest("button") &&
				e.target.closest("button").classList.contains("add-checklist-item")
			) {
				console.log(e.target.closest(".drop-list"));
				const list = e.target.closest(".drop-list").firstElementChild;
				const newListItem = document.createElement("li");
				const newStep = document.createElement("input");
				newListItem.appendChild(newStep);
				list.appendChild(newListItem);
				// changes input to submitted step on 'enter'
				newStep.addEventListener("change", (e) => {
					console.log(e.target.value);
					newListItem.innerHTML = `<input type="checkbox" name="steps" id="steps" />${e.target.value}`;
					// add newListItem to original todoObj
					todoObj.checkList.push(e.target.value);
				});
			}
		});
	};

	//creates tempObj from todo form to send to controller fn
	const todoFormInputs = () => {
		const title = document.getElementById("title").value;
		const dueDate = document.getElementById("due-date").value;
		return { title, dueDate };
	};

	// creates obj with title from project form to send to controller
	const projectFormInput = () => {
		const title = document.getElementById("project-title").value;
		return { title };
	};

	// adds event handler for the add todo button on form
	const addHandlerNewTodo = function (handler) {
		createTodoBtn.addEventListener("click", (e) => {
			e.preventDefault();
			handler();
		});
	};

	// adds event handler for the add roject button on form
	const addHandlerNewProject = function (handler) {
		createProjectBtn.addEventListener("click", (e) => {
			e.preventDefault();
			handler();
		});
	};

	return {
		renderMainArea,
		renderCheckList,
		updateCheckList,
		todoFormInputs,
		projectFormInput,
		addHandlerNewTodo,
		addHandlerNewProject,
	};
})();

let tempObj = {
	title: "Clean the playroom",
	dueDate: "09/10/22",
	checkList: ["pick up magnets", "pick up transformers", "pick up costumes"],
	notes: "If they finish by Saturday, they get a reward.",
};

// Model code //////////////////////////////////////////////////////
const Model = (() => {
	const createTodo = function (obj) {
		return {
			title: obj.title,
			dueDate: obj.dueDate,
			checkList: [],
			notes: "",
			id: obj.title.replaceAll(" ", ""),
		};
	};

	const createProject = function (obj) {
		return {
			title: obj.title,
			todos: [],
		};
	};

	const projectsArr = [];

	const todosArr = [];
	return { createTodo, createProject, todosArr, projectsArr };
})();

// Controller //////////////////////////////////////////////////////

// fn to create todos from form and add to todosArr
const controlNewTodos = function () {
	const newTodo = Model.createTodo(View.todoFormInputs());
	Model.todosArr.push(newTodo);
	console.log(Model.todosArr);
	View.renderMainArea(newTodo);
	View.renderCheckList(newTodo);
	View.updateCheckList(newTodo);
};

const controlNewProjects = function () {
	console.log("new project");
	const newProject = Model.createProject(View.projectFormInput());
	Model.projectsArr.push(newProject);
	console.log(Model.projectsArr);
};

const init = () => {
	View.addHandlerNewTodo(controlNewTodos);
	View.addHandlerNewProject(controlNewProjects);
};

init();
