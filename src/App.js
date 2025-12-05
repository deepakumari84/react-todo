import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("work");
  const [filter, setFilter] = useState("all"); // all, completed, pending
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  // Load from localStorage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) setTasks(savedTasks);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add Task
  const addTask = () => {
    if (!taskInput.trim()) return;
    const newTask = {
      id: uuidv4(),
      text: taskInput,
      completed: false,
      dueDate,
      category,
    };
    setTasks([...tasks, newTask]);
    setTaskInput("");
    setDueDate("");
  };

  // Delete Task
  const deleteTask = (id) => setTasks(tasks.filter((t) => t.id !== id));

  // Toggle Complete
  const toggleComplete = (id) =>
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );

  // Edit Task
  const editTask = (id) => {
    setEditId(id);
    const current = tasks.find((t) => t.id === id);
    setEditText(current.text);
  };

  const saveEdit = (id) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, text: editText } : t))
    );
    setEditId(null);
    setEditText("");
  };

  // Step 6: Filtering Tasks
  const filteredTasks = tasks.filter((t) => {
    if (filter === "completed") return t.completed;
    if (filter === "pending") return !t.completed;
    return true; // "all"
  });

  // Step 7: Search
  const searchedTasks = filteredTasks.filter((t) =>
    t.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Todo App</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search tasks..."
        className="search-bar"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Input + Due Date + Category */}
      <div className="input-group">
        <input
          type="text"
          placeholder="Enter task..."
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="work">Work</option>
          <option value="home">Home</option>
          <option value="personal">Personal</option>
        </select>

        <button onClick={addTask}>Add</button>
      </div>

      {/* Filter Buttons */}
      <div className="filter-buttons">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={filter === "completed" ? "active" : ""}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
        <button
          className={filter === "pending" ? "active" : ""}
          onClick={() => setFilter("pending")}
        >
          Pending
        </button>
      </div>

      {/* Task List */}
      <ul className="task-list">
        {searchedTasks.map((task) => (
          <li key={task.id} className={task.completed ? "completed" : ""}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task.id)}
            />

            {editId === task.id ? (
              <>
                <input
                  className="edit-input"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={() => saveEdit(task.id)}>Save</button>
              </>
            ) : (
              <>
                <span className="task-text">{task.text}</span>
                {task.dueDate && <p className="date">Due: {task.dueDate}</p>}
                <span className="tag">{task.category}</span>
                <button onClick={() => editTask(task.id)}>Edit</button>
              </>
            )}

            <button
              onClick={() => deleteTask(task.id)}
              className="delete-btn"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
