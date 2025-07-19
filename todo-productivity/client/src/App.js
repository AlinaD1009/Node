import React, { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";

const API_URL = "http://localhost:4000";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  const fetchTasks = async () => {
    const url =
      filter === "all"
        ? `${API_URL}/tasks`
        : `${API_URL}/tasks?status=${filter}`;
    const res = await fetch(url);
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, [filter]);

  const handleAddTask = async (task) => {
    const res = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    const newTask = await res.json();
    setTasks((prev) => [...prev, newTask]);
  };

  return (
    <div className="App">
      <h1>ToDo з таймером</h1>
      <TaskForm onAdd={handleAddTask} />
      <div className="filter-buttons">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          Усі
        </button>
        <button
          className={filter === "active" ? "active" : ""}
          onClick={() => setFilter("active")}
        >
          Активні
        </button>
        <button
          className={filter === "completed" ? "active" : ""}
          onClick={() => setFilter("completed")}
        >
          Виконані
        </button>
      </div>
      <TaskList tasks={tasks} refresh={fetchTasks} />
    </div>
  );
}

export default App;
