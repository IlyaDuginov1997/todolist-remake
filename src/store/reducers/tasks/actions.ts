export const addTask = (todolistId: string, taskTitle: string) =>
  ({
    type: 'TASK/ADD-TASK',
    payload: {
      todolistId,
      taskTitle,
    },
  } as const);

export const removeTask = (todolistId: string, taskId: string) =>
  ({
    type: 'TASK/REMOVE-TASK',
    payload: {
      todolistId,
      taskId,
    },
  } as const);

export const changeTaskTitle = (todolistId: string, taskId: string, taskTitle: string) =>
  ({
    type: 'TASK/CHANGE-TASK-TITLE',
    payload: {
      todolistId,
      taskId,
      taskTitle,
    },
  } as const);

export const changeTaskStatus = (
  todolistId: string,
  taskId: string,
  taskStatus: boolean,
) =>
  ({
    type: 'TASK/CHANGE-TASK-STATUS',
    payload: {
      todolistId,
      taskId,
      taskStatus,
    },
  } as const);
