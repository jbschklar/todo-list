"use strict";
import _, { times, update } from "lodash";
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
		const target = e.target.closest(".collapsible-aside");
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
		<div class="folder-list-container">
		<select class="projects-selector hidden" id="project-list-${obj.id}">
			<option>None</option>
		</select>
			<svg 
				xmlns="http://www.w3.org/2000/svg" 
				viewBox="0 0 24 24" 
				id="project-folder-${obj.id}"
				class="todo-icon">
				<path d="M19,3H12.472a1.019,1.019,0,0,1-.447-.1L8.869,1.316A3.014,3.014,0,0,0,7.528,1H5A5.006,5.006,0,0,0,0,6V18a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V8A5.006,5.006,0,0,0,19,3ZM5,3H7.528a1.019,1.019,0,0,1,.447.1l3.156,1.579A3.014,3.014,0,0,0,12.472,5H19a3,3,0,0,1,2.779,1.882L2,6.994V6A3,3,0,0,1,5,3ZM19,21H5a3,3,0,0,1-3-3V8.994l20-.113V18A3,3,0,0,1,19,21Z"/>
			</svg>
			
			</div>
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
                class="todo-icon delete-todo"
				id="${obj.id}"
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
            <h3>Checklist</h3>
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
    <div class="todo-notes">
        <textarea
            name="notes"
            id="notes-${obj.id}"
            cols="70"
            rows="10"
            placeholder="Notes"
        >${obj.notes ? obj.notes : ""}</textarea>
    </div>
    </div>
    `;
		mainContainer.insertAdjacentHTML("beforeend", todo);
	};
	// renders checklist under the todo as a drop down menu from todo obj
	const renderCheckList = function (todo) {
		const stepList = document
			.querySelector(`.${todo.id}`)
			.querySelector(".todo-steps");
		todo.checkList.forEach((obj) => {
			const listItem = document.createElement("li");
			listItem.innerHTML = `<input type="checkbox" name="steps" id="steps" ${
				obj.checked ? "checked" : ""
			}/>${obj.step}`;
			stepList.appendChild(listItem);
		});
	};

	// adds event handler to update checklist displayed on rendered todo and updates todo obj via the handler
	const addHandlerChecklistUpdate = function (handler, todo) {
		const targetList = document.querySelector(`.${todo.id}`);
		// to add checklist steps
		targetList.addEventListener("click", (e) => {
			const target = e.target;
			if (
				!targetList.classList.contains("lock") &&
				target.closest("button") &&
				target.closest("button").classList.contains("add-checklist-item")
			) {
				handler(todo, target, targetList);
			}
		});
	};

	const addHandlerEditSteps = function (handler, todo) {
		const targetList = document.querySelector(`.${todo.id}`);
		const steps = targetList.querySelectorAll(".todo-steps > li");
		steps.forEach((step) => {
			step.addEventListener("dblclick", (e) => {
				const target = e.target;
				handler(todo, target);
			});
		});
	};

	const addHandlerChecked = function (handler, todo) {
		const targetList = document.querySelector(`.${todo.id}`);
		const checkBoxes = targetList.querySelectorAll("ul input");

		checkBoxes.forEach((checkBox) => {
			if (checkBox.type === "checkbox") {
				checkBox.addEventListener("change", (e) => {
					const target = e.target.closest("li");
					const stepText = target.textContent;
					const boolean = e.target.checked;
					handler(todo, stepText, boolean);
				});
			}
		});
	};

	const addHandlerNotes = function (handler, todo) {
		const targetNote = document.getElementById(`notes-${todo.id}`);
		targetNote.addEventListener("change", (e) => {
			const noteText = targetNote.value;
			handler(todo, noteText);
		});
	};

	const revealProjects = function (todo, handler) {
		const targetFolderIcon = document.getElementById(
			`project-folder-${todo.id}`
		);
		const targetFolderList = document.getElementById(`project-list-${todo.id}`);
		targetFolderIcon.addEventListener("click", (e) => {
			targetFolderList.classList.toggle("hidden");
			// to pass a handler with populateProjFolder fn add projects as they are created w/o reloading page
			handler(todo);
		});
	};

	const populateProjFolder = function (todo, projectsArr, selectedProject) {
		const targetFolderList = document.getElementById(`project-list-${todo.id}`);
		targetFolderList.innerHTML = "";
		projectsArr.forEach((project) => {
			const option = document.createElement("option");
			option.textContent = project.title;
			if (selectedProject && project.title === selectedProject.title)
				option.setAttribute("selected", "");
			targetFolderList.appendChild(option);
		});
	};

	const addHandlerProjectAssign = function (handler, todo) {
		const targetFolderList = document.getElementById(`project-list-${todo.id}`);
		targetFolderList.addEventListener("change", (e) => {
			const selectedProject = targetFolderList.value;
			handler(selectedProject, todo);
		});
	};
	//creates tempObj from todo form to send to controller fn
	const todoFormInputs = () => {
		const titleField = document.getElementById("title");
		const title = titleField.value;
		const dueDateField = document.getElementById("due-date");
		const dueDate = dueDateField.value;
		// to clear input fields
		titleField.value = "";
		dueDateField.value = "";
		return { title, dueDate };
	};

	// creates obj with title from project form to send to controller
	const projectFormInput = () => {
		const titleField = document.getElementById("project-title");
		const title = titleField.value;
		// to clear input field
		titleField.value = "";
		return { title };
	};

	// adds event handler for the add todo button on form
	const addHandlerNewTodo = function (handler) {
		createTodoBtn.addEventListener("click", (e) => {
			e.preventDefault();
			handler();
		});
	};

	// adds event handler for the add project button on form
	const addHandlerNewProject = function (handler) {
		createProjectBtn.addEventListener("click", (e) => {
			e.preventDefault();
			handler();
		});
	};

	// deletes todo from view and array via the handler
	const addHandlerDeleteTodo = function (handler, todo) {
		const deleteTodoBtn = document.querySelector(`#${todo.id}`);
		deleteTodoBtn.addEventListener("click", (e) => {
			const targetTodo = e.target.closest(".todo");
			handler(e.target.id);
			targetTodo.remove();
		});
	};

	const addHandlerSort = function (handler) {
		const sortBtn = document.querySelector(".sort-btn");
		sortBtn.addEventListener("click", (e) => {
			mainContainer.innerHTML = "";
			handler();
		});
	};

	return {
		renderMainArea,
		renderCheckList,
		todoFormInputs,
		projectFormInput,
		addHandlerNewTodo,
		addHandlerNewProject,
		revealProjects,
		populateProjFolder,
		addHandlerProjectAssign,
		addHandlerChecklistUpdate,
		addHandlerEditSteps,
		addHandlerChecked,
		addHandlerDeleteTodo,
		addHandlerNotes,
		addHandlerSort,
	};
})();

