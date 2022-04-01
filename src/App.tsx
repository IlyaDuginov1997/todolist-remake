import React, { useCallback } from 'react';

import './App.css';
import { useDispatch, useSelector } from 'react-redux';

import { AddItemForm, FilterStatus, TasksType, Todolist, TodolistType } from 'components';
import {
  addTaskAC,
  addTodolistAC,
  AppRootStateType,
  changeTaskStatusAC,
  changeTaskTitleAC,
  changeTodolistFilterStatusAC,
  changeTodolistTitleAC,
  removeTaskAC,
  removeTodolistAC,
} from 'store';
import { ReturnComponentType } from 'types';

const App = (): ReturnComponentType => {
  const dispatch = useDispatch();

  const todolists = useSelector<AppRootStateType, TodolistType[]>(
    state => state.todolists,
  );
  const tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks);

  const changeTaskStatus = useCallback(
    (todolistId: string, taskId: string, taskStatus: boolean): any => {
      dispatch(changeTaskStatusAC(todolistId, taskId, taskStatus));
    },
    [],
  );

  const changeTaskTitle = useCallback(
    (todolistId: string, taskId: string, taskTitle: string): any => {
      dispatch(changeTaskTitleAC(todolistId, taskId, taskTitle));
    },
    [],
  );

  const removeTask = useCallback((todolistId: string, taskId: string): any => {
    dispatch(removeTaskAC(todolistId, taskId));
  }, []);

  const addTask = useCallback((todolistId: string, taskTitle: string): any => {
    dispatch(addTaskAC(todolistId, taskTitle));
  }, []);

  const changeTodolistFilterStatus = useCallback(
    (todolistId: string, filterStatus: FilterStatus): any => {
      dispatch(changeTodolistFilterStatusAC(todolistId, filterStatus));
    },
    [],
  );

  const changeTodolistTitle = useCallback((todolistId: string, title: string): any => {
    dispatch(changeTodolistTitleAC(todolistId, title));
  }, []);

  const removeTodolist = useCallback((todolistId: string): any => {
    dispatch(removeTodolistAC(todolistId));
  }, []);

  const addTodolist = useCallback((title: string): any => {
    dispatch(addTodolistAC(title));
  }, []);

  return (
    <div className="App">
      <AddItemForm setTitle={addTodolist} />

      {todolists.map(({ id, filter, title }) => (
        <Todolist
          key={id}
          todolistTitle={title}
          todolistId={id}
          tasks={tasks[id]}
          changeStatus={changeTaskStatus}
          changeTodolistFilterStatus={changeTodolistFilterStatus}
          todolistFilterTasks={filter}
          removeTask={removeTask}
          addTask={addTask}
          changeTaskTitle={changeTaskTitle}
          changeTodolistTitle={changeTodolistTitle}
          removeTodolist={removeTodolist}
        />
      ))}
    </div>
  );
};

export default App;
