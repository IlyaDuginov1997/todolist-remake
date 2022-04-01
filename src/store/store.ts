import { combineReducers, createStore } from 'redux';

import { taskReducer, todolistReducer } from 'store/reducers';

const rootReducer = combineReducers({
  todolists: todolistReducer,
  tasks: taskReducer,
});

export const store = createStore(rootReducer);

export type AppRootStateType = ReturnType<typeof rootReducer>;
