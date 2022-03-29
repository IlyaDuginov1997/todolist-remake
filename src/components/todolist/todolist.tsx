import React, { ChangeEvent } from 'react';

import s from './todolist.module.css';

import { AddItemForm } from 'components/editableSpan';
import { TaskStatusMode, TaskType } from 'components/todolist/types';
import { ReturnComponentType } from 'types';

type TodolistPropsType = {
  todolistTitle: string;
  tasks: TaskType[];
  changeStatus: (taskId: string, status: boolean) => void;
  setTaskStatusMode: (statusMode: TaskStatusMode) => void;
  taskStatusMode: TaskStatusMode;
  removeTask: (taskId: string) => void;
  addTask: (taskTitle: string) => void;
};

export const Todolist: React.FC<TodolistPropsType> = ({
  todolistTitle,
  tasks,
  changeStatus,
  setTaskStatusMode,
  taskStatusMode,
  removeTask,
  addTask,
}): ReturnComponentType => {
  const tasksJSX = tasks.map(({ id, taskTitle, isDone }) => {
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>): void => {
      changeStatus(id, e.currentTarget.checked);
    };

    const removeTaskFromId = (): void => {
      removeTask(id);
    };

    return (
      <li key={id} className={isDone ? 'isDone' : ''}>
        <input type="checkbox" checked={isDone} onChange={changeTaskStatus} />
        <span>{taskTitle}</span>
        <button type="button" onClick={removeTaskFromId}>
          х
        </button>
      </li>
    );
  });

  const onAllButtonClick = (): void => {
    setTaskStatusMode('All');
  };

  const onActiveButtonClick = (): void => {
    setTaskStatusMode('Active');
  };

  const onCompletedButtonClick = (): void => {
    setTaskStatusMode('Completed');
  };

  return (
    <div className={s.todolistContainer}>
      <h3>{todolistTitle}</h3>
      <AddItemForm setTitle={addTask} />
      <ul>{tasksJSX}</ul>

      <button
        type="button"
        onClick={onAllButtonClick}
        className={taskStatusMode === 'All' ? 'selected' : ''}
      >
        All
      </button>

      <button
        type="button"
        onClick={onActiveButtonClick}
        className={taskStatusMode === 'Active' ? 'selected' : ''}
      >
        Active
      </button>

      <button
        type="button"
        onClick={onCompletedButtonClick}
        className={taskStatusMode === 'Completed' ? 'selected' : ''}
      >
        Complete
      </button>
    </div>
  );
};
