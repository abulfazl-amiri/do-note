// selecting elements
const todoInput = document.querySelector(".todo-input");
const todoForm = document.querySelector(".todo-form");
const todoList = document.querySelector(".todo-list");
const todo = document.querySelector(".todo");
const btnsTodoState = document.querySelectorAll(".btn--todo-state");
const sortButtons = document.querySelector(".sort-buttons");

// abling handlers/controller

export const addHandlerInput = function (handler) {
  todoForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // fake state
    const state = "doing";
    handler(todoInput.value.trim(), state.toUpperCase());
  });
};

export const renderTodoes = function (todoes) {
  todoes.forEach((todo) => {
    todoList.insertAdjacentHTML(
      "beforeend",
      _generateTodoHTML(todo.task, todo.state),
    );
  });
};

export const renderSortButtons = function () {
  if (!sortButtons) return;

  const filters = ["Doing", "Done"];
  sortButtons.innerHTML = filters.map(_generateSortButtonHTML).join("");
};

const _generateTodoHTML = function (task, state) {
  return `
    <li
      class="todo flex flex-row gap-3 px-4 py-6 text-white mb-0.5 bg-[#333] hover:contrast-[.90] rounded-sm"
    >
      <button class="hover:brightness-75">
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
          class="lucide lucide-circle-icon lucide-circle"
        >
          <circle cx="12" cy="12" r="10" />
        </svg>
      </button>
      <span> Task 1 </span>
      <button class="ml-auto hover:brightness-75">
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
          class="lucide lucide-x-icon lucide-x"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </button>
    </li>
  `;
};

const _generateSortButtonHTML = function (label) {
  return `<button class="hover:brightness-125">${label}</button>`;
};

btnsTodoState.forEach((btnTodo) => {
  btnTodo.addEventListener("click", function (e) {
    console.log(e);
  });
});
