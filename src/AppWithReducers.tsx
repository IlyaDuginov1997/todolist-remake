import React, { useReducer } from 'react';

import './App.css';
import { v1 } from 'uuid';

import { AddItemForm, FilterStatus, Todolist } from 'components';
import {
  addTaskAC,
  addTodolistAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  changeTodolistFilterStatusAC,
  changeTodolistTitleAC,
  removeTaskAC,
  removeTodolistAC,
  taskReducer,
  todolistReducer,
} from 'store';
import { ReturnComponentType } from 'types';

const AppWithReducers = (): ReturnComponentType => {
  const todolistId1 = v1();
  const todolistId2 = v1();

  const [tasks, dispatchTasks] = useReducer(taskReducer, {
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
  });

  const [todolists, dispatchTodolists] = useReducer(todolistReducer, [
    { title: 'What can I buy', id: todolistId1, filter: 'All' },
    { title: 'What can I learn', id: todolistId2, filter: 'All' },
  ]);

  const changeTaskStatus = (
    todolistId: string,
    taskId: string,
    taskStatus: boolean,
  ): any => {
    dispatchTasks(changeTaskStatusAC(todolistId, taskId, taskStatus));
  };

  const changeTaskTitle = (
    todolistId: string,
    taskId: string,
    taskTitle: string,
  ): any => {
    dispatchTasks(changeTaskTitleAC(todolistId, taskId, taskTitle));
  };

  const removeTask = (todolistId: string, taskId: string): any => {
    dispatchTasks(removeTaskAC(todolistId, taskId));
  };

  const addTask = (todolistId: string, taskTitle: string): any => {
    dispatchTasks(addTaskAC(todolistId, taskTitle));
  };

  const changeTodolistFilterStatus = (
    todolistId: string,
    filterStatus: FilterStatus,
  ): any => {
    dispatchTodolists(changeTodolistFilterStatusAC(todolistId, filterStatus));
  };

  const changeTodolistTitle = (todolistId: string, title: string): any => {
    dispatchTodolists(changeTodolistTitleAC(todolistId, title));
  };

  const removeTodolist = (todolistId: string): any => {
    dispatchTasks(removeTodolistAC(todolistId));
    dispatchTodolists(removeTodolistAC(todolistId));
  };

  const addTodolist = (title: string): any => {
    const action = addTodolistAC(title);
    dispatchTodolists(action);
    dispatchTasks(action);
  };

  return (
    <div className="App">
      <AddItemForm setTitle={addTodolist} />

      {todolists.map(({ id, filter, title }) => {
        let copyTasks = [...tasks[id]];

        if (filter === 'Completed') {
          copyTasks = copyTasks.filter(task => task.isDone);
        }

        if (filter === 'Active') {
          copyTasks = copyTasks.filter(task => !task.isDone);
        }

        return (
          <Todolist
            key={id}
            todolistTitle={title}
            todolistId={id}
            tasks={copyTasks}
            changeStatus={changeTaskStatus}
            changeTodolistFilterStatus={changeTodolistFilterStatus}
            todolistFilterTasks={filter}
            removeTask={removeTask}
            addTask={addTask}
            changeTaskTitle={changeTaskTitle}
            changeTodolistTitle={changeTodolistTitle}
            removeTodolist={removeTodolist}
          />
        );
      })}
    </div>
  );
};

export default AppWithReducers;
