import React from "react";

const TasksList = ({ tasks, removeTask }) => {
  return (
    <>
      <ul>
        {tasks.map((task, index) => (
            <React.Fragment key={task.id}>
                <li key={index}>
                    <p>{task.label}{" "}</p>
                    <button onClick={() => removeTask(task.id)}>x</button>
                </li>
                <div  className="separator"></div>
            </React.Fragment>
        ))}
      </ul>
      {tasks.length === 0 ? (
        <p>All done!</p>
      ) : (
        <p>{tasks.length} item{tasks.length > 1 ? "s" : ""} left</p>
      )}
    </>
  );
};

export default TasksList;
