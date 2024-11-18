import React, { useState, useEffect } from "react";
import TaskInput from "./TaskInput";
import TaskList from "./TasksList";

const Home = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const removeTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="main-container">
		<h1>todos</h1>
		<div className="tasks-container">
			<TaskInput addTask={addTask} />
			<div className="separator"></div>
			<TaskList tasks={tasks} removeTask={removeTask} />
		</div>
    </div>
  );
};

export default Home;
