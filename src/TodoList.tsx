import React, { ChangeEvent, useState, KeyboardEvent } from 'react';
import { FilterValuesType } from './App';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type TodoListPropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeItems: (itemID: string) => void;
  addItems: (title: string) => void;
  changeFilter: (filter: FilterValuesType) => void;
};

const TodoList = ({ title, tasks, removeItems, addItems, changeFilter }: TodoListPropsType) => {
  const [valueTitle, setValueTitle] = useState('');

  const addedTask = () => {
    addItems(valueTitle);
    setValueTitle('');
  };

  const onChangeFilterHandler = (filter: FilterValuesType) => {
    return () => changeFilter(filter);
  };

  const onKeyDownAddTask = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      addedTask();
    }
  };

  const onValueTitleTask = (event: ChangeEvent<HTMLInputElement>) =>
    setValueTitle(event.currentTarget.value);

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
        <input value={valueTitle} onChange={onValueTitleTask} onKeyDown={onKeyDownAddTask} />
        <button onClick={addedTask}>+</button>
      </div>
      <ul>{listItems}</ul>
      <div>
        <button onClick={onChangeFilterHandler('all')}>All</button>
        <button onClick={onChangeFilterHandler('active')}>Active</button>
        <button onClick={onChangeFilterHandler('completed')}>Completed</button>
      </div>
    </div>
  );
};

export default TodoList;
