/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

import './task.css';

import DistToNow from '../dist-to-now';
import { ITask, ITaskTime } from '../../types';

interface TaskProps {
  task: ITask;
  onDeleted: () => void;
  onToggleDone: () => void;
}

interface TaskState {
  timeSec: number;
}

function getSeconds(time: ITaskTime): number {
  return time.min * 60 + time.sec;
}

function getTaskTimeFormat(seconds: number): ITaskTime {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return {
    min,
    sec,
  };
}

function getStringTime(time: ITaskTime): string {
  const { min, sec } = time;
  return `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
}

export default class Task extends React.Component<TaskProps, TaskState> {
  state: TaskState = {
    timeSec: getSeconds(this.props.task.exTime),
  };

  timer: NodeJS.Timer | null = null;

  componentWillUnmount() {
    if (this.timer !== null) clearInterval(this.timer);
  }

  onPause = () => {
    if (this.timer !== null) clearInterval(this.timer);
    this.timer = null;
  };

  onPlay = () => {
    const { task } = this.props;

    if (this.timer !== null || task.done) return;

    this.timer = setInterval(() => {
      if (this.state.timeSec === 0) {
        this.onPause();
        this.props.onToggleDone();

        return;
      }
      this.setState((prevState) => {
        return {
          timeSec: prevState.timeSec - 1,
        };
      });
    }, 1000);
  };

  render() {
    const { task, onDeleted, onToggleDone } = this.props;
    const { label, created, done } = task;

    const { timeSec } = this.state;
    const taskTime = getTaskTimeFormat(timeSec);

    let classNames = 'task';
    if (done) {
      classNames += ' completed';
    }

    return (
      <li className={classNames}>
        <div className="view">
          <input type="checkbox" className="toggle" checked={done} onChange={onToggleDone} />
          <label>
            <span className="title">{label}</span>
            <span className="description">
              <button type="button" className="icon icon-play" onClick={this.onPlay} />
              <button type="button" className="icon icon-pause" onClick={this.onPause} />
              {getStringTime(taskTime)}
            </span>
            <DistToNow created={created} />
            <button type="button" className="icon icon-destroy" onClick={onDeleted} />
            <button type="button" className="icon icon-edit" />
          </label>
        </div>
      </li>
    );
  }
}
