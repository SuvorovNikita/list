import React from 'react';

import TodoList, { TaskType } from './TodoList';

import './App.css';

function App() {
  const title_1: string = 'What to learn';
  const title_2: string = 'What to buy';

  const tasks_1: Array<TaskType> = [
    { id: 1, title: 'JS', isDone: true },
    { id: 2, title: 'React', isDone: true },
    { id: 3, title: 'TS', isDone: true },
  ];

  const tasks_2: Array<TaskType> = [
    { id: 1, title: 'NodeJS', isDone: false },
    { id: 2, title: 'Webpack', isDone: true },
    { id: 3, title: 'Sass', isDone: true },
  ];

  return (
    <div className="App">
      <TodoList tasks={tasks_1} title={title_1} />
      <TodoList tasks={tasks_2} title={title_2} />
    </div>
  );
}

export default App;
