import React, { useState } from "react";

const TaskInput = ({ addTask }) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      addTask(inputValue.trim());
      setInputValue("");
    }
  };

  return (
    <div className="input-container">
        <input
          type="text"
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
    </div>
  );
};

export default TaskInput;
