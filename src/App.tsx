import { useState, useEffect } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import "./index.css";

export interface Task {
  id: number;
  text: string;
}

function App() {
  // 🔹 LocalStorage-dan initial state
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  // 🔹 Task dəyişəndə localStorage-a yaz
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // 🔹 Yeni task əlavə et
  const addTask = (text: string) => {
    if (!text.trim()) return;

    const newTask: Task = {
      id: Date.now(),
      text,
    };

    setTasks([...tasks, newTask]);
  };

  // 🔹 Task sil
  const deleteTask = (id: number) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  // 🔹 Hamısını sil (bonus)
  const clearAll = () => {
    setTasks([]);
  };

  return (
    <div className="app">
      <h1 className="title">Task Tracker</h1>

      <TaskInput onAdd={addTask} />

      {tasks.length > 0 && (
        <button
          onClick={clearAll}
          style={{
            marginBottom: "15px",
            padding: "8px 12px",
            borderRadius: "8px",
            border: "none",
            background: "#ef4444",
            color: "white",
            cursor: "pointer",
          }}
        >
          Clear All
        </button>
      )}

      <TaskList tasks={tasks} onDelete={deleteTask} />
    </div>
  );
}

export default App;