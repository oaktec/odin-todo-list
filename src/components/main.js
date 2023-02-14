import PubSub from "pubsub-js";
import { format } from "date-fns";

export default function component() {
  const div = document.createElement("div");
  div.id = "main";

  PubSub.subscribe("todosFiltered", (_, data) => {
    div.innerHTML = "";
    for (let i = 0; i < data.length; i += 1) {
      const todo = document.createElement("div");
      todo.classList.add("todo");

      const circle = document.createElement("span");
      circle.classList.add("todo-circle");
      circle.classList.add("material-icons");
      if (!data[i].completed) {
        circle.textContent = "radio_button_unchecked";
      } else {
        circle.textContent = "radio_button_checked";
      }
      circle.classList.add(data[i].priority.toLowerCase());
      todo.append(circle);

      circle.addEventListener("click", () => {
        PubSub.publish("todoCompleted", data[i]);
      });

      const title = document.createElement("span");
      title.classList.add("todo-title");
      if (data[i].completed) {
        title.classList.add("completed");
      }
      title.textContent = data[i].title;
      todo.append(title);

      const dueDate = document.createElement("span");
      dueDate.classList.add("todo-due-date");
      if (data[i].completed) {
        dueDate.classList.add("completed");
      }
      const date = new Date(data[i].dueDate);
      dueDate.textContent = format(date, "dd/MM/yyyy HH:mm");
      todo.append(dueDate);

      const category = document.createElement("span");
      category.classList.add("todo-category");
      if (data[i].completed) {
        category.classList.add("completed");
      }
      category.textContent = data[i].category;
      todo.append(category);

      const editButton = document.createElement("span");
      editButton.classList.add("todo-edit");
      editButton.classList.add("material-icons");
      editButton.textContent = "edit";
      todo.append(editButton);

      editButton.addEventListener("click", () => {
        PubSub.publish("todoEditClicked", data[i]);
      });

      const deleteButton = document.createElement("span");
      deleteButton.classList.add("todo-delete");
      deleteButton.classList.add("material-icons");
      deleteButton.textContent = "delete";
      todo.append(deleteButton);

      deleteButton.addEventListener("click", () => {
        PubSub.publish("todoDeleted", data[i]);
      });

      div.append(todo);
    }
  });
  return div;
}
