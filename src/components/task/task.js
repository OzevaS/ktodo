import React from "react";
import propTypes from "prop-types";

import "./task.css";

import DistToNow from "../dist-to-now";

function Task(props) {
  const { label, created, done, onDeleted, onToggleDone, onToggleEdited } =
    props;

  let classNames = "task";
  if (done) {
    classNames += " completed";
  }

  return (
    <li className={classNames}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={done}
          onChange={onToggleDone}
        />
        <label>
          <span className="description">{label}</span>
          <DistToNow created={created} />
          <button
            type="button"
            className="icon icon-edit"
            onClick={onToggleEdited}
          />
          <button
            type="button"
            className="icon icon-destroy"
            onClick={onDeleted}
          />
        </label>
      </div>
    </li>
  );
}

Task.defaultProps = {
  label: "",
  created: new Date(),
  done: false,
  onDeleted: () => {},
  onToggleDone: () => {},
  onToggleEdited: () => {},
};

Task.propTypes = {
  label: propTypes.string,
  created: propTypes.instanceOf(Date),
  done: propTypes.bool,
  onDeleted: propTypes.func,
  onToggleDone: propTypes.func,
  onToggleEdited: propTypes.func,
};

export default Task;
