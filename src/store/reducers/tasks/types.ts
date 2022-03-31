import {
  addTaskAC,
  addTodolistAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  removeTodolistAC,
} from 'store';

export type TaskActionType =
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof changeTaskTitleAC>
  | ReturnType<typeof changeTaskStatusAC>
  | ReturnType<typeof addTodolistAC>
  | ReturnType<typeof removeTodolistAC>;
