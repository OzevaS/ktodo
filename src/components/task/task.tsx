/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { FC, useEffect, useRef, useState } from 'react';

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

const Task: FC<TaskProps> = (props) => {
  const { task, onDeleted, onToggleDone } = props;

  const [timeSec, setTimeSec] = useState<TaskState['timeSec']>(getSeconds(task.exTime));
  const [playing, setPlaying] = useState<boolean>(false);

  const timer = useRef<NodeJS.Timer | null>(null);

  const onPause = () => {
    setPlaying(false);
  };

  const onPlay = () => {
    setPlaying(true);
  };

  useEffect(() => {
    if (playing) {
      let currentTimeSec = timeSec;

      timer.current = setInterval(() => {
        if (currentTimeSec === 0) {
          onPause();
          if (!task.done) onToggleDone();
          return;
        }

        setTimeSec((prevTimeSec) => {
          currentTimeSec = prevTimeSec - 1;
          return currentTimeSec;
        });
      }, 1000);
    }

    return () => {
      if (timer.current !== null) clearInterval(timer.current);
    };
  }, [onToggleDone, playing]);

  const { label, created, done } = task;

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
            <button type="button" className="icon icon-play" onClick={onPlay} />
            <button type="button" className="icon icon-pause" onClick={onPause} />
            {getStringTime(taskTime)}
          </span>
          <DistToNow created={new Date(created)} />
          <button type="button" className="icon icon-destroy" onClick={onDeleted} />
          <button type="button" className="icon icon-edit" />
        </label>
      </div>
    </li>
  );
};

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

export default Task;
