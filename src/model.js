import { validateTodo } from "./helper.js";

export class Todo {
  /**
   * Doing | Done | Deleted
   */
  #state;
  /**
   * The task to be done
   */
  #task;

  /**
   * Constructs a todo object
   * @param {String} task The task to be done
   * @param {String} state the state of the todo. must be one of these (DOING | DONE | DELETED)
   */
  constructor(task, state) {
    this.task = task;
    this.state = state;
  }

  set task(task) {
    if (task.trim() === "") {
      throw new Error(`No todo text specified task: ${task}`);
    }
    this.#task = task;
  }

  set state(state) {
    if (
      state.toUpperCase() !== "DOING" &&
      state.toUpperCase() !== "DONE" &&
      state.toUpperCase() !== "DELETED"
    ) {
      throw new Error(`Invalid state:${state}`);
    }
    this.#state = state;
  }

  get state() {
    return this.#state;
  }

  get task() {
    return this.#task;
  }
}

export class Account {
  #username;
  #pin;
  #todoes = [];
  /**
   *
   * @param {String} username the username of the account
   * @param {String | Number} pin the pin of the account
   */
  constructor(username, pin) {
    this.username = username;
    this.pin = pin;
  }

  /**
   * Adds a Todo to the todo array
   * @param {Todo} todo the todo obj
   */
  addTodo(todo) {
    if (!validateTodo(todo)) throw new Error(`Invalid Todo: ${todo}`);
    this.#todoes.push(todo);
  }
  set username(username) {
    if (!username || !/^\w{3,16}$/.test(username)) {
      throw new Error(
        `Invalid username must be:\n
        1. All in range A-Z or a-z or 0-9\n
        2. Optional '_' \n
        3. At least 3 letters long up to 16\n
        
        provided username: ${username}`,
      );
    }
    this.#username = username;
  }
  set pin(pin) {
    if (!/^\d{3,16}$/.test(pin)) {
      throw new Error(
        `Invalid pin (must be at least 3 numbers up to 16): ${pin}`,
      );
    }
    this.#pin = pin;
  }

  get username() {
    return this.#username;
  }
  get pin() {
    return this.#pin;
  }
  get todoes() {
    return this.#todoes;
  }
}
