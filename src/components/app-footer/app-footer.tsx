import React, { FC } from 'react';

import TasksFilter, {TasksFilterProps} from '../tasks-filter';

import './app-footer.css';

interface AppFooterProps {
  todoCount: number;
  onDeletedCompleted: () => void;
  propsFilter: TasksFilterProps;
}

const AppFooter: FC<AppFooterProps> = (props) => {
  const { todoCount, onDeletedCompleted, propsFilter } = props;

  return (
    <footer className="footer">
      <span className="todo-count">{`${todoCount} items left`}</span>
      <TasksFilter {...propsFilter} />
      <button type="button" className="clear-completed" onClick={onDeletedCompleted}>
        Clear completed
      </button>
    </footer>
  );
};

export default AppFooter;
