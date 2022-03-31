import {
  addTodolist,
  changeTodolistFilterStatus,
  changeTodolistTitle,
  removeTodolist,
} from 'store';

export type TodolistActionTypes =
  | ReturnType<typeof addTodolist>
  | ReturnType<typeof removeTodolist>
  | ReturnType<typeof changeTodolistTitle>
  | ReturnType<typeof changeTodolistFilterStatus>;
