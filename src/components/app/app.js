import React from 'react';

import AppHeader from '../app-header';
import TaskList from '../task-list/task-list';
import AppFooter from '../app-footer';

import './app.css';

function toggleProperty(arr, id, propName) {
  const newItems = arr.map((item) => ({ ...item }));
  const searchItem = newItems.find((item) => item.id === id);
  searchItem[propName] = !searchItem[propName];

  return newItems;
}

export default class App extends React.Component {
  state = {
    tasks: [],
    filter: 'all',
  };

  tempId = 0;

  deleteTask = (id) => {
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

  addTask = (text) => {
    if (text === '') return;

    this.setState(({ tasks }) => {
      const newItem = this.createTodoItem(text);

      const newItems = [...tasks, newItem];

      return {
        tasks: newItems,
      };
    });
  };

  onToggleDone = (id) => {
    this.setState(({ tasks }) => ({
      tasks: toggleProperty(tasks, id, 'done'),
    }));
  };

  onToggleEdited = (id) => {
    this.setState(({ tasks }) => ({
      tasks: toggleProperty(tasks, id, 'edited'),
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

  createTodoItem(text) {
    return {
      label: text,
      done: false,
      created: new Date(),
      id: this.tempId++,
    };
  }

  viewTasks() {
    const { tasks, filter } = this.state;
    switch (filter) {
      case 'all':
        return tasks;
      case 'active':
        return tasks.filter((item) => !item.done);
      case 'completed':
        return tasks.filter((item) => item.done);
      default:
        return null;
    }
  }

  render() {
    const { tasks } = this.state;

    const todoCount = tasks ? tasks.reduce((res, item) => res + (item.done ? 0 : 1), 0) : 0;

    const viewTasks = this.viewTasks();

    return (
      <section className="todoapp">
        <AppHeader onAdd={this.addTask} />
        <section className="main">
          <TaskList
            tasks={viewTasks}
            onDeleted={this.deleteTask}
            onToggleDone={this.onToggleDone}
            onToggleEdited={this.onToggleEdited}
          />

          <AppFooter
            todoCount={todoCount}
            onDeletedCompleted={this.deleteCompleted}
            onShowAll={this.onShowAll}
            onShowActive={this.onShowActive}
            onShowCompleted={this.onShowCompleted}
          />
        </section>
      </section>
    );
  }
}
