export const addTaskAC = (todolistId: string, taskTitle: string) =>
  ({
    type: 'TASK/ADD-TASK',
    payload: {
      todolistId,
      taskTitle,
    },
  } as const);

export const removeTaskAC = (todolistId: string, taskId: string) =>
  ({
    type: 'TASK/REMOVE-TASK',
    payload: {
      todolistId,
      taskId,
    },
  } as const);

export const changeTaskTitleAC = (
  todolistId: string,
  taskId: string,
  taskTitle: string,
) =>
  ({
    type: 'TASK/CHANGE-TASK-TITLE',
    payload: {
      todolistId,
      taskId,
      taskTitle,
    },
  } as const);

export const changeTaskStatusAC = (
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
