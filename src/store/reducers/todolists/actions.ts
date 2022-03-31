import { v1 } from 'uuid';

import { FilterStatus } from 'components';

export const addTodolistAC = (title: string) =>
  ({
    type: 'TODO/ADD-TODOLIST',
    payload: {
      title,
      todolistId: v1(),
    },
  } as const);

export const removeTodolistAC = (todolistId: string) =>
  ({
    type: 'TODO/REMOVE-TODOLIST',
    payload: {
      todolistId,
    },
  } as const);

export const changeTodolistTitleAC = (todolistId: string, title: string) =>
  ({
    type: 'TODO/CHANGE-TODOLIST-TITLE',
    payload: {
      todolistId,
      title,
    },
  } as const);

export const changeTodolistFilterStatusAC = (
  todolistId: string,
  filterStatus: FilterStatus,
) =>
  ({
    type: 'TODO/CHANGE-TODOLIST-FILTER-STATUS',
    payload: {
      todolistId,
      filterStatus,
    },
  } as const);
