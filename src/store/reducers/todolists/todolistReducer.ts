import { TodolistType } from 'components';
import { TodolistActionTypes } from 'store';

export const todolistReducer = (
  state: TodolistType[] = [],
  action: TodolistActionTypes,
): TodolistType[] => {
  switch (action.type) {
    case 'TODO/ADD-TODOLIST': {
      const { todolistId, title } = action.payload;
      const newTodolist: TodolistType = {
        id: todolistId,
        title,
        filter: 'All',
      };
      return [newTodolist, ...state];
    }

    case 'TODO/REMOVE-TODOLIST': {
      const { todolistId } = action.payload;
      return state.filter(({ id }) => id !== todolistId);
    }

    case 'TODO/CHANGE-TODOLIST-TITLE': {
      const { todolistId, title } = action.payload;
      return state.map(todolist =>
        todolist.id !== todolistId ? todolist : { ...todolist, title },
      );
    }

    case 'TODO/CHANGE-TODOLIST-FILTER-STATUS': {
      const { todolistId, filterStatus } = action.payload;
      return state.map(todolist =>
        todolist.id !== todolistId ? todolist : { ...todolist, filter: filterStatus },
      );
    }

    default:
      return state;
  }
};
