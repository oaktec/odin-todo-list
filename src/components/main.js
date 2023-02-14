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
      if (!data[i].completed) {
        circle.innerHTML =
          "<span class='material-icons'>radio_button_unchecked</span>";
      } else {
        circle.innerHTML =
          "<span class='material-icons'>radio_button_checked</span>";
      }
      circle.classList.add(data[i].priority.toLowerCase());
      todo.append(circle);

      circle.addEventListener("click", () => {
        PubSub.publish("todoCompleted", data[i]);
      });

      const title = document.createElement("span");
      title.classList.add("todo-title");
      title.textContent = data[i].title;
      todo.append(title);

      const dueDate = document.createElement("span");
      dueDate.classList.add("todo-due-date");
      const date = new Date(data[i].dueDate);
      dueDate.textContent = format(date, "dd/MM/yyyy HH:mm");
      todo.append(dueDate);

      const category = document.createElement("span");
      category.classList.add("todo-category");
      category.textContent = data[i].category;
      todo.append(category);

      const deleteButton = document.createElement("span");
      deleteButton.classList.add("todo-delete");
      deleteButton.innerHTML = "<span class='material-icons'>delete</span>";
      todo.append(deleteButton);

      div.append(todo);
    }
  });
  return div;
}
