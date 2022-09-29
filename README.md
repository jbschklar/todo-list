# todo-list
This is more than just a Todo list. This application allows the user to create project folders to organize their todos.
It also allows for the addition of steps that can be edited and checked off as well as notes all stored on the Todo object.
When a Todo is created, the user can then assign it to an existing project or create a project and assign it later.
The aside area allows the user to select how to display todos either by project or due date (today, next 3 days, or this week).
Todos that are past due appear in red and there is a sort button to organize displayed todos by date, either ascending or descending.

I organized my code using the MCV model and made use of handlers to combine model and view code in the controller to keep separation.
I used local storage to store the users data but in the future I would like to use a server with more backend code to allow for more users.

Directions:
- to create a todo, click on the new Todo button, provide title and due date, and then click the add icon.
- to create a project, repeat the same steps with the new project.
- to assign a todo to a project, click on the folder icon on the Todo and select the desired project. To remove the Todo from a project, select None.
- each Todo has a checklist icon and a notepad icon. Click on each to reveal areas to add steps or notes.
- double click on a submitted step to edit.
- to delete a Todo, click the delete icon on the main display, and to delete a project, click the delete icon next to the title in the aside project area.

For a live preview, visit jbschklar.github.io/todo-list
