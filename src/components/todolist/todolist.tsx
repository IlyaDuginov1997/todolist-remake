import React, { ChangeEvent } from 'react';

import s from './todolist.module.css';

import { FilterStatus, TaskType, AddItemForm, EditableSpan } from 'components';
import { ReturnComponentType } from 'types';

type TodolistPropsType = {
  todolistTitle: string;
  tasks: TaskType[];
  changeStatus: (todolistId: string, taskId: string, status: boolean) => void;
  changeTodolistFilterStatus: (todolistId: string, statusMode: FilterStatus) => void;
  todolistFilterTasks: FilterStatus;
  removeTask: (todolistId: string, taskId: string) => void;
  addTask: (todolistId: string, taskTitle: string) => void;
  changeTaskTitle: (todolistId: string, taskId: string, title: string) => void;
  todolistId: string;
  changeTodolistTitle: (todolistId: string, title: string) => void;
  removeTodolist: (todolistId: string) => void;
};

export const Todolist: React.FC<TodolistPropsType> = ({
  todolistTitle,
  tasks,
  changeStatus,
  changeTodolistFilterStatus,
  todolistFilterTasks,
  removeTask,
  addTask,
  changeTaskTitle,
  todolistId,
  changeTodolistTitle,
  removeTodolist,
}): ReturnComponentType => {
  const tasksJSX = tasks.map(({ id, taskTitle, isDone }) => {
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>): void => {
      changeStatus(todolistId, id, e.currentTarget.checked);
    };

    const removeTaskFromId = (): void => {
      removeTask(todolistId, id);
    };

    const changeTaskTitleIntoTodolist = (title: string): void => {
      changeTaskTitle(todolistId, id, title);
    };

    return (
      <li key={id} className={isDone ? 'isDone' : ''}>
        <input type="checkbox" checked={isDone} onChange={changeTaskStatus} />
        <EditableSpan title={taskTitle} changeTitle={changeTaskTitleIntoTodolist} />
        <button type="button" onClick={removeTaskFromId}>
          х
        </button>
      </li>
    );
  });

  const onAllButtonClick = (): void => {
    changeTodolistFilterStatus(todolistId, 'All');
  };

  const onActiveButtonClick = (): void => {
    changeTodolistFilterStatus(todolistId, 'Active');
  };

  const onCompletedButtonClick = (): void => {
    changeTodolistFilterStatus(todolistId, 'Completed');
  };

  const addTaskTitle = (title: string): void => {
    addTask(todolistId, title);
  };

  const changeTodolistTitleWrapper = (title: string): void => {
    changeTodolistTitle(todolistId, title);
  };

  const removeTodolistWrapper = (): void => {
    removeTodolist(todolistId);
  };

  return (
    <div className={s.todolistContainer}>
      <h3>
        <EditableSpan title={todolistTitle} changeTitle={changeTodolistTitleWrapper} />
        <button type="button" onClick={removeTodolistWrapper}>
          x
        </button>
      </h3>

      <AddItemForm setTitle={addTaskTitle} />
      <ul>{tasksJSX}</ul>

      <button
        type="button"
        onClick={onAllButtonClick}
        className={todolistFilterTasks === 'All' ? 'selected' : ''}
      >
        All
      </button>

      <button
        type="button"
        onClick={onActiveButtonClick}
        className={todolistFilterTasks === 'Active' ? 'selected' : ''}
      >
        Active
      </button>

      <button
        type="button"
        onClick={onCompletedButtonClick}
        className={todolistFilterTasks === 'Completed' ? 'selected' : ''}
      >
        Complete
      </button>
    </div>
  );
};
