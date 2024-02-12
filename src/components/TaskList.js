// TaskList.js
import React, { useState } from 'react';
import Task from './Task';
import './TaskList.css';

const TaskList = ({ tasks, setTasks, onDelete, onToggle }) => {
  const [draggedTaskId, setDraggedTaskId] = useState(null);

  const handleDragStart = (e, taskId) => {
    setDraggedTaskId(taskId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetTaskId) => {
    e.preventDefault();
    const updatedTasks = tasks.map(task => {
      if (task.id === draggedTaskId) {
        return tasks.find(t => t.id === targetTaskId);
      }
      if (task.id === targetTaskId) {
        return tasks.find(t => t.id === draggedTaskId);
      }
      return task;
    });
    setDraggedTaskId(null);
    // Update the tasks state with the new order
    setTasks(updatedTasks);
  };

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`task ${task.completed ? 'completed' : ''}`}
          draggable
          onDragStart={(e) => handleDragStart(e, task.id)}
          onDragOver={(e) => handleDragOver(e)}
          onDrop={(e) => handleDrop(e, task.id)}
        >
          <Task task={task} onDelete={onDelete} onToggle={onToggle} />
        </div>
      ))}
    </div>
  );
};

export default TaskList;
