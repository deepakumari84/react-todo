import React, { useState } from "react";

function NewTaskForm({ addTask }) {
  const [task, setTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() === "") return;
    addTask(task);
    setTask("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ textAlign: "center", margin: "20px" }}>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter new task"
        style={{ padding: "8px", width: "200px" }}
      />
      <button type="submit" style={{ padding: "8px 12px", marginLeft: "8px" }}>
        Add
      </button>
    </form>
  );
}

export default NewTaskForm;
