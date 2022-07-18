import React, { FC, useState } from 'react';

import { ChangeHandler, KeyBoardHandler } from '../../types';

import './new-task-form.css';

interface NewTaskFormState {
  label: string;
  min: string;
  sec: string;
}

interface NewTaskFormProps {
  onAdd: (label: string, min: number, sec: number) => void;
}

const NewTaskForm: FC<NewTaskFormProps> = (props) => {
  const { onAdd } = props;

  const [state, setState] = useState<NewTaskFormState>({
    label: '',
    min: '',
    sec: '',
  });

  const onChange: ChangeHandler = (e) => {
    const { name, value } = e.target;
    type StateKey = keyof NewTaskFormState;
    const stateKey: StateKey = name as StateKey;
    const newState: NewTaskFormState = { ...state };
    newState[stateKey] = value;
    setState(newState);
  };

  const onSubmit: KeyBoardHandler = (e) => {
    if (e.key !== 'Enter') return;

    const { label, min, sec } = state;

    if (!label || min === '' || sec === '') return;
    if (+sec < 0 || +sec > 60) return;
    if (+min < 0) return;

    onAdd(label, +min, +sec);

    setState({
      label: '',
      min: '',
      sec: '',
    });
  };

  const { label, min, sec } = state;

  return (
    <form className="new-todo-form">
      <input
        type="text"
        className="new-todo-form__label"
        name="label"
        placeholder="What needs to be done?"
        onChange={onChange}
        onKeyDown={onSubmit}
        value={label}
      />
      <input
        type="number"
        className="new-todo-form__timer"
        name="min"
        placeholder="Min"
        onChange={onChange}
        onKeyDown={onSubmit}
        value={min}
      />
      <input
        type="number"
        className="new-todo-form__timer"
        name="sec"
        placeholder="Sec"
        onChange={onChange}
        onKeyDown={onSubmit}
        value={sec}
      />
    </form>
  );
};

export default NewTaskForm;
