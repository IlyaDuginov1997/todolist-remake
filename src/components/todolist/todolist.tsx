import React, { memo, useCallback } from 'react';

import s from './todolist.module.css';

import { AddItemForm, EditableSpan, FilterStatus, TaskType, Task } from 'components';
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

export const Todolist: React.FC<TodolistPropsType> = memo(
  ({
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
    let copyTasks = [...tasks];

    if (todolistFilterTasks === 'Completed') {
      copyTasks = copyTasks.filter(task => task.isDone);
    }

    if (todolistFilterTasks === 'Active') {
      copyTasks = copyTasks.filter(task => !task.isDone);
    }

    const tasksJSX = copyTasks.map(task => (
      <Task
        key={task.id}
        changeStatus={changeStatus}
        todolistId={todolistId}
        removeTask={removeTask}
        changeTaskTitle={changeTaskTitle}
        task={task}
      />
    ));

    const onAllButtonClick = useCallback((): void => {
      changeTodolistFilterStatus(todolistId, 'All');
    }, [changeTodolistFilterStatus, todolistId]);

    const onActiveButtonClick = useCallback((): void => {
      changeTodolistFilterStatus(todolistId, 'Active');
    }, [changeTodolistFilterStatus, todolistId]);

    const onCompletedButtonClick = useCallback((): void => {
      changeTodolistFilterStatus(todolistId, 'Completed');
    }, [changeTodolistFilterStatus, todolistId]);

    const addTaskTitle = useCallback(
      (title: string): void => {
        addTask(todolistId, title);
      },
      [addTask, todolistId],
    );

    const changeTodolistTitleWrapper = useCallback(
      (title: string): void => {
        changeTodolistTitle(todolistId, title);
      },
      [changeTodolistTitle, todolistId],
    );

    const removeTodolistWrapper = useCallback((): void => {
      removeTodolist(todolistId);
    }, [removeTodolist, todolistId]);

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
  },
);
