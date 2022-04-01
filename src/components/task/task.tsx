import React, { ChangeEvent, memo, useCallback } from 'react';

import { EditableSpan } from 'components/index';
import { TaskType } from 'components/todolist/types/task';
import { ReturnComponentType } from 'types/ReturnComponentType';

type TaskPropsType = {
  changeStatus: (todolistId: string, taskId: string, status: boolean) => void;
  todolistId: string;
  removeTask: (todolistId: string, taskId: string) => void;
  changeTaskTitle: (todolistId: string, taskId: string, title: string) => void;
  task: TaskType;
};

export const Task: React.FC<TaskPropsType> = memo(
  ({
    changeStatus,
    todolistId,
    removeTask,
    changeTaskTitle,
    task,
  }): ReturnComponentType => {
    const { id, taskTitle, isDone } = task;

    const changeTaskStatus = useCallback(
      (e: ChangeEvent<HTMLInputElement>): void => {
        changeStatus(todolistId, id, e.currentTarget.checked);
      },
      [changeStatus, todolistId, id],
    );

    const removeTaskFromId = useCallback((): void => {
      removeTask(todolistId, id);
    }, [removeTask, todolistId, id]);

    const changeTaskTitleIntoTodolist = useCallback(
      (title: string): void => {
        changeTaskTitle(todolistId, id, title);
      },
      [changeTaskTitle, todolistId, id],
    );

    return (
      <li key={id} className={isDone ? 'isDone' : ''}>
        <input type="checkbox" checked={isDone} onChange={changeTaskStatus} />
        <EditableSpan title={taskTitle} changeTitle={changeTaskTitleIntoTodolist} />
        <button type="button" onClick={removeTaskFromId}>
          х
        </button>
      </li>
    );
  },
);
