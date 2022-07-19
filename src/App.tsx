import React, { useState } from 'react';
import './App.css';
import { Todolist } from './Todolist';
import { v1 } from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed';
type TodolistsType = { id: string; title: string; filter: FilterValuesType };

function App() {
  let todolistID1 = v1();
  let todolistID2 = v1();

  let [todolists, setTodolists] = useState<Array<TodolistsType>>([
    { id: todolistID1, title: 'What to learn', filter: 'all' },
    { id: todolistID2, title: 'What to buy', filter: 'all' },
  ]);

  let [tasks, setTasks] = useState({
    [todolistID1]: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'ReactJS', isDone: false },
      { id: v1(), title: 'Rest API', isDone: false },
      { id: v1(), title: 'GraphQL', isDone: false },
    ],
    [todolistID2]: [
      { id: v1(), title: 'HTML&CSS2', isDone: true },
      { id: v1(), title: 'JS2', isDone: true },
      { id: v1(), title: 'ReactJS2', isDone: false },
      { id: v1(), title: 'Rest API2', isDone: false },
      { id: v1(), title: 'GraphQL2', isDone: false },
    ],
  });

  function removeTask(todoListID: string, taskID: string) {
    setTasks({ ...tasks, [todoListID]: tasks[todoListID].filter((obj) => obj.id !== taskID) });
    delete tasks[todoListID];
  }

  function removeTodoList(todoListID: string) {
    setTodolists(todolists.filter((obj) => obj.id !== todoListID));
  }

  function addTask(todoListID: string, title: string) {
    let newTask = { id: v1(), title: title, isDone: false };
    setTasks({ ...tasks, [todoListID]: [newTask, ...tasks[todoListID]] });
  }

  function changeStatus(todoListID: string, taskID: string, isDone: boolean) {
    setTasks({
      ...tasks,
      [todoListID]: tasks[todoListID].map((obj) => (obj.id === taskID ? { ...obj, isDone } : obj)),
    });
  }

  function changeFilter(todoListID: string, value: FilterValuesType) {
    setTodolists(todolists.map((obj) => (obj.id === todoListID ? { ...obj, filter: value } : obj)));
  }

  return (
    <div className="App">
      {todolists.map((el) => {
        let tasksForTodolist = tasks[el.id];
        if (el.filter === 'active') {
          tasksForTodolist = tasks[el.id].filter((t) => !t.isDone);
        }
        if (el.filter === 'completed') {
          tasksForTodolist = tasks[el.id].filter((t) => t.isDone);
        }

        return (
          <Todolist
            removeTodoList={removeTodoList}
            key={el.id}
            todoListID={el.id}
            title={el.title}
            tasks={tasksForTodolist}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeStatus}
            filter={el.filter}
          />
        );
      })}
    </div>
  );
}

export default App;
