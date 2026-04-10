// selecting elements
// login
const btnLogin = document.querySelector(".btn-login");
const inputUsername = document.querySelector(".input-username");
const inputPin = document.querySelector(".input-pin");
const formLogin = document.querySelector(".form-login");
const sectionLogin = document.querySelector(".section-login");

// app
const counterTodoDone = document.querySelector(".counter--todo-done");
const todoInput = document.querySelector(".todo-input");
const todoForm = document.querySelector(".todo-form");
const todoList = document.querySelector(".todo-list");
const todo = document.querySelector(".todo");
const btnsTodoState = document.querySelectorAll(".btn--toggle-state");
const btnsTodoClose = document.querySelectorAll(".btn--close-todo");
const btnClearAll = document.querySelector(".btn--clear-all");
const btnClearDone = document.querySelector(".btn--clear-done");
const todoCounter = document.querySelector(".todo-counter");
const btnShowProfile = document.querySelector(".btn--show-profile");

const containerFilterBtns = document.querySelector(".container--filter-btns");

const previewContainer = document.querySelector(".preview-container");
const overlay = document.querySelector(".overlay");
const btnClosePreview = document.querySelector(".btn--close-preview");

// helpers
const getUserCredentials = function () {
  const username = inputUsername.value.trim();
  const pin = inputPin.value.trim();
  return {
    username,
    pin,
  };
};
const clearTodoList = function () {
  todoList.innerHTML = ``;
};

const clearTodoInput = function () {
  todoInput.value = "";
};

export const hideLoginForm = function () {
  sectionLogin.classList.remove("flex-center");
  sectionLogin.classList.add("hidden");
};
export const focusTodo = function () {
  todoInput.focus();
};

// abling handlers/controller -- login

export const addHandlerLoginFormOnSubmit = function (handler) {
  formLogin.addEventListener("submit", function (e) {
    e.preventDefault();

    handler(getUserCredentials());
    focusTodo();
  });
};

// abling handlers/controller -- app

export const addHandlerShowProfile = function (handler) {
  btnShowProfile.addEventListener("click", function (e) {
    previewContainer.classList.remove("hidden");
    previewContainer.classList.add("flex-center");
  });
};

[btnClosePreview, overlay].forEach((el) =>
  el.addEventListener("click", function (e) {
    previewContainer.classList.remove("flex-center");

    previewContainer.classList.add("hidden");
    console.log(e);
  }),
);

export const addHandlerTodoInput = function (handler) {
  todoForm.addEventListener("submit", function (e) {
    e.preventDefault();
    console.log(todoInput.value, "length:", todoInput.value.length);
    if (!todoInput.value.trim()) {
      todoInput.focus();
      return;
    }
    handler(todoInput.value.trim(), "DOING");
    clearTodoInput();
  });
};

export const addHandlerTodoBtns = function (handler) {
  todoList.addEventListener("click", function (e) {
    const btnCloseTodo = e.target.closest(".btn--close-todo");
    const btnToggleState = e.target.closest(".btn--toggle-state");
    const todoId = e.target.closest(".todo")?.dataset?.id;
    if (!todoId) return;
    // close
    if (btnCloseTodo) {
      handler("remove", todoId);
    }
    // toggle
    if (btnToggleState) {
      handler("toggle", todoId);
    }
  });
};

export const addHandlerClearAllTodoes = function (handler) {
  btnClearAll.addEventListener("click", function (e) {
    handler();
  });
};
export const addHandlerClearDone = function (handler) {
  btnClearDone.addEventListener("click", function (e) {
    handler();
  });
};
export const addHandlerFilterBtns = function (handler) {
  containerFilterBtns.addEventListener("click", function (e) {
    const filterAll = e.target.closest(".filter-all");
    const filterDoing = e.target.closest(".filter-doing");
    const filterDone = e.target.closest(".filter-done");
    if (filterAll) {
      filterAll.classList.add("selected");
      document.querySelector(".filter-doing")?.classList.remove("selected");
      document.querySelector(".filter-done")?.classList.remove("selected");
      handler("ALL");
    }
    if (filterDoing) {
      filterDoing.classList.add("selected");
      document.querySelector(".filter-all")?.classList.remove("selected");
      document.querySelector(".filter-done")?.classList.remove("selected");

      handler("DOING");
    }
    if (filterDone) {
      filterDone.classList.add("selected");
      document.querySelector(".filter-all")?.classList.remove("selected");
      document.querySelector(".filter-doing")?.classList.remove("selected");
      handler("DONE");
    }
  });
};

export const renderTodoes = function (todoes, doneTodoes = []) {
  if (!Array.isArray(todoes) || !todoes?.length > 0) {
    clearTodoList();
    todoList.innerHTML = `
      <p class="text-center text-gray-500">No Todoes here.</p>
    `;
    todoCounter.textContent = 0;
    counterTodoDone.textContent = doneTodoes.length;
    return;
  }
  clearTodoList();
  todoes.forEach((todo) => {
    todoList.insertAdjacentHTML(
      "beforeend",
      _generateTodoHTML(todo.id, todo.task, todo.state),
    );
  });
  todoCounter.textContent = todoes.length;
  counterTodoDone.textContent = doneTodoes.length;
};

function _generateTodoHTML(id, task, state) {
  const iconDone = `
      <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="size-4  lucide lucide-circle-check-icon lucide-circle-check"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  `;
  const iconDoing = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="size-4 lucide lucide-circle-icon lucide-circle"
    >
      <circle cx="12" cy="12" r="10" />
    </svg>
  `;
  const iconRemove = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="size-4 lucide lucide-x-icon lucide-x"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  `;

  return `
    <li data-id=${id} class="todo ${state === "DONE" ? "todo-done" : ""}">
      <button class="btn--toggle-state hover:brightness-75 p-2">

      ${state === "DONE" ? iconDone : iconDoing}

      </button>
      <span class="overflow-x-clip">${task}</span>

      <span class="text-center ${state === "DOING" ? "text-gray-500" : "text-amber-600"}">${state}</span>
      <button class="btn-close btn--close-todo ml-auto">
        ${iconRemove}
      </button>
    </li>
  `;
}
