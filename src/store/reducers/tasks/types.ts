import {
  addTask,
  addTodolist,
  changeTaskStatus,
  changeTaskTitle,
  removeTask,
} from 'store';

export type TaskActionType =
  | ReturnType<typeof addTask>
  | ReturnType<typeof removeTask>
  | ReturnType<typeof changeTaskTitle>
  | ReturnType<typeof changeTaskStatus>
  | ReturnType<typeof addTodolist>;
