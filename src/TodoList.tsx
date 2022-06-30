import React from 'react';
import { FilterValuesType } from './App';

export type TaskType = {
  id: number;
  title: string;
  isDone: boolean;
};

type TodoListPropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeItems: (itemID: number) => void;
  addItems: () => void;
  changeFilter: (filter: FilterValuesType) => void;
};

const TodoList = ({ title, tasks, removeItems, addItems, changeFilter }: TodoListPropsType) => {
  const listItems = tasks.length ? (
    tasks.map((obj) => {
      const removeItem = () => removeItems(obj.id);
      return (
        <li key={obj.id}>
          <input type="checkbox" checked={obj.isDone} /> <span>{obj.title}</span>
          <button onClick={removeItem}>X</button>
        </li>
      );
    })
  ) : (
    <span>Empty</span>
  );

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input />
        <button onClick={addItems}>+</button>
      </div>
      <ul>{listItems}</ul>
      <div>
        <button onClick={() => changeFilter('all')}>All</button>
        <button onClick={() => changeFilter('active')}>Active</button>
        <button onClick={() => changeFilter('completed')}>Completed</button>
      </div>
    </div>
  );
};

export default TodoList;
