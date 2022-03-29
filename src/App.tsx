import React, { useState } from 'react';

import './App.css';
import { v1 } from 'uuid';

import { Todolist } from 'components';
import { TaskStatusMode, TaskType } from 'components/todolist/types';
import { ReturnComponentType } from 'types';

const App = (): ReturnComponentType => {
  const [taskStatusMode, setTaskStatusMode] = useState<TaskStatusMode>('All');

  const [tasks, setTasks] = useState<TaskType[]>([
    { id: v1(), taskTitle: 'Meat', isDone: false },
    { id: v1(), taskTitle: 'Beer', isDone: true },
    { id: v1(), taskTitle: 'Milk', isDone: false },
  ]);

  const todolist = { title: 'What can I buy', id: 1 };

  const changeStatus = (taskId: string, status: boolean): void => {
    const newTasks = tasks.map(task =>
      task.id === taskId ? { ...task, isDone: status } : task,
    );
    setTasks(newTasks);
  };

  const removeTask = (taskId: string): void => {
    const newTasks = tasks.filter(task => task.id !== taskId);
    setTasks(newTasks);
  };

  const addTask = (taskTitle: string): void => {
    const newTask: TaskType = {
      id: v1(),
      taskTitle,
      isDone: false,
    };
    setTasks([...tasks, newTask]);
  };

  let copyTasks = [...tasks];

  if (taskStatusMode === 'Completed') {
    copyTasks = copyTasks.filter(task => task.isDone);
  }

  if (taskStatusMode === 'Active') {
    copyTasks = copyTasks.filter(task => !task.isDone);
  }

  return (
    <div className="App">
      <Todolist
        todolistTitle={todolist.title}
        tasks={copyTasks}
        changeStatus={changeStatus}
        setTaskStatusMode={setTaskStatusMode}
        taskStatusMode={taskStatusMode}
        removeTask={removeTask}
        addTask={addTask}
      />
    </div>
  );
};

export default App;
