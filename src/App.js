// App.js
import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (!taskName.trim() || !taskDate) return;
    const newTask = { id: Math.floor(Math.random() * 10000), name: taskName, date: taskDate, completed: false };
    setTasks([...tasks, newTask]);
    setTaskName('');
    setTaskDate('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleCompleted = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') {
      return task.completed;
    } else if (filter === 'incomplete') {
      return !task.completed;
    }
    return true;
  });

  return (
    <div className="container">
      <header>
        <h1>Task Tracker</h1>
      </header>
      <form onSubmit={addTask}>
        <input 
          type="text" 
          placeholder="Task Name" 
          value={taskName} 
          onChange={(e) => setTaskName(e.target.value)} 
        />
        <input 
          type="date" 
          value={taskDate} 
          onChange={(e) => setTaskDate(e.target.value)} 
        />
        <button type="submit">Add Task</button>
      </form>
      <div className="filter-buttons">
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
        <button onClick={() => setFilter('incomplete')}>Incomplete</button>
      </div>
      <TaskList tasks={filteredTasks} setTasks={setTasks} onDelete={deleteTask} onToggle={toggleCompleted} />
    </div>
  );
};

export default App;
