import React from 'react';

import AppHeader from '../app-header';
import TaskList from '../task-list/task-list';
import AppFooter from '../app-footer';
import './app.css';
import { ITask } from '../../types';

function toggleProperty(arr: ITask[], id: number, propName: keyof typeof arr[0]) {
  const newItems = arr.map((item) => ({ ...item }));

  const searchItem = newItems.find((item) => item.id === id);
  if (searchItem && typeof searchItem[propName] === 'boolean') {
    (searchItem[propName] as boolean) = !searchItem[propName];
  }

  return newItems;
}

interface AppState {
  tasks: ITask[];
  filter: string;
}

export default class App extends React.Component<Record<string, never>, AppState> {
  state: AppState = {
    tasks: [],
    filter: 'all',
  };

  tempId = 0;

  deleteTask = (id: number) => {
    this.setState(({ tasks }) => {
      const restTasks = tasks.filter((item) => item.id !== id);

      return {
        tasks: restTasks,
      };
    });
  };

  deleteCompleted = () => {
    this.setState(({ tasks }) => {
      const newItems = tasks.filter((item) => (item.done ? 0 : 1));

      return {
        tasks: newItems,
      };
    });
  };

  addTask = (label: string, min: number, sec: number) => {
    this.setState(({ tasks }) => {
      const newItem = this.createTodoItem(label, min, sec);

      const newItems = [...tasks, newItem];

      return {
        tasks: newItems,
      };
    });
  };

  onToggleDone = (id: number) => {
    this.setState(({ tasks }) => ({
      tasks: toggleProperty(tasks, id, 'done'),
    }));
  };

  onShowAll = () => {
    this.setState({
      filter: 'all',
    });
  };

  onShowActive = () => {
    this.setState({
      filter: 'active',
    });
  };

  onShowCompleted = () => {
    this.setState({
      filter: 'completed',
    });
  };

  viewTasks = (): ITask[] | null => {
    const { tasks, filter } = this.state;
    switch (filter) {
      case 'all':
        return tasks;
      case 'active':
        return tasks.filter((item: ITask) => !item.done);
      case 'completed':
        return tasks.filter((item) => item.done);
      default:
        return null;
    }
  };

  createTodoItem(label: string, min: number, sec: number): ITask {
    return {
      label,
      exTime: {
        min,
        sec,
      },
      done: false,
      created: new Date(),
      id: this.tempId++,
    };
  }

  render() {
    const { tasks } = this.state;

    const todoCount = tasks ? tasks.reduce((res, item) => res + (item.done ? 0 : 1), 0) : 0;

    const viewTasks = this.viewTasks();

    return (
      <section className="todoapp">
        <AppHeader onAdd={this.addTask} />
        <section className="main">
          <TaskList tasks={viewTasks} onDeleted={this.deleteTask} onToggleDone={this.onToggleDone} />

          <AppFooter
            todoCount={todoCount}
            onDeletedCompleted={this.deleteCompleted}
            propsFilter={{
              onShowAll: this.onShowAll,
              onShowActive: this.onShowActive,
              onShowCompleted: this.onShowCompleted,
            }}
          />
        </section>
      </section>
    );
  }
}
