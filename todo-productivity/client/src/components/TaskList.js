import React, { useEffect, useState } from "react";
import Timer from "./Timer";

export default function TaskList({ tasks, refresh }) {
  const [activeTimer, setActiveTimer] = useState(null);

  const markCompleted = async (task) => {
    await fetch(`http://localhost:4000/tasks/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: true }),
    });
    refresh();
  };

  const deleteTask = async (taskId) => {
    await fetch(`http://localhost:4000/tasks/${taskId}`, {
      method: "DELETE",
    });
    refresh();
  };

  const handleComplete = (taskId) => {
    setActiveTimer(null);
  };

  useEffect(() => {
    if (tasks.length > 0 && activeTimer === null) {
      const latestActiveTask = tasks.slice().reverse().find(task => !task.completed);
      if (latestActiveTask) {
        setActiveTimer(latestActiveTask.id);
      }
    }

  }, [tasks]);

  return (
    <div className="task-list">
      {tasks.length === 0 && <p>Задач немає</p>}
      {tasks.map((task) => (
        <div
          key={task.id}
          className="task-item"
          style={{
            position: "relative",
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "8px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
        >
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Тривалість: {task.timer && Number(task.timer) > 0 ? `${task.timer} хв` : "N/A"}</p>
          <p>Статус: {task.completed ? "Завершена" : "Активна"}</p>

          {!task.completed && (
            <button
              onClick={() => markCompleted(task)}
              style={{
                padding: "8px 16px",
                backgroundColor: "#27ae60",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginRight: "10px",
                fontWeight: "600",
              }}
            >
              Виконано
            </button>
          )}

          <Timer
            duration={task.timer}
            taskId={task.id}
            autoStart={activeTimer === task.id}
            onStart={() => setActiveTimer(task.id)}
            onStop={() => setActiveTimer(null)}
            onComplete={() => handleComplete(task.id)}
          />

          <button
            onClick={() => deleteTask(task.id)}
            style={{
              position: "absolute",
              bottom: "15px",
              right: "15px",
              backgroundColor: "#e74c3c",
              color: "white",
              border: "none",
              padding: "8px 14px",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "600",
              boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
              transition: "background-color 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#c0392b")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#e74c3c")}
          >
            Видалити
          </button>
        </div>
        
      ))}
    </div>
  );
}
