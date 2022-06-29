import React from "react";
import propTypes from "prop-types";

import "./tasks-filter.css";

function toggleActiveButton(e) {
  const list = e.currentTarget;

  // eslint-disable-next-line no-restricted-syntax
  for (const li of list.children) {
    const btn = li.querySelector("button");
    btn.classList.remove("selected");
  }

  e.target.classList.add("selected");
}

function TasksFilter(props) {
  const { onShowAll, onShowActive, onShowCompleted } = props;

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <ul className="filters" onClick={toggleActiveButton}>
      <li>
        <button type="button" className="selected" onClick={onShowAll}>
          All
        </button>
      </li>
      <li>
        <button type="button" onClick={onShowActive}>
          Active
        </button>
      </li>
      <li>
        <button type="button" onClick={onShowCompleted}>
          Completed
        </button>
      </li>
    </ul>
  );
}

TasksFilter.defaultProps = {
  onShowAll: () => {},
  onShowActive: () => {},
  onShowCompleted: () => {},
};

TasksFilter.propTypes = {
  onShowAll: propTypes.func,
  onShowActive: propTypes.func,
  onShowCompleted: propTypes.func,
};

export default TasksFilter;
