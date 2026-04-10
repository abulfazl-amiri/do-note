import { validateAccount } from "./helper.js";

export default class Database {
  #accounts;

  /**
   * Constructs an empty Database
   * @param {Array} accounts An array of accounts
   */
  constructor(accounts = []) {
    this.accounts = accounts;
  }

  set accounts(accounts) {
    if (!Array.isArray(accounts)) {
      throw new Error("Accounts must an Array of Accounts");
    }
    for (let acc of accounts) {
      if (!validateAccount(acc)) {
        throw new Error(
          `Invalid account: '${acc}'  username: '${acc?.username}' pin: '${acc?.pin}'`,
        );
      }
    }
    this.#accounts = accounts;
  }
  get accounts() {
    return this.#accounts;
  }

  addAccount(account) {
    if (!validateAccount(account)) {
      throw new Error(`Invalid account: '${account}'`);
    }
    this.#accounts.push(account);
    console.log(account);
    console.log(this.accounts);
  }

  findAccount(username, pin) {
    return this.accounts.find(
      (acc) => acc.username === username && acc.pin === pin,
    );
  }

  removeAccount(account) {
    const accountIndex = this.#accounts.findIndex(
      (acc) => account.username === acc.username && account.pin === acc.pin,
    );
    if (accountIndex === -1) {
      throw new Error(`No Account were found like: '${account}'`);
    }
    this.#accounts.splice(accountIndex, 1);
  }
}
