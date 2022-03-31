import { v1 } from 'uuid';

import { FilterStatus, TodolistType } from 'components';
import {
  addTodolistAC,
  changeTodolistFilterStatusAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  todolistReducer,
} from 'store';

let todolistId1: string;
let todolistId2: string;
let startState: TodolistType[] = [];

beforeEach(() => {
  todolistId1 = v1();
  todolistId2 = v1();

  startState = [
    { id: todolistId1, title: 'What to do', filter: 'All' },
    { id: todolistId2, title: 'What to learn', filter: 'All' },
  ];
});

test('todolists will be added', () => {
  const todolistsCount = 3;
  const firstTodolist = 0;
  const newTodolistTitle = 'New title';

  const endState = todolistReducer(startState, addTodolistAC(newTodolistTitle));

  expect(endState.length).toBe(todolistsCount);
  expect(endState[firstTodolist].title).toBe(newTodolistTitle);
});

test('todolists will be removed', () => {
  const todolistsCount = 1;
  const firstTodolist = 0;

  const endState = todolistReducer(startState, removeTodolistAC(todolistId2));

  expect(endState.length).toBe(todolistsCount);
  expect(endState[firstTodolist].id).toBe(todolistId1);
});

test('title of todolists will be changed', () => {
  const newTodolistTitle = 'New title';
  const todolistsCount = 2;
  const firstTodolist = 0;

  const endState = todolistReducer(
    startState,
    changeTodolistTitleAC(todolistId1, newTodolistTitle),
  );

  expect(endState.length).toBe(todolistsCount);
  expect(endState[firstTodolist].title).toBe(newTodolistTitle);
});

test('filter-status of todolists will be changed', () => {
  const newTodolistStatus: FilterStatus = 'Active';
  const todolistsCount = 2;
  const firstTodolist = 0;

  const endState = todolistReducer(
    startState,
    changeTodolistFilterStatusAC(todolistId1, newTodolistStatus),
  );

  expect(endState.length).toBe(todolistsCount);
  expect(endState[firstTodolist].filter).toBe(newTodolistStatus);
});
