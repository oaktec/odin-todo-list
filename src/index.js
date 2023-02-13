import PubSub from "pubsub-js";
import "./style.css";

import headerComponent from "./components/header";
import sidebarComponent from "./components/sidebar";
import mainComponent from "./components/main";
import modalComponent from "./components/modal";

function TodoHandler() {
  const toDos = [];

  function createTodo(title, description, category, dueDate, priority) {
    return {
      title,
      description,
      category,
      dueDate,
      priority,
    };
  }

  function addTodo(title, description, category, dueDate, priority) {
    toDos.push(createTodo(title, description, category, dueDate, priority));
    PubSub.publish("todoAdded", toDos);
  }

  function getTodos() {
    return toDos;
  }

  return { addTodo, getTodos };
}

(function () {
  const app = document.createElement("div");
  app.id = "app";
  document.body.appendChild(app);

  app.appendChild(headerComponent());

  const content = document.createElement("div");
  content.id = "content";
  app.appendChild(content);

  content.appendChild(sidebarComponent());
  content.appendChild(mainComponent());

  app.appendChild(modalComponent());

  const todoHandler = TodoHandler();
  todoHandler.addTodo(
    "Buy milk",
    "Buy milk from the store",
    "Default",
    "2021-01-01",
    "High"
  );
  todoHandler.addTodo(
    "Buy bread",
    "Buy bread from the store",
    "Default",
    "2021-01-01",
    "High"
  );
})();
