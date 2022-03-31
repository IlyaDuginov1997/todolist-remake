import { v1 } from 'uuid';

import { TasksType, TaskType } from 'components';
import { TaskActionType } from 'store';

export const taskReducer = (state: TasksType, action: TaskActionType): TasksType => {
  switch (action.type) {
    case 'TASK/ADD-TASK': {
      const { todolistId, taskTitle } = action.payload;
      const newTask: TaskType = {
        id: v1(),
        taskTitle,
        isDone: false,
      };
      return {
        ...state,
        [todolistId]: [newTask, ...state[todolistId]],
      };
    }
    case 'TASK/REMOVE-TASK': {
      const { todolistId, taskId } = action.payload;
      return {
        ...state,
        [todolistId]: state[todolistId].filter(task => task.id !== taskId),
      };
    }

    case 'TASK/CHANGE-TASK-TITLE': {
      const { todolistId, taskId, taskTitle } = action.payload;
      return {
        ...state,
        [todolistId]: state[todolistId].map(task =>
          task.id !== taskId ? task : { ...task, taskTitle },
        ),
      };
    }

    case 'TASK/CHANGE-TASK-STATUS': {
      const { todolistId, taskId, taskStatus } = action.payload;
      return {
        ...state,
        [todolistId]: state[todolistId].map(task =>
          task.id !== taskId ? task : { ...task, isDone: taskStatus },
        ),
      };
    }

    case 'TODO/ADD-TODOLIST': {
      return {
        [action.payload.todolistId]: [],
        ...state,
      };
    }

    default:
      throw new Error('I do not this action-type');
  }
};
