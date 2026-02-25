import React, { useEffect, useState } from "react";
import Tasks from "../modules/Tasks";

function HomePage() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    fetchTodos();
  }, []);
  const fetchTodos = async () => {
    const res = await fetch("/api/auth/todos");
    const data = await res.json();
    if (data.status === "success") {
      setTodos(data.data.todos);
    }
  };

  console.log(todos);
  return (
    <div className="home-page">
      <div className="home-page--todo">
        <p>todo</p>
        <Tasks data={todos.todo} fetchTodos={fetchTodos} next="inProgress" />
      </div>
      <div className="home-page--inProgress">
        <p>In progress</p>
        <Tasks
          data={todos.inProgress}
          fetchTodos={fetchTodos}
          next="review"
          prev="todo"
        />
      </div>
      <div className="home-page--review">
        <p>Review</p>
        <Tasks
          data={todos.review}
          fetchTodos={fetchTodos}
          next="done"
          prev="inProgress"
        />
      </div>
      <div className="home-page--done">
        <p>Done</p>
        <Tasks data={todos.done} fetchTodos={fetchTodos} prev="review" />
      </div>
    </div>
  );
}

export default HomePage;
