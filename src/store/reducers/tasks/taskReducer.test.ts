import { v1 } from 'uuid';

import { TasksType } from 'components';
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  taskReducer,
} from 'store';

let todolistId1: string;
let todolistId2: string;
let startState: TasksType = {};

beforeEach(() => {
  todolistId1 = v1();
  todolistId2 = v1();

  startState = {
    [todolistId1]: [
      { id: v1(), taskTitle: 'Meat', isDone: false },
      { id: v1(), taskTitle: 'Beer', isDone: true },
      { id: v1(), taskTitle: 'Milk', isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), taskTitle: 'React', isDone: false },
      { id: v1(), taskTitle: 'Redux', isDone: true },
      { id: v1(), taskTitle: 'Typescript', isDone: false },
    ],
  };
});

test('task will be added', () => {
  const todolistsCount = 2;
  const tasksInTodolist1 = 4;
  const tasksInTodolist2 = 3;
  const newTodolistTitle = 'New title for task';

  const endState = taskReducer(startState, addTaskAC(todolistId1, newTodolistTitle));

  expect(Object.keys(endState).length).toBe(todolistsCount);
  expect(endState[todolistId1].length).toBe(tasksInTodolist1);
  expect(endState[todolistId2].length).toBe(tasksInTodolist2);
});

test('task will be removed', () => {
  const todolistsCount = 2;
  const tasksInTodolist1 = 2;
  const tasksInTodolist2 = 3;
  const firstTaskInTodolist = 0;
  const taskId = startState[todolistId1][firstTaskInTodolist].id;

  const endState = taskReducer(startState, removeTaskAC(todolistId1, taskId));

  expect(Object.keys(endState).length).toBe(todolistsCount);
  expect(endState[todolistId1].length).toBe(tasksInTodolist1);
  expect(endState[todolistId2].length).toBe(tasksInTodolist2);
  expect(endState[todolistId1][firstTaskInTodolist].taskTitle).toBe('Beer');
});

test('task-title will be changed', () => {
  const todolistsCount = 2;
  const tasksInTodolist1 = 3;
  const tasksInTodolist2 = 3;
  const firstTaskInTodolist = 0;
  const newTitle = 'New Title for task';
  const taskId = startState[todolistId1][firstTaskInTodolist].id;

  const endState = taskReducer(
    startState,
    changeTaskTitleAC(todolistId1, taskId, newTitle),
  );

  expect(Object.keys(endState).length).toBe(todolistsCount);
  expect(endState[todolistId1].length).toBe(tasksInTodolist1);
  expect(endState[todolistId2].length).toBe(tasksInTodolist2);
  expect(endState[todolistId1][firstTaskInTodolist].taskTitle).toBe(newTitle);
});

test('task-status will be changed', () => {
  const todolistsCount = 2;
  const tasksInTodolist1 = 3;
  const tasksInTodolist2 = 3;
  const firstTaskInTodolist = 0;
  const taskStatus = true;
  const taskId = startState[todolistId1][firstTaskInTodolist].id;

  const endState = taskReducer(
    startState,
    changeTaskStatusAC(todolistId1, taskId, taskStatus),
  );

  expect(Object.keys(endState).length).toBe(todolistsCount);
  expect(endState[todolistId1].length).toBe(tasksInTodolist1);
  expect(endState[todolistId2].length).toBe(tasksInTodolist2);
  expect(endState[todolistId1][firstTaskInTodolist].taskTitle).toBe('Meat');
  expect(startState[todolistId1][firstTaskInTodolist].isDone).toBe(false);
  expect(endState[todolistId1][firstTaskInTodolist].isDone).toBe(true);
});
