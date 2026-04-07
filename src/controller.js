import { Account, Todo } from "./model.js";
import { Database } from "./DB.js";
import { validateAccount, validateTodo } from "./helper.js";
import { addHandlerInput, renderSortButtons, renderTodoes } from "./view.js";

const state = {
  todoes: [
    new Todo("Write HW", "DOING"),
    new Todo("Create DB for the app", "DOING"),
    new Todo("Code UI", "Done"),
  ],
};

const handleTaskInput = function (task, taskState) {
  state.todoes.push(new Todo(task, taskState));

  // render todoes
  renderTodoes(state.todoes);

  console.log(state.todoes);
};

export const init = function () {
  renderSortButtons();
  addHandlerInput(handleTaskInput);
};
