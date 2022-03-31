import React, { useState } from 'react';

import './App.css';
import { v1 } from 'uuid';

import {
  AddItemForm,
  FilterStatus,
  TasksType,
  TaskType,
  Todolist,
  TodolistType,
} from 'components';
import { ReturnComponentType } from 'types';

const todolistId1 = v1();
const todolistId2 = v1();

const App = (): ReturnComponentType => {
  const [tasks, setTasks] = useState<TasksType>({
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

  const [todolists, setTodolists] = useState<TodolistType[]>([
    { title: 'What can I buy', id: todolistId1, filter: 'All' },
    { title: 'What can I learn', id: todolistId2, filter: 'All' },
  ]);

  const changeTaskStatus = (
    todolistId: string,
    taskId: string,
    taskStatus: boolean,
  ): void => {
    const newTasks = tasks[todolistId].map(task =>
      task.id === taskId ? { ...task, isDone: taskStatus } : task,
    );
    setTasks({ ...tasks, [todolistId]: newTasks });
  };

  const changeTaskTitle = (
    todolistId: string,
    taskId: string,
    taskTitle: string,
  ): void => {
    const newTasks = tasks[todolistId].map(task =>
      task.id === taskId ? { ...task, taskTitle } : task,
    );
    setTasks({ ...tasks, [todolistId]: newTasks });
  };

  const removeTask = (todolistId: string, taskId: string): void => {
    const newTasks = tasks[todolistId].filter(task => task.id !== taskId);
    setTasks({ ...tasks, [todolistId]: newTasks });
  };

  const addTask = (todolistId: string, taskTitle: string): void => {
    const newTask: TaskType = {
      id: v1(),
      taskTitle,
      isDone: false,
    };
    // setTasks([...tasks, newTask]);
    setTasks({ ...tasks, [todolistId]: [...tasks[todolistId], newTask] });
  };

  const changeTodolistFilterStatus = (
    todolistId: string,
    filterStatus: FilterStatus,
  ): void => {
    const newTodolists = todolists.map(todolist =>
      todolistId === todolist.id ? { ...todolist, filter: filterStatus } : todolist,
    );
    setTodolists(newTodolists);
  };

  const changeTodolistTitle = (todolistId: string, title: string): void => {
    const newTodolists = todolists.map(todolist =>
      todolist.id === todolistId ? { ...todolist, title } : todolist,
    );
    setTodolists(newTodolists);
  };

  const removeTodolist = (todolistId: string): void => {
    const newTodolists = todolists.filter(todolist => todolist.id !== todolistId);
    setTodolists(newTodolists);
    const copyTask = { ...tasks };
    delete copyTask[todolistId];
    setTasks(copyTask);
  };

  const addTodolist = (title: string): void => {
    const todolistId = v1();
    setTodolists([...todolists, { id: todolistId, filter: 'All', title }]);
    setTasks({ ...tasks, [todolistId]: [] });
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

export default App;
