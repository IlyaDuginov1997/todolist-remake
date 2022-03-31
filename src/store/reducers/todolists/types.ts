import {
  addTodolistAC,
  changeTodolistFilterStatusAC,
  changeTodolistTitleAC,
  removeTodolistAC,
} from 'store';

export type TodolistActionTypes =
  | ReturnType<typeof addTodolistAC>
  | ReturnType<typeof removeTodolistAC>
  | ReturnType<typeof changeTodolistTitleAC>
  | ReturnType<typeof changeTodolistFilterStatusAC>;
