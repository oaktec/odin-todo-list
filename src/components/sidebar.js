import PubSub from "pubsub-js";

export default function component() {
  const div = document.createElement("div");
  div.id = "sidebar";

  const listDiv = document.createElement("ul");
  listDiv.id = "sidebar-list";
  div.append(listDiv);

  const general = document.createElement("li");
  general.classList.add("category");

  const generalIcon = document.createElement("span");
  generalIcon.classList.add("material-icons");
  generalIcon.textContent = "list";
  general.append(generalIcon);

  const generalSpan = document.createElement("span");
  generalSpan.textContent = "General";
  general.append(generalSpan);

  const today = document.createElement("li");
  today.classList.add("category");

  const todayIcon = document.createElement("span");
  todayIcon.classList.add("material-icons");
  todayIcon.textContent = "today";
  today.append(todayIcon);

  const todaySpan = document.createElement("span");
  todaySpan.textContent = "Today";
  today.append(todaySpan);

  listDiv.append(general);
  listDiv.append(today);

  const categories = document.createElement("li");
  categories.classList.add("category-header");
  categories.textContent = "Categories";
  listDiv.append(categories);

  const addCategory = document.createElement("li");
  addCategory.classList.add("add-category");
  const addCategoryIcon = document.createElement("span");
  addCategoryIcon.classList.add("material-icons");
  addCategoryIcon.textContent = "add";
  addCategory.append(addCategoryIcon);
  const addCategorySpan = document.createElement("span");
  addCategorySpan.textContent = "Add Category";
  addCategory.append(addCategorySpan);
  listDiv.append(addCategory);

  function listTodos(msg, data) {
    // div.innerHTML = "";
    // const sortedByCat = data.reduce((prev, curr) => {
    //   const { category } = curr;
    //   const ret = prev;
    //   if (!(category in prev)) ret[category] = [];
    //   ret[category].push(curr);
    //   return ret;
    // }, {});
    // Object.keys(sortedByCat).forEach((key, index) => {
    // });
    // data.forEach((todo) => {
    //   const toDoDiv = document.createElement("li");
    //   toDoDiv.classList.add("todo");
    //   toDoDiv.textContent = todo.title;
    //   div.append(toDoDiv);
    // });
  }

  PubSub.subscribe("todoAdded", listTodos);
  PubSub.subscribe("todoDeleted", listTodos);

  return div;
}
