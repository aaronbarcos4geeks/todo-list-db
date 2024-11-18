import React from "react";

const TasksList = ({ tasks, removeTask }) => {
  return (
    <>
      <ul>
        {tasks.map((task, index) => (
            <>
                <li key={index}>
                    <p>{task}{" "}</p>
                    <button onClick={() => removeTask(index)}>x</button>
                </li>
                <div  className="separator"></div>
            </>
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