const asideView = (() => {
	const aside = document.querySelector("aside");
	const projects = document.querySelector(".projects-list");

	const renderProject = function (project) {
		const title = document.createElement("li");
		title.innerHTML = `${project.title}${
			project.title === "None"
				? ""
				: `<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		class="todo-icon delete-project"
		id="${project.id}"
	>
		<g id="_01_align_center" data-name="01 align center">
			<polygon
				points="18.707 6.707 17.293 5.293 12 10.586 6.707 5.293 5.293 6.707 10.586 12 5.293 17.293 6.707 18.707 12 13.414 17.293 18.707 18.707 17.293 13.414 12 18.707 6.707"
			/>
		</g>
	</svg>`
		}`;
		projects.appendChild(title);
	};

	const addHandlerDeleteProject = function (handler, project) {
		const deleteProjectBtn = document.getElementById(`${project.id}`);
		if (!deleteProjectBtn) return;
		deleteProjectBtn.addEventListener("click", (e) => {
			const projectEl = e.target.closest("li");
			handler(project.id);
			projectEl.remove();
		});
	};

	return { renderProject, addHandlerDeleteProject };
})();

// Model code //////////////////////////////////////////////////////
const Model = (() => {
	const state = {
		todosArr: [],
		projectsArr: ["None"],
	};

	const createTodo = function (obj) {
		return {
			title: obj.title,
			dueDate: obj.dueDate,
			checkList: [],
			notes: "",
			id: "todo" + new Date().getTime().toString().slice(-6),
		};
	};

	const createStep = function (string) {
		return { step: string, checked: false };
	};

	const createProject = function (obj) {
		return {
			title: obj.title,
			todos: [],
			id: "project" + new Date().getTime().toString().slice(-6),
		};
	};

	// to find the todo's assigned project if already assigned
	const findCurrentProject = function (todo) {
		let currentProject;
		state.projectsArr.forEach((p) => {
			if (p.todos.some((obj) => obj.id === todo.id)) {
				currentProject = p;
				return;
			}
		});
		return currentProject;
	};

	const addProjectTodo = function (projectTitle, todo) {
		removeProjectTodo(todo);
		const index = state.projectsArr.findIndex(
			(project) => project.title === projectTitle
		);
		// state.projectsArr[index].todos = [todo];
		state.projectsArr[index].todos.push(todo);
		persistProjects();
		// console.log(state.projectsArr);
	};

	const removeProjectTodo = function (todo) {
		const currentProject = findCurrentProject(todo);
		if (!currentProject) return;
		const projectIndex = state.projectsArr.findIndex(
			(project) => project.id === currentProject.id
		);
		const todoIndex = state.projectsArr[projectIndex].todos.findIndex(
			(t) => t.id === todo.id
		);
		state.projectsArr[projectIndex].todos.splice(todoIndex, 1);
		persistProjects();
	};

	const persistTodos = function () {
		localStorage.setItem("todos", JSON.stringify(state.todosArr));
	};

	const persistProjects = function () {
		localStorage.setItem("projects", JSON.stringify(state.projectsArr));
	};

	const deleteTodo = function (id) {
		const index = state.todosArr.findIndex((todo) => todo.id === id);
		state.todosArr.splice(index, 1);
		persistTodos();
	};

	const deleteStep = function (todo, string) {
		const index = todo.checkList.findIndex((obj) => obj.step === string);
		todo.checkList.splice(index, 1);
		persistTodos();
	};

	const editStep = function (todo, oldStep, newStep) {
		const index = todo.checkList.findIndex((obj) => obj.step === oldStep);
		todo.checkList.splice(index, 1, createStep(newStep));
		persistTodos();
	};

	const editChecked = function (todo, string, boolean) {
		const index = todo.checkList.findIndex((obj) => obj.step === string);
		todo.checkList[index].checked = boolean;
		persistTodos();
	};

	const editNote = function (todo, string) {
		todo.notes = string;
		persistTodos();
	};

	const deleteProject = function (projectId) {
		const index = state.projectsArr.findIndex(
			(project) => project.id === projectId
		);
		state.projectsArr.splice(index, 1);
		persistProjects();
	};

	const initFromStorage = function () {
		const todoStorage = localStorage.getItem("todos");
		const projectStorage = localStorage.getItem("projects");
		if (todoStorage) state.todosArr = JSON.parse(todoStorage);

		if (projectStorage) state.projectsArr = JSON.parse(projectStorage);
	};

	initFromStorage();

	return {
		state,
		createTodo,
		createStep,
		createProject,
		deleteTodo,
		deleteStep,
		editStep,
		editChecked,
		editNote,
		deleteProject,
		persistTodos,
		persistProjects,
		addProjectTodo,
		removeProjectTodo,
		findCurrentProject,
	};
})();

