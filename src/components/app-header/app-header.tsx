import React, { FC } from 'react';

import NewTaskForm from '../new-task-form';

import './app-header.css';

interface AppHeaderProps {
  onAdd: (label: string, min: number, sec: number) => void;
}

const AppHeader: FC<AppHeaderProps> = (props) => {
  const { onAdd } = props;

  return (
    <header className="header">
      <h1>todos</h1>
      <NewTaskForm onAdd={onAdd} />
    </header>
  );
};

export default AppHeader;
