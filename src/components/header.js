import PubSub from "pubsub-js";

export default function component() {
  const div = document.createElement("div");
  div.id = "header";

  const headerLeft = document.createElement("div");
  headerLeft.classList.add("header-left");
  div.append(headerLeft);

  const toggleSidebarButton = document.createElement("button");
  toggleSidebarButton.classList.add("toggle-sidebar-button");
  toggleSidebarButton.innerHTML = "<span class='material-icons'>menu</span>";
  headerLeft.append(toggleSidebarButton);

  toggleSidebarButton.addEventListener("click", () => {
    PubSub.publish("toggleSidebarButtonClicked", null);
  });

  const homeButton = document.createElement("button");
  homeButton.classList.add("home-button");
  homeButton.innerHTML = "<span class='material-icons'>home</span>";
  headerLeft.append(homeButton);

  homeButton.addEventListener("click", () => {
    PubSub.publish("categorySelected", "All");
  });

  const headerRight = document.createElement("div");
  headerRight.classList.add("header-right");
  div.append(headerRight);

  const addTodoButton = document.createElement("button");
  addTodoButton.classList.add("add-todo-button");
  addTodoButton.innerHTML = "<span class='material-icons'>add</span>";
  headerRight.append(addTodoButton);

  addTodoButton.addEventListener("click", () => {
    PubSub.publish("addTodoButtonClicked", null);
  });

  return div;
}