// Controller //////////////////////////////////////////////////////
const Controller = (() => {
	// fn to create todos from form and add to todosArr
	const controlNewTodos = function () {
		const newTodo = Model.createTodo(View.todoFormInputs());

		console.log(Model.state.todosArr);
		View.renderMainArea(newTodo);
		View.addHandlerChecklistUpdate(controlChecklistUpdates, newTodo);
		Model.state.todosArr.push(newTodo);
		View.addHandlerDeleteTodo(controlDeleteTodo, newTodo);
		View.addHandlerChecked(controlChecked, newTodo);
		View.addHandlerNotes(controlNotes, newTodo);
		View.revealProjects(newTodo, controlTodoProjectList);
		View.addHandlerProjectAssign(controlProjectAssign, newTodo);
		Model.persistTodos();
	};

	const controlDeleteTodo = function (id) {
		Model.deleteTodo(id);
	};

	// updates display of checklist with new steps and updates checklist array of todo passed as argument
	const controlChecklistUpdates = function (todo, target, targetList) {
		targetList.classList.add("lock");
		const list = target.closest(".drop-list").firstElementChild;
		const newListItem = document.createElement("li");
		const newStep = document.createElement("input");
		newListItem.appendChild(newStep);
		list.appendChild(newListItem);
		// changes input to submitted step on 'enter'
		newStep.addEventListener("change", (e) => {
			newListItem.innerHTML = `<input type="checkbox" name="steps" id="steps" />${e.target.value}`;
			// add newListItem to original todoObj
			todo.checkList.push(Model.createStep(e.target.value));
			Model.persistTodos();
			targetList.classList.remove("lock");
		});
		// Adds this event listener to list items once they are created since they don't exist
		//when this is initially called during init
		View.addHandlerEditSteps(controlEditSteps, todo);
	};

	const controlEditSteps = function (todo, target) {
		const stepText = target.textContent;
		target.innerHTML = `<input type="checkbox" name="steps" id="steps" /><input type="text" name="step-edit" id="step-edit">`;
		const editField = document.getElementById("step-edit");
		editField.value = `${stepText}`;
		editField.addEventListener("keypress", (e) => {
			if (e.key !== "Enter") return;
			if (editField.value === "") {
				Model.deleteStep(todo, stepText);
				target.closest("li").remove();
				return;
			}
			target.innerHTML = `<input type="checkbox" name="steps" id="steps" />${editField.value}`;
			Model.editStep(todo, stepText, editField.value);
		});
	};

	const controlChecked = function (todo, stepText, boolean) {
		Model.editChecked(todo, stepText, boolean);
	};

	const controlNotes = function (todo, text) {
		Model.editNote(todo, text);
	};

	const controlTodoProjectList = function (
		todo,
		projectsArr = Model.state.projectsArr
	) {
		// fn to look for todo's assigned project and pass as argument to attatch selected attribute
		const selectedProject = Model.findCurrentProject(todo);
		View.populateProjFolder(todo, projectsArr, selectedProject);
	};

	const controlNewProjects = function () {
		const newProject = Model.createProject(View.projectFormInput());
		Model.state.projectsArr.push(newProject);
		Model.persistProjects();
		asideView.renderProject(newProject);
		asideView.addHandlerDeleteProject(controlDeleteProject, newProject);
	};

	const controlProjectAssign = function (projectTitle, todo) {
		if (projectTitle === "None") {
			Model.removeProjectTodo(todo);
			return;
		}
		Model.addProjectTodo(projectTitle, todo);
	};

	const controlDeleteProject = function (id) {
		Model.deleteProject(id);
	};

	const controlMainOrder = function () {
		Model.state.todosArr.sort((a, b) => {
			a.dueDate - b.dueDate;
		});
		Model.state.todosArr.forEach((t) => {
			todoFeatures(t);
		});
	};

	const todoFeatures = function (todo) {
		View.renderMainArea(todo);
		View.renderCheckList(todo);
		View.addHandlerChecklistUpdate(controlChecklistUpdates, todo);
		View.addHandlerEditSteps(controlEditSteps, todo);
		View.addHandlerChecked(controlChecked, todo);
		View.addHandlerDeleteTodo(controlDeleteTodo, todo);
		View.addHandlerNotes(controlNotes, todo);
		View.revealProjects(todo, controlTodoProjectList);
		View.addHandlerProjectAssign(controlProjectAssign, todo);
	};

	const init = () => {
		Model.state.todosArr.forEach((todo) => {
			todoFeatures(todo);
		});
		View.addHandlerSort(controlMainOrder);
		View.addHandlerNewTodo(controlNewTodos);
		View.addHandlerNewProject(controlNewProjects);
		// for the asise
		if (Model.state.projectsArr)
			Model.state.projectsArr.forEach((project) => {
				asideView.renderProject(project);
				asideView.addHandlerDeleteProject(controlDeleteProject, project);
			});
	};

	init();
})();
// Notes //

// checklist additions:
// 1) I need to limit new step inputs to one at a times. ✅
// 2) I need to add ability to delete steps. ✅
// 3) I need to find a way to keep checked steps checked ✅.

// I need to add event listeners to delete buttons on todos ✅ and projects ✅.

// Notes additions:
// 1) Keep notes as stored strings on todo objects. ✅
// 2) link them to todo via ID ✅
// 3) event listener on change to update object and local storage ✅

// Aside tasks:
// 1) Add ability to populate aside projects from projectsArr. ✅
// 2) Add drag and drop for todos to projects in aside ❎ and/or select projects
//   from dropdown list populated by existing projects in array.✅
// 2.b) add escape function for selection of none from projects folder options ✅
// 2.c) add populateFolder fn to the click of folder icon and make current project the first in the list ✅
// 3) Organize todos by date.
// 4) Populate main display with selected todo/project from aside on select
// 5) Add ability to delete todo from projectsArr

// Over all:
// 1) Create buttons to hide/reveal forms for todos and projects.
// 2) Make form fields capitalize first letter.
// 3) Create warning modal to verify before deleteing todo's or projects
// 4) refactor model code to add helper functions for findTodoIndex and findProjectIndex to keep DRY
