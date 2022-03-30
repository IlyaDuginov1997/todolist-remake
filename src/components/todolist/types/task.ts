export type TasksType = {
  [key: string]: TaskType[];
};

export type TaskType = {
  id: string;
  taskTitle: string;
  isDone: boolean;
};
