//Select DOM
const form = document.querySelector("form");
const input = document.querySelector(".todo-input");
const button = document.querySelector(".todo-btn");
const list = document.querySelector(".list");

//Functions
const saveLocalTodos = (todo) => {
  let todoList;
  if (localStorage.getItem("todoList") === null) {
    todoList = [];
  } else {
    todoList = JSON.parse(localStorage.getItem("todoList"));
  }
  todoList.push(todo);
  localStorage.setItem("todoList", JSON.stringify(todoList));
};

const removeLocalTodos = (todo) => {
  let todoList;
  if (localStorage.getItem("todoList") === null) {
    todoList = [];
  } else {
    todoList = JSON.parse(localStorage.getItem("todoList"));
  }
  const todoIndex = todo.children[0].innerText;
  todoList.splice(todoList.indexOf(todoIndex), 1);
  localStorage.setItem("todoList", JSON.stringify(todoList));
};

const getLocalTodos = () => {
  let todoList;
  if (localStorage.getItem("todoList") === null) {
    todoList = [];
  } else {
    todoList = JSON.parse(localStorage.getItem("todoList"));
  }
  todoList.forEach((todo) => {
    const item = document.createElement("li");
    item.classList.add("item");
    const itemValue = document.createElement("span");
    itemValue.innerText = todo;
    item.appendChild(itemValue);
    input.value = "";
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="far fa-check"></i>`;
    completedButton.classList.add("complete-btn");
    item.appendChild(completedButton);
    const removeButton = document.createElement("button");
    removeButton.innerHTML = `<i class="far fa-trash"></i>`;
    removeButton.classList.add("remove-btn");
    item.appendChild(removeButton);
    list.appendChild(item);
  });
};

const addTodo = (e) => {
  e.preventDefault();
  const item = document.createElement("li");
  item.classList.add("item");
  const itemValue = document.createElement("span");
  itemValue.innerText = input.value;
  saveLocalTodos(input.value);
  item.appendChild(itemValue);
  input.value = "";
  const completedButton = document.createElement("button");
  completedButton.innerHTML = `<i class="far fa-check"></i>`;
  completedButton.classList.add("complete-btn");
  item.appendChild(completedButton);
  const removeButton = document.createElement("button");
  removeButton.innerHTML = `<i class="far fa-trash"></i>`;
  removeButton.classList.add("remove-btn");
  item.appendChild(removeButton);
  list.appendChild(item);
};

const removeTodo = (e) => {
  const todoItem = e.target;
  if (todoItem.classList[0] === "remove-btn") {
    const todo = todoItem.parentElement;
    removeLocalTodos(todo);
    todo.remove();
  }
  if (todoItem.classList[0] === "complete-btn") {
    const todo = todoItem.parentElement;
    todo.classList.toggle("completed");
  }
};

//Event Listeners
document.addEventListener("DOMContentLoaded", getLocalTodos);
form.addEventListener("submit", (e) => e.preventDefault());
button.addEventListener("click", addTodo);
list.addEventListener("click", removeTodo);
