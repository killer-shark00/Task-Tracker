// Task.js
import React from 'react';

const Task = ({ task, onDelete, onToggle, onStatusChange }) => {
  return (
    <div className={`task ${task.completed ? 'completed' : ''}`}>
      <h3>{task.name}</h3>
      <p>{task.date}</p>
      <p>Status: {task.completed ? 'Completed' : 'Incomplete'}</p>
      <button onClick={() => onDelete(task.id)}>Delete</button>
      <button onClick={() => onToggle(task.id)}>Toggle Status</button>
    </div>
  );
};

export default Task;
