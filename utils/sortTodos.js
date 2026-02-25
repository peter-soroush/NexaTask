function sortTodos(todos) {
  const sortedTodos = {};
  todos.map((todo) => {
    if (!sortedTodos[todo.status]) {
      sortedTodos[todo.status] = [];
    }
    sortedTodos[todo.status].push(todo);
  });
  //   console.log(sortedTodos);

  return sortedTodos;
}

export default sortTodos;
