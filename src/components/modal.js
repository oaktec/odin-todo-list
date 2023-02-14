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

  const None = document.createElement("option");
  None.value = "General";
  None.textContent = "General";
  category.append(None);

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

  submit.addEventListener("click", () => {
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

    title.value = "";
    description.value = "";
    category.value = "None";
    dueDate.value = "";
    priority.value = "Low";

    PubSub.publish("todoSubmitted", todo);

    modal.classList.remove("active");
  });

  return modal;
}
