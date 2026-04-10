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
  showDiolog,
  addHandlerLogInAnother,
  showLoginForm,
  hideProfilePreview,
  addHandlerLogout,
  addHandlerClearHistory,
} from "./view.js";

const appState = {
  currentUser: null,
  db: null,
  dones: [],
  activeFilter: "ALL",
};

// helpers

const getDoneTodoes = function () {
  if (!appState.currentUser) return;
  const dones = appState.currentUser.todoes.filter(
    (todo) => todo.state === "DONE",
  );
  dones.forEach((doneTodo) => {
    if (
      appState.currentUser.dones.findIndex(
        (todo) => todo.id === doneTodo.id,
      ) !== -1
    )
      return;
    appState.currentUser.dones.push(doneTodo);
  });

  return appState.currentUser.dones;
};
const addTodo = function (task, taskState) {
  const todo = new Todo(task, taskState);
  appState.currentUser.todoes.push(todo);

  renderTodoes(appState.currentUser.todoes, getDoneTodoes());
};

const handleLoginSubmit = function (userCredentials) {
  const existAcc = appState.db.findAccount(
    userCredentials.username,
    userCredentials.pin,
  );
  const existUsername = appState.db.findUser(userCredentials.username);

  // if username found and the pin is correct -> login
  if (existAcc) {
    appState.currentUser = existAcc;
  }
  // if username found and the pin is wrong -> show rejection message
  if (existUsername && !existAcc) {
    // TODO:  show rejection message
    showDiolog("Incorrect pin!");
  }

  // if username does not exist -> show confirmation message for creating new account
  if (!existAcc && !existUsername) {
    // show confirmation message for creating new account
    const res = showDiolog("Do you want to create new account?", "CONFIRM");

    // on yes
    if (res) {
      appState.db.addAccount(
        new Account(userCredentials.username, userCredentials.pin),
      );
      appState.currentUser = appState.db.findAccount(
        userCredentials.username,
        userCredentials.pin,
      );
    }
  }

  if (appState.currentUser) {
    hideLoginForm();
    renderTodoes(appState.currentUser.todoes, appState.currentUser.dones);
  }
  console.log(appState);
};

const handleTaskInput = function (task, taskState) {
  addTodo(task, taskState);
  console.log(appState.currentUser.todoes);
};

const handleTodoBtns = function (action, todoId) {
  const todoIndex = appState.currentUser.todoes.findIndex(
    (todo) => todo.id === todoId,
  );
  if (todoIndex === -1) return;

  if (action === "remove") {
    appState.currentUser.todoes.splice(todoIndex, 1);
    console.log("removed todo by id:", todoId);
  }
  if (action === "toggle") {
    let currentState = appState.currentUser.todoes[todoIndex].state;
    currentState = currentState === "DOING" ? "DONE" : "DOING";
    if (currentState === "DOING") {
      appState.currentUser.dones.splice(todoIndex, 1);
    }

    appState.currentUser.todoes[todoIndex].state = currentState;
    console.log("toggled todo state by id:", todoId);
  }

  renderTodoes(appState.currentUser.todoes, getDoneTodoes());
};

const handleFilter = function (filter) {
  if (filter === "ALL") {
    renderTodoes(appState.currentUser.todoes, getDoneTodoes());
    return;
  }

  let todoes = [];
  if (filter === "DOING" || filter === "DONE") {
    todoes = appState.currentUser.todoes.filter(
      (todo) => todo.state === filter,
    );

    console.log("Showin filter:", filter);
  }

  appState.activeFilter = filter;
  renderTodoes(todoes, getDoneTodoes());
};
const handleClearAll = function () {
  appState.currentUser.todoes = [];
  renderTodoes([], getDoneTodoes());
};
const handleClearDone = function () {
  const dones = getDoneTodoes();
  const doings = appState.currentUser.todoes.filter(
    (todo) => todo.state !== "DONE",
  );
  appState.currentUser.todoes = doings;
  renderTodoes(appState.currentUser.todoes, dones);
};

const handleProfilePreview = function () {};
const resetSession = function () {
  appState.currentUser = null;
  appState.activeFilter = "ALL";
};
const handleLoginAnother = function () {
  resetSession();
  hideProfilePreview();
  showLoginForm();
  renderTodoes([], []);
  console.log("switch user");
};
const handleLogout = function () {
  resetSession();
  hideProfilePreview();
  showLoginForm();
  renderTodoes([], []);
  console.log("switch user");
};

const handleClearHistory = function () {
  appState.currentUser.todoes = [];
  appState.currentUser.dones = [];
  renderTodoes([], []);
  hideProfilePreview();
};

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
  addHandlerLogInAnother(handleLoginAnother);
  addHandlerLogout(handleLogout);
  addHandlerClearHistory(handleClearHistory);
};
