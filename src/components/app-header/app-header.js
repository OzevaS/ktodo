import React from "react";
import propTypes from "prop-types";

import NewTaskForm from "../new-task-form";

import "./app-header.css";

function AppHeader(props) {
  const { onAdd } = props;

  return (
    <header className="header">
      <h1>todos</h1>
      <NewTaskForm onAdd={onAdd} />
    </header>
  );
}

AppHeader.defaultProps = {
  onAdd: () => {},
};

AppHeader.propTypes = {
  onAdd: propTypes.func,
};

export default AppHeader;
