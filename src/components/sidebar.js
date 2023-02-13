import PubSub from "pubsub-js";

export default function component() {
  const div = document.createElement("div");
  div.id = "sidebar";
  const listDiv = document.createElement("ul");
  div.append(listDiv);

  function listTodos(msg, data) {
    div.innerHTML = "";

    data.forEach((todo) => {
      const toDoDiv = document.createElement("li");
      toDoDiv.classList.add("todo");
      toDoDiv.textContent = todo.title;
      div.append(toDoDiv);
    });
  }

  PubSub.subscribe("todoAdded", listTodos);
  PubSub.subscribe("todoDeleted", listTodos);

  return div;
}
