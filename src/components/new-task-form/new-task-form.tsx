import React from 'react';

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

export default class NewTaskForm extends React.Component<NewTaskFormProps, NewTaskFormState> {
  state = {
    label: '',
    min: '',
    sec: '',
  };

  onChange: ChangeHandler = (e) => {
    const { name, value } = e.target;
    type StateKey = keyof NewTaskFormState;
    const stateKey: StateKey = name as StateKey;
    const state: NewTaskFormState = { ...this.state };
    state[stateKey] = value;
    this.setState(state);
  };

  onSubmit: KeyBoardHandler = (e) => {
    if (e.key !== 'Enter') return;

    const { label, min, sec } = this.state;
    
    if (!label || min === '' || sec === '') return;
    if (+sec < 0 || +sec > 60) return;
    if (+min < 0) return;

    this.props.onAdd(label, +min, +sec);

    this.setState({
      label: '',
      min: '',
      sec: '',
    });
  };

  render() {
    const { label, min, sec } = this.state;

    return (
      <form className="new-todo-form">
        <input
          type="text"
          className="new-todo-form__label"
          name="label"
          placeholder="What needs to be done?"
          onChange={this.onChange}
          onKeyDown={this.onSubmit}
          value={label}
        />
        <input
          type="number"
          className="new-todo-form__timer"
          name="min"
          placeholder="Min"
          onChange={this.onChange}
          onKeyDown={this.onSubmit}
          value={min}
        />
        <input
          type="number"
          className="new-todo-form__timer"
          name="sec"
          placeholder="Sec"
          onChange={this.onChange}
          onKeyDown={this.onSubmit}
          value={sec}
        />
      </form>
    );
  }
}
