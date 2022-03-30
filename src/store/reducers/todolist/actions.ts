import { FilterStatus } from 'components';

export const addTodolist = (title: string): any =>
  ({
    type: 'TODO/ADD-TODOLIST',
    payload: {
      title,
    },
  } as const);

export const removeTodolist = (todolistId: string): any =>
  ({
    type: 'TODO/REMOVE-TODOLIST',
    payload: {
      todolistId,
    },
  } as const);

export const changeTodolistTitle = (todolistId: string, title: string): any =>
  ({
    type: 'TODO/CHANGE-TODOLIST-TITLE',
    payload: {
      todolistId,
      title,
    },
  } as const);

export const changeTodolistFilterStatus = (
  todolistId: string,
  filterStatus: FilterStatus,
): any =>
  ({
    type: 'TODO/CHANGE-TODOLIST-FILTER-STATUS',
    payload: {
      todolistId,
      filterStatus,
    },
  } as const);
