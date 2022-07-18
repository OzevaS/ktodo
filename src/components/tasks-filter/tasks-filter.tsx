/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { FC } from 'react';

import './tasks-filter.css';

export interface TasksFilterProps {
  onShowAll: () => void;
  onShowActive: () => void;
  onShowCompleted: () => void;
}

const TasksFilter: FC<TasksFilterProps> = (props) => {
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
};

function toggleActiveButton(e: any) {
  const list = e.currentTarget;

  // eslint-disable-next-line no-restricted-syntax
  for (const li of list.children) {
    const btn = li.querySelector('button');
    btn.classList.remove('selected');
  }

  e.target.classList.add('selected');
}

export default TasksFilter;
