import React from "react";

import "./TaskCard.css";

import binImg from "../../views/bin.png";

function TaskCard({ title, category, task, delFunction, index }) {
  return (
    <div className="task-card">
      <h2 className="task-title">{title}</h2>
      <span className="task-category">{category}</span>
      <img
        src={binImg}
        alt="deleteicon"
        className="delete-icon"
        onClick={() => {
          delFunction(index);
        }}
      />
    </div>
  );
}

export default TaskCard;
