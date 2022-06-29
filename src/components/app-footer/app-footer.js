import React from 'react';
import propTypes from 'prop-types';

import TasksFilter from '../tasks-filter';

import './app-footer.css';

function AppFooter(props) {
  const { todoCount, onDeletedCompleted, ...propsFilter } = props;

  return (
    <footer className="footer">
      <span className="todo-count">{`${todoCount} items left`}</span>
      <TasksFilter {...propsFilter} />
      <button type="button" className="clear-completed" onClick={onDeletedCompleted}>
        Clear completed
      </button>
    </footer>
  );
}

AppFooter.defaultProps = {
  todoCount: 0,
  onDeletedCompleted: () => {},
};

AppFooter.propTypes = {
  todoCount: propTypes.number,
  onDeletedCompleted: propTypes.func,
};

export default AppFooter;
