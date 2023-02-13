import PubSub from "pubsub-js";
import "./style.css";

import headerComponent from "./components/header";
import sidebarComponent from "./components/sidebar";
import mainComponent from "./components/main";

function CreateDOMController() {
  const header = headerComponent();
  const sidebar = sidebarComponent();
  const main = mainComponent();

  document.body.appendChild(header);
  document.body.appendChild(sidebar);
  document.body.appendChild(main);

  const drawToDo = (toDo) => {
    const toDoDiv = document.createElement("div");
    toDoDiv.classList.add("todo");
    toDoDiv.innerHTML = `
    <h3>${toDo.title}</h3>
    <p>${toDo.description}</p>
    <p>${toDo.dueDate}</p>
    <p>${toDo.priority}</p>
    `;
    main.append(toDoDiv);
  };

  return { drawToDo };
}

function TodoHandler() {
  const toDos = [];

  function createTodo(title, description, dueDate, priority) {
    return {
      title,
      description,
      dueDate,
      priority,
    };
  }

  function addTodo(title, description, dueDate, priority) {
    toDos.push(createTodo(title, description, dueDate, priority));
    PubSub.publish("todoAdded", toDos);
  }

  function getTodos() {
    return toDos;
  }

  return { addTodo, getTodos };
}

(function () {
  const DOMController = CreateDOMController();

  const todoHandler = TodoHandler();
  todoHandler.addTodo(
    "Buy milk",
    "Buy milk from the store",
    "2021-01-01",
    "High"
  );
  todoHandler.addTodo(
    "Buy bread",
    "Buy bread from the store",
    "2021-01-01",
    "High"
  );
})();
