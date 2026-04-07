export const validateAccount = function (account) {
  // validate username
  if (!account?.username || !/^\w{3,16}$/.test(account.username)) return false;

  // validate pin
  if (!/^\d{3,16}$/.test(account?.pin)) return false;

  return true;
};

export const validateTodo = function (todo) {
  // validate todoText
  if (!todo?.task?.trim()) return false;

  // validate state
  if (!todo?.state) return false;
  if (
    todo.state.toUpperCase() !== "DOING" &&
    todo.state.toUpperCase() !== "DONE" &&
    todo.state.toUpperCase() !== "DELETED"
  )
    return false;

  return true;
};
