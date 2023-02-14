import PubSub from "pubsub-js";
import "./style.css";
import { format } from "date-fns";

import headerComponent from "./components/header";
import sidebarComponent from "./components/sidebar";
import mainComponent from "./components/main";
import modalComponent from "./components/modal";

function TodoHandler() {
  let toDos = [];
  let categories = [];
  let filter = "All";
  let editedTodo = null;

  function createTodo(title, description, category, dueDate, priority) {
    return {
      title,
      description,
      category,
      dueDate,
      priority,
      completed: false,
    };
  }

  function addTodo(title, description, category, dueDate, priority) {
    toDos.push(createTodo(title, description, category, dueDate, priority));
    PubSub.publish("todoAdded", toDos);
  }

  function addTodos(todos) {
    toDos.push(...todos);
    PubSub.publish("todoAdded", toDos);
  }

  function addCategory(category) {
    if (!categories.includes(category)) {
      categories.push(category);
      PubSub.publish("categoriesChanged", categories);
    }
  }
  function setCategories(newCats) {
    categories = newCats;
    PubSub.publish("categoriesChanged", categories);
  }

  PubSub.subscribe("categoryDelete", (msg, data) => {
    const filtered = toDos.filter((x) => x.category !== data);
    categories = categories.filter((x) => x !== data);
    toDos = filtered;
    PubSub.publish("todoAdded", toDos);
    PubSub.publish("categoriesChanged", categories);
  });

  PubSub.subscribe("categoryAdded", (msg, data) => {
    addCategory(data);
  });

  PubSub.subscribe("todoCompleted", (msg, data) => {
    const index = toDos.indexOf(data);
    toDos[index].completed = !toDos[index].completed;
    PubSub.publish("todoAdded", toDos);
  });

  PubSub.subscribe("todoEditClicked", (msg, data) => {
    editedTodo = data;
  });

  PubSub.subscribe("todoEdited", (msg, data) => {
    const index = toDos.indexOf(editedTodo);
    toDos[index] = data;
    toDos[index].completed = editedTodo.completed;
    PubSub.publish("todoAdded", toDos);
  });

  PubSub.subscribe("todoDeleted", (msg, data) => {
    const index = toDos.indexOf(data);
    toDos.splice(index, 1);
    PubSub.publish("todoAdded", toDos);
  });

  PubSub.subscribe("todoAdded", () => {
    toDos.sort((a, b) => {
      const dateA = new Date(a.dueDate);
      const dateB = new Date(b.dueDate);
      return dateA - dateB;
    });
    PubSub.publish("categorySelected", filter);
  });

  PubSub.subscribe("categorySelected", (_, data) => {
    filter = data;
    let filtered;
    if (data === "Today") {
      filtered = toDos.filter(
        (x) => x.dueDate.slice(0, 10) === format(new Date(), "yyyy-MM-dd")
      );
    } else if (data === "All") {
      filtered = toDos;
    } else {
      filtered = toDos.filter((x) => x.category === data);
    }
    PubSub.publish("todosFiltered", filtered);
  });

  PubSub.subscribe("todoSubmitted", (msg, data) => {
    addTodo(
      data.title,
      data.description,
      data.category,
      data.dueDate,
      data.priority
    );
  });

  function getTodos() {
    return toDos;
  }

  return { addTodo, addTodos, setCategories, getTodos };
}

function storageHandler() {
  const storage = window.localStorage;

  function getTodos() {
    const todos = JSON.parse(storage.getItem("todos")) || [];
    return todos;
  }
  function setTodos(todos) {
    storage.setItem("todos", JSON.stringify(todos));
  }

  function getCategories() {
    const categories = JSON.parse(storage.getItem("categories")) || [];
    return categories;
  }
  function setCategories(categories) {
    storage.setItem("categories", JSON.stringify(categories));
  }

  PubSub.subscribe("todoAdded", (msg, data) => {
    setTodos(data);
  });
  PubSub.subscribe("categoriesChanged", (msg, data) => {
    setCategories(data);
  });

  return { getTodos, getCategories };
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

  const storage = storageHandler();
  const todoHandler = TodoHandler();

  const todos = storage.getTodos();
  todoHandler.setCategories(storage.getCategories());
  todoHandler.addTodos(todos);
})();
