import { validateTodo } from "./helper.js";

export class Todo {
  #id;
  /**
   * Doing | Done
   */
  #state;
  #task;

  /**
   * Constructs a todo object
   * @param {String} task The task to be done
   * @param {String} state the state of the todo. must be one of these (DOING | DONE | DELETED)
   */
  constructor(task, state) {
    this.task = task;
    this.state = state;
    // creates a randmo id like: `224c2576-c469-4f5b-a053-8b4cfe166ad3`
    this.id = crypto.randomUUID();
  }

  set id(id) {
    this.#id = id;
  }

  set task(task) {
    if (task.trim() === "") {
      throw new Error(`No todo text specified task: '${task}'`);
    }
    this.#task = task;
  }

  set state(state) {
    if (
      state.toUpperCase() !== "DOING" &&
      state.toUpperCase() !== "DONE" &&
      state.toUpperCase() !== "DELETED"
    ) {
      throw new Error(`Invalid state: '${state}'`);
    }
    this.#state = state;
  }

  get id() {
    return this.#id;
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
  #dones = [];
  /**
   *
   * @param {String} username the username of the account
   * @param {String | Number} pin the pin of the account
   */
  constructor(username, pin) {
    this.username = username;
    this.pin = pin;
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
        `Invalid pin (must be at least 3 numbers up to 16): '${pin}'`,
      );
    }
    this.#pin = pin;
  }
  set todoes(todoes) {
    if (Array.isArray(todoes) && todoes.length === 0) {
      this.#todoes = []; // empty the todoes
      return;
    }
    todoes.forEach((todo) => {
      if (!validateTodo(todo)) throw new Error(`Invalid Todo: '${todo}'`);
      if (this.#todoes.findIndex((todo) => todo.id === doneTodo.id) !== -1)
        return;
      this.#todoes = todoes;
    });
  }
  set dones(dones) {
    if (Array.isArray(dones) && dones.length === 0) {
      this.#dones = []; // empty the todoes
      return;
    }
    dones.forEach((done) => {
      if (!validateTodo(done)) throw new Error(`Invalid Todo: '${done}'`);
      if (this.#dones.findIndex((todo) => todo.id === doneTodo.id) !== -1)
        return;
      this.#dones = dones;
    });
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
  get dones() {
    //// merge [dones] and dones todoes from [todo]

    const dones = this.#todoes.filter((todo) => todo.state === "DONE");
    dones.forEach((doneTodo) => {
      if (this.#dones.findIndex((todo) => todo.id === doneTodo.id) !== -1)
        return;
      this.#dones.push(doneTodo);
    });

    return this.#dones;
  }
}
