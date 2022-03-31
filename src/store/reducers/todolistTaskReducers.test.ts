import { TasksType, TodolistType } from 'components';
import { taskReducer, addTodolist, todolistReducer } from 'store';

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
