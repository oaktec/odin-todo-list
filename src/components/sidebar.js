import PubSub from "pubsub-js";

export default function component() {
  const div = document.createElement("div");
  div.id = "sidebar";
  div.textContent = "Sidebar";
  PubSub.subscribe("todoAdded", listTodos);

  return div;

  function listTodos(msg, data) {
    div.innerHTML = "";

    data.forEach((todo) => {
      const toDoDiv = document.createElement("div");
      toDoDiv.classList.add("todo");
      toDoDiv.textContent = todo.title;
      div.append(toDoDiv);
    });
  }

  function drawToDo(toDo) {
    const toDoDiv = document.createElement("div");
    toDoDiv.classList.add("todo");
    toDoDiv.innerHTML = `
    <h3>${toDo.title}</h3>
    <p>${toDo.description}</p>
    <p>${toDo.dueDate}</p>
    <p>${toDo.priority}</p>
    `;
    div.append(toDoDiv);
  }
}
