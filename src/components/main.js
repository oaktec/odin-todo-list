import PubSub from "pubsub-js";

export default function component() {
  const div = document.createElement("div");
  div.id = "main";

  PubSub.subscribe("todosFiltered", (_, data) => {
    div.innerHTML = "";
    for (let i = 0; i < data.length; i += 1) {
      const todo = document.createElement("div");
      todo.classList.add("todo");

      const title = document.createElement("h3");
      title.classList.add("todo-title");
      title.textContent = data[i].title;
      todo.append(title);

      const description = document.createElement("p");
      description.classList.add("todo-description");
      description.textContent = data[i].description;
      todo.append(description);

      const category = document.createElement("span");
      category.classList.add("todo-category");
      category.textContent = data[i].category;
      todo.append(category);

      const dueDate = document.createElement("span");
      dueDate.classList.add("todo-due-date");
      dueDate.textContent = data[i].dueDate;
      todo.append(dueDate);

      const priority = document.createElement("span");
      priority.classList.add("todo-priority");
      priority.textContent = data[i].priority;
      todo.append(priority);

      const deleteButton = document.createElement("span");
      deleteButton.classList.add("todo-delete");
      deleteButton.innerHTML = "<span class='material-icons'>delete</span>";
      todo.append(deleteButton);

      div.append(todo);
    }
  });
  return div;
}
