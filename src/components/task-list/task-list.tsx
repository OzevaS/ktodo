import React, { FC } from 'react';

import Task from '../task/task';
import './task-list.css';
import { ITask } from '../../types';

interface TaskListProps {
  tasks: ITask[] | null;
  onDeleted: (id: number) => void;
  onToggleDone: (id: number) => void;
}

const TaskList: FC<TaskListProps> = ({ tasks, onDeleted, onToggleDone }) => {
  const tasksElems = tasks
    ? tasks.map((item) => {
        const { id } = item;

        return <Task key={id} task={item} onDeleted={() => onDeleted(id)} onToggleDone={() => onToggleDone(id)} />;
      })
    : null;

  return <ul className="todo-list">{tasksElems}</ul>;
};

export default TaskList;
