/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { FC, useEffect, useRef, useState } from 'react';

import './app.css';

import AppHeader from '../app-header';
import TaskList from '../task-list/task-list';
import AppFooter from '../app-footer';
import { ITask } from '../../types';

interface AppState {
  tasks: ITask[];
  filter: string;
}

const App: FC = () => {
  const [tasks, setTasks] = useState<AppState['tasks']>([]);
  const [filter, setFilter] = useState<AppState['filter']>('all');

  const id = useRef(100);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('savedTasks') || '[]') as ITask[];
    if (savedTasks.length !== 0) {
      id.current = savedTasks[savedTasks.length - 1].id + 1;
      setTasks(savedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('savedTasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title: string, min: number, sec: number) => {
    const newTask: ITask = createTodoItem(title, min, sec, id.current++);
    setTasks([...tasks, newTask]);
  };

  const removeTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const deleteCompleted = () => {
    setTasks(tasks.filter((task) => !task.done));
  };

  const onShowAll = () => {
    setFilter('all');
  };

  const onShowActive = () => {
    setFilter('active');
  };

  const onShowCompleted = () => {
    setFilter('completed');
  };

  const onToggleDone = (id: number) => {
    setTasks((prevTasks) => {
      const newTasks = [...prevTasks];
      const task = newTasks.find((task) => task.id === id);
      if (task) task.done = !task.done;

      return newTasks;
    });
  };

  const viewTasks = tasks.filter((task) => {
    if (filter === 'all') {
      return true;
    }
    if (filter === 'active') {
      return !task.done;
    }
    if (filter === 'completed') {
      return task.done;
    }
    return false;
  });

  const todoCount = tasks ? tasks.reduce((res, item) => res + (item.done ? 0 : 1), 0) : 0;

  return (
    <section className="todoapp">
      <AppHeader onAdd={addTask} />
      <section className="main">
        <TaskList tasks={viewTasks} onDeleted={removeTask} onToggleDone={onToggleDone} />
        <AppFooter
          todoCount={todoCount}
          onDeletedCompleted={deleteCompleted}
          propsFilter={{
            onShowAll,
            onShowActive,
            onShowCompleted,
          }}
        />
      </section>
    </section>
  );
};

function createTodoItem(label: string, min: number, sec: number, id: number): ITask {
  return {
    label,
    exTime: {
      min,
      sec,
    },
    done: false,
    created: new Date(),
    id,
  };
}

export default App;
