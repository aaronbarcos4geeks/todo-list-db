import React, { useState, useEffect } from "react";
import TaskInput from "./TaskInput";
import TaskList from "./TasksList";

const Home = () => {
  const userName = "aaronbarcos4geeks";
  const baseURL = "https://playground.4geeks.com/todo";
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch(`${baseURL}/users/${userName}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify([]),
    })
      .then((response) => {
        if (response.ok) {
          return fetchTasks();
        } else if (response.status === 400) {
          return response.json().then((errorData) => {
            if (errorData.detail === "User already exists.") {
              return fetchTasks();
            }
          });
        } else {
          console.error("Error inesperado al crear el usuario.");
        }
      })
      .catch((error) => console.error("Error al conectar con la API:", error));
  }, []);

  const fetchTasks = () => {
    fetch(`${baseURL}/users/${userName}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.error("Error al obtener las tareas.");
        }
      })
      .then((data) => {
        if (data) {
          setTasks(data.todos);
        }
      })
      .catch((error) => console.error("Error al conectar con la API:", error));
  };

  const addTask = (taskLabel) => {
    const newTask = { label: taskLabel, is_done: false };

    fetch(`${baseURL}/todos/${userName}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.error("Error al agregar la tarea.");
        }
      })
      .then((newTask) => {
        if (newTask) {
          setTasks([newTask, ...tasks]);
        }
      })
      .catch((error) => console.error("Error al conectar con la API:", error));
  };

  const removeTask = (taskId) => {
    fetch(`${baseURL}/todos/${taskId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          const updatedTasks = tasks.filter((task) => task.id !== taskId);
          setTasks(updatedTasks);
        } else {
          console.error("Error al eliminar la tarea.");
        }
      })
      .catch((error) => console.error("Error al conectar con la API:", error));
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
