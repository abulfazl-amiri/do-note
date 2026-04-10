import { Account, Todo } from "./model.js";
import db from "./DB.js";
import {
  addHandlerLoginFormOnSubmit,
  addHandlerTodoInput,
  renderTodoes,
  hideLoginForm,
  addHandlerTodoBtns,
  addHandlerFilterBtns,
  addHandlerClearAllTodoes,
  addHandlerShowProfile,
  addHandlerClearDone,
} from "./view.js";

const appState = {
  currentUser: null,
  todoes: [],
  db: null,
  dones: [],
};

// helpers

const getDoneTodoes = function () {
  const dones = appState.todoes.filter((todo) => todo.state === "DONE");
  dones.forEach((doneTodo) => {
    if (appState.dones.findIndex((todo) => todo.id === doneTodo.id) !== -1)
      return;
    appState.dones.push(doneTodo);
  });

  return appState.dones;
};
const addTodo = function (task, taskState) {
  const todo = new Todo(task, taskState);
  appState.todoes.push(todo);

  renderTodoes(appState.todoes, getDoneTodoes());
};

const handleLoginSubmit = function (userCredentials) {
  appState.db.addAccount(
    new Account(userCredentials.username, userCredentials.pin),
  );
  appState.currentUser = appState.db.findAccount(
    userCredentials.username,
    userCredentials.pin,
  );
  console.log(appState);
  if (appState.currentUser) {
    hideLoginForm();
  }
};

const handleTaskInput = function (task, taskState) {
  addTodo(task, taskState);
  console.log(appState.todoes);
};

const handleTodoBtns = function (action, todoId) {
  const todoIndex = appState.todoes.findIndex((todo) => todo.id === todoId);
  if (todoIndex === -1) return;

  if (action === "remove") {
    appState.todoes.splice(todoIndex, 1);
    console.log("removed todo by id:", todoId);
  }
  if (action === "toggle") {
    let currentState = appState.todoes[todoIndex].state;
    currentState = currentState === "DOING" ? "DONE" : "DOING";
    appState.todoes[todoIndex].state = currentState;
    console.log("toggled todo state by id:", todoId);
  }

  renderTodoes(appState.todoes, getDoneTodoes());
};

const handleFilter = function (filter) {
  if (filter === "ALL") {
    renderTodoes(appState.todoes, getDoneTodoes());
    return;
  }

  let todoes = [];
  if (filter === "DOING" || filter === "DONE") {
    todoes = appState.todoes.filter((todo) => todo.state === filter);

    console.log("Showin filter:", filter);
  }

  renderTodoes(todoes, getDoneTodoes());
};
const handleClearAll = function () {
  appState.todoes = [];
  renderTodoes([], getDoneTodoes());
};
const handleClearDone = function () {
  const dones = getDoneTodoes();
  const doings = appState.todoes.filter((todo) => todo.state !== "DONE");
  appState.todoes = doings;
  renderTodoes(appState.todoes, dones);
};

const handleProfilePreview = function () {};

export const init = function () {
  // initilize db
  appState.db = new db();

  // login
  addHandlerLoginFormOnSubmit(handleLoginSubmit);

  // app
  addHandlerTodoInput(handleTaskInput);
  addHandlerTodoBtns(handleTodoBtns);
  addHandlerClearAllTodoes(handleClearAll);
  addHandlerFilterBtns(handleFilter);
  addHandlerClearDone(handleClearDone);

  // preview
  addHandlerShowProfile(handleProfilePreview);
};
