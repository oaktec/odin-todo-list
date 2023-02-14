import PubSub from "pubsub-js";

export default function component() {
  const div = document.createElement("div");
  div.id = "sidebar";

  const listDiv = document.createElement("ul");
  listDiv.id = "sidebar-list";
  div.append(listDiv);

  function generateCategories(data) {
    listDiv.innerHTML = "";

    const all = document.createElement("li");
    all.classList.add("category");

    const allIcon = document.createElement("span");
    allIcon.classList.add("material-icons");
    allIcon.textContent = "home";
    all.append(allIcon);

    const allSpan = document.createElement("span");
    allSpan.textContent = "All";
    all.append(allSpan);

    all.addEventListener("click", () => {
      PubSub.publish("categorySelected", "All");
    });

    listDiv.append(all);

    const today = document.createElement("li");
    today.classList.add("category");

    const todayIcon = document.createElement("span");
    todayIcon.classList.add("material-icons");
    todayIcon.textContent = "today";
    today.append(todayIcon);

    const todaySpan = document.createElement("span");
    todaySpan.textContent = "Today";
    today.append(todaySpan);

    today.addEventListener("click", () => {
      PubSub.publish("categorySelected", "Today");
    });

    listDiv.append(today);

    const categories = document.createElement("li");
    categories.classList.add("category-header");
    categories.textContent = "Categories";
    listDiv.append(categories);

    const general = document.createElement("li");
    general.classList.add("category");

    const generalIcon = document.createElement("span");
    generalIcon.classList.add("material-icons");
    generalIcon.textContent = "list";
    general.append(generalIcon);

    const generalSpan = document.createElement("span");
    generalSpan.textContent = "General";
    general.append(generalSpan);

    general.addEventListener("click", () => {
      PubSub.publish("categorySelected", "General");
    });

    listDiv.append(general);

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
      const categoryDelete = document.createElement("span");
      categoryDelete.classList.add("material-icons");
      categoryDelete.classList.add("category-delete");
      categoryDelete.textContent = "delete";
      categoryLi.append(categoryDelete);
      categoryDelete.addEventListener("click", () => {
        PubSub.publish("categoryDelete", category);
      });
      listDiv.append(categoryLi);

      categoryLi.addEventListener("click", () => {
        PubSub.publish("categorySelected", category);
      });
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
      addCategorySpan.textContent = "New Category";
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
