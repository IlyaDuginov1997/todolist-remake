import { v1 } from 'uuid';

import { TasksType, TodolistType } from 'components';
import { taskReducer, addTodolist, todolistReducer, removeTodolist } from 'store';

test('Ids should be equals', () => {
  const startTasksState: TasksType = {};
  const startTodolistsState: TodolistType[] = [];

  const action = addTodolist('New todolist for common test');
  const endTodolistsState = todolistReducer(startTodolistsState, action);
  const endTasksState = taskReducer(startTasksState, action);

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const keys = Object.keys(endTasksState);
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const idFromTasks = keys[0];
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTasks).toBe(action.payload.todolistId);
  expect(idFromTodolists).toBe(action.payload.todolistId);
});

test('property with todolistId should be deleted', () => {
  const todolistId1 = v1();
  const todolistId2 = v1();

  const startState = {
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

  const action = removeTodolist(todolistId1);

  const endState = taskReducer(startState, action);

  const keys = Object.keys(endState);

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  expect(keys.length).toBe(1);
});
