import PubSub from "pubsub-js";

export default function component() {
  const div = document.createElement("div");
  div.id = "sidebar";

  const listDiv = document.createElement("ul");
  listDiv.id = "sidebar-list";
  div.append(listDiv);

  function generateCategories(data) {
    listDiv.innerHTML = "";
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

    data.forEach((category) => {
      if (category === "General" || category === "Today") return;
      const categoryLi = document.createElement("li");
      categoryLi.classList.add("category");
      const categoryIcon = document.createElement("span");
      categoryIcon.classList.add("material-icons");
      categoryIcon.textContent = "label";
      categoryLi.append(categoryIcon);
      const categorySpan = document.createElement("span");
      categorySpan.textContent = category;
      categoryLi.append(categorySpan);
      listDiv.append(categoryLi);
    });

    const addCategory = document.createElement("li");
    addCategory.classList.add("add-category");
    listDiv.append(addCategory);

    function generateAddCategory() {
      addCategory.innerHTML = "";
      const addCategoryIcon = document.createElement("span");
      addCategoryIcon.classList.add("material-icons");
      addCategoryIcon.textContent = "add";
      addCategory.append(addCategoryIcon);
      const addCategorySpan = document.createElement("span");
      addCategorySpan.textContent = "Add Category";
      addCategory.append(addCategorySpan);
      addCategory.addEventListener("click", generateCategoryInput, {
        once: true,
        capture: true,
      });
    }

    function generateCategoryInput() {
      addCategory.innerHTML = "";
      const input = document.createElement("input");
      input.type = "text";
      input.placeholder = "Category Name";
      addCategory.append(input);
      input.focus();
      const confirm = document.createElement("span");
      confirm.classList.add("material-icons");
      confirm.textContent = "check";
      addCategory.append(confirm);
      const cancel = document.createElement("span");
      cancel.classList.add("material-icons");
      cancel.textContent = "close";
      addCategory.append(cancel);
      confirm.addEventListener(
        "click",
        () => {
          if (
            input.value === "" ||
            input.value === "General" ||
            input.value === "Today"
          )
            return;
          PubSub.publish("categoryAdded", input.value);
          generateAddCategory();
        },
        { capture: true }
      );
      cancel.addEventListener(
        "click",
        () => {
          generateAddCategory();
        },
        { capture: true }
      );
    }

    generateAddCategory();
  }

  generateCategories([]);

  PubSub.subscribe("categoriesChanged", (msg, data) => {
    generateCategories(data);
  });

  return div;
}
