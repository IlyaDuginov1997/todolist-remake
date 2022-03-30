import { v1 } from 'uuid';

import { TodolistType } from 'components';
import { TodolistActionTypes } from 'store';

export const todolistReducer = (
  state: TodolistType[],
  action: TodolistActionTypes,
): TodolistType[] => {
  switch (action.type) {
    case 'TODO/ADD-TODOLIST':
      return [
        {
          id: v1(),
          title: action.payload.title,
          filter: 'All',
        },
        ...state,
      ];
    case 'TODO/REMOVE-TODOLIST':
      return state.filter(({ id }) => id !== action.payload.todolistId);
    case 'TODO/CHANGE-TODOLIST-TITLE':
      return state.map(todolist =>
        todolist.id !== action.payload.todolistId
          ? todolist
          : { ...todolist, title: action.payload.title },
      );
    case 'TODO/CHANGE-TODOLIST-FILTER-STATUS':
      return state.map(todolist =>
        todolist.id !== action.payload.todolistId
          ? todolist
          : { ...todolist, filter: action.payload.filterStatus },
      );
    default:
      throw new Error('I do not this action-type');
  }
};
