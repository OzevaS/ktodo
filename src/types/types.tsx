interface ITask {
  id: number;
  label: string;
  exTime: ITaskTime;
  created: Date;
  done: boolean;
}

interface ITaskTime {
  min: number;
  sec: number;
}

type ChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => void;

type ClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => void;

type FormHandler = (e: React.FormEvent<HTMLFormElement>) => void;

type KeyBoardHandler = (e: React.KeyboardEvent<HTMLInputElement>) => void;

export type { ITask, ITaskTime, ChangeHandler, ClickHandler, FormHandler, KeyBoardHandler };
