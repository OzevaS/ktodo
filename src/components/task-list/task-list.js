import React from "react";
import propTypes from "prop-types";

import Task from "../task/task";

import "./task-list.css";

function TaskList({ tasks, onDeleted, onToggleDone, onToggleEdited }) {
  const tasksElems = tasks
    ? tasks.map((item) => {
        const { id, ...itemProps } = item;

        return (
          <Task
            key={id}
            {...itemProps}
            onDeleted={() => onDeleted(id)}
            onToggleDone={() => onToggleDone(id)}
            onToggleEdited={() => onToggleEdited(id)}
          />
        );
      })
    : null;

  return <ul className="todo-list">{tasksElems}</ul>;
}

TaskList.defaultProps = {
  tasks: null,
  onDeleted: () => {},
  onToggleDone: () => {},
  onToggleEdited: () => {},
};

TaskList.propTypes = {
  tasks: propTypes.instanceOf(Array),
  onDeleted: propTypes.func,
  onToggleDone: propTypes.func,
  onToggleEdited: propTypes.func,
};

export default TaskList;
