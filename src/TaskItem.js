import React from "react";

function TaskItem({ task }) {
  return (
    <li>
      <span>{task.text}</span>
    </li>
  );
}

export default TaskItem;
