import React, { useState, useEffect } from "react";
import "./Home.css";
import addImg from "../add.png"

import TaskCard from "../../Components/TaskCard/TaskCard";

function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [error, setError] = useState("");
  const [category, setCategory] = useState("");

  const validateNewTask = () => {
    if (newTask === "") {
      setError("Please enter a task");
      return false;
    } else if (newTask.length < 5) { // Corrected minimum length to 5
      setError("Task should be at least 5 characters long");
      return false;
    } else {
      setError("");
      return true;
    }
  };

  const saveTasksToLS = (tasksToSave) => {
    localStorage.setItem("tasks", JSON.stringify(tasksToSave));
  };

  const addTask = () => {
    const validationResult = validateNewTask();
    if (!validationResult) return;

    const newTasks = [
      {
        title: newTask,
        category: category,
      },
      ...tasks,
    ];
    saveTasksToLS(newTasks);

    setTasks(newTasks);
    setNewTask("");
  };

  const deleteTask = (index) => {
    const newTasks = [...tasks]; // Create a new array to avoid mutating state directly
    newTasks.splice(index, 1);
    setTasks(newTasks);

    saveTasksToLS(newTasks);
  };

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  return (
    <>
      <h1 className="app-heading">ToDo App</h1>

      <div className="tasks-container">
        {tasks.map((task, i) => (
          <TaskCard
            task={task}
            title={task.title}
            category={task.category}
            key={i}
            delFunction={() => deleteTask(i)}
          />
        ))}
      </div>
      <p className="error-message">{error}</p>
      <div className="input-container">
        <input
          type="text"
          placeholder="Add new task"
          className="input"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />

        <select
          className="category-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Category</option>
          <option value={"📕 Study"}>📕 Study</option>
          <option value={"🛒 Shopping"}>🛒 Shopping</option>
          <option value={"🎯 Goals"}>🎯 Goals</option>
          <option value={"🎨 Hobby"}>🎨 Hobby</option>
        </select>

        <img
          src={addImg}
          alt="addimage"
          className="add-icon"
          onClick={addTask}
        />
      </div>
    </>
  );
}

export default Home;
