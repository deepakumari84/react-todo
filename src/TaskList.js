import React from "react";
import TaskItem from "./TaskItem";

function TaskList({ tasks, toggleComplete, deleteTask, editTask, editingId, setEditingId }) {
  return (
    <div>
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            toggleComplete={toggleComplete}
            deleteTask={deleteTask}
            editTask={editTask}
            editingId={editingId}
            setEditingId={setEditingId}
          />
        ))
      )}
    </div>
  );
}

export default TaskList;
