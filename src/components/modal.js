import PubSub from "pubsub-js";

export default function component() {
  const modal = document.createElement("div");
  modal.id = "modal";

  const cancelButton = document.createElement("span");
  cancelButton.id = "cancel-button";
  cancelButton.innerHTML = "<span class='material-icons'>close</span>";
  modal.append(cancelButton);

  const form = document.createElement("form");
  form.id = "modal-form";
  modal.append(form);

  const titleLabel = document.createElement("label");
  titleLabel.for = "title";
  titleLabel.textContent = "Title: ";
  form.append(titleLabel);

  const title = document.createElement("input");
  title.type = "text";
  title.minLength = 3;
  title.maxLength = 20;
  titleLabel.append(title);

  const descriptionLabel = document.createElement("label");
  descriptionLabel.for = "description";
  descriptionLabel.textContent = "Description: ";
  form.append(descriptionLabel);

  const description = document.createElement("input");
  description.type = "text";
  description.placeholder = "Optional";
  descriptionLabel.append(description);

  const categoryLabel = document.createElement("label");
  categoryLabel.for = "category";
  categoryLabel.textContent = "Category: ";
  form.append(categoryLabel);

  const category = document.createElement("select");
  categoryLabel.append(category);

  function generateCategoryOptions(categories) {
    categories.forEach((cat) => {
      const option = document.createElement("option");
      option.value = cat;
      option.textContent = cat;
      category.append(option);
    });
  }
  generateCategoryOptions(["General"]);
  PubSub.subscribe("categoriesChanged", (_, data) => {
    generateCategoryOptions(data);
  });

  const dueDateLabel = document.createElement("label");
  dueDateLabel.for = "dueDate";
  dueDateLabel.textContent = "Due Date: ";
  form.append(dueDateLabel);

  const dueDate = document.createElement("input");
  dueDate.type = "datetime-local";
  dueDate.required = true;
  dueDateLabel.append(dueDate);

  const priorityLabel = document.createElement("label");
  priorityLabel.for = "priority";
  priorityLabel.textContent = "Priority";
  form.append(priorityLabel);

  const priority = document.createElement("select");
  priorityLabel.append(priority);

  const low = document.createElement("option");
  low.value = "Low";
  low.textContent = "Low";
  priority.append(low);

  const medium = document.createElement("option");
  medium.value = "Medium";
  medium.textContent = "Medium";
  priority.append(medium);

  const high = document.createElement("option");
  high.value = "High";
  high.textContent = "High";
  priority.append(high);

  const submit = document.createElement("button");
  submit.type = "button";
  submit.textContent = "Create";
  form.append(submit);

  cancelButton.addEventListener("click", () => {
    modal.classList.remove("active");
  });

  PubSub.subscribe("addTodoButtonClicked", () => {
    title.value = "";
    description.value = "";
    category.value = "General";
    dueDate.value = "";
    priority.value = "Low";

    submit.textContent = "Create";
    submit.removeEventListener("click", submitEditTodo);
    submit.addEventListener("click", submitNewTodo);

    modal.classList.add("active");
  });

  PubSub.subscribe("todoEditClicked", (_, data) => {
    title.value = data.title;
    description.value = data.description;
    category.value = data.category;
    dueDate.value = data.dueDate;
    priority.value = data.priority;

    submit.textContent = "Save";
    submit.removeEventListener("click", submitNewTodo);
    submit.addEventListener("click", submitEditTodo);

    modal.classList.add("active");
  });

  function submitEditTodo() {
    if (title.value.length < 3 || title.value.length > 20) {
      alert("Title must be between 3 and 20 characters");
      return;
    }
    if (dueDate.value === "") {
      alert("Due date must be set");
      return;
    }

    const todo = {
      title: title.value,
      description: description.value,
      category: category.value,
      dueDate: dueDate.value,
      priority: priority.value,
    };

    PubSub.publish("todoEdited", todo);

    modal.classList.remove("active");
  }

  function submitNewTodo() {
    if (title.value.length < 3 || title.value.length > 20) {
      alert("Title must be between 3 and 20 characters");
      return;
    }
    if (dueDate.value === "") {
      alert("Due date must be set");
      return;
    }

    const todo = {
      title: title.value,
      description: description.value,
      category: category.value,
      dueDate: dueDate.value,
      priority: priority.value,
    };

    PubSub.publish("todoSubmitted", todo);

    modal.classList.remove("active");
  }

  submit.addEventListener("click", submitNewTodo);

  return modal;
}
