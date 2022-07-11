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
  changeStatus: (itemID: string, isDone: boolean) => void;
  filter: FilterValuesType;
};

const TodoList = ({
  tasks,
  title,
  addItems,
  removeItems,
  changeFilter,
  changeStatus,
  filter,
}: TodoListPropsType) => {
  const [valueTitle, setValueTitle] = useState('');
  const [error, setError] = useState<boolean>(false);

  const onChangeAddedTask = () => {
    const trimmedTitle = valueTitle.trim();
    if (trimmedTitle) {
      addItems(trimmedTitle);
    } else setError(true);
    setValueTitle('');
  };

  const onChangeFilterHandler = (filter: FilterValuesType) => {
    return () => changeFilter(filter);
  };

  const onKeyDownAddTask = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onChangeAddedTask();
    }
  };

  const onChangeRemoveItem = (id: string) => {
    return () => removeItems(id);
  };

  const onValueTitleTask = (event: ChangeEvent<HTMLInputElement>) => {
    error && setError(false);
    setValueTitle(event.currentTarget.value);
  };

  const listItems = tasks.length ? (
    tasks.map((obj) => {
      const onChangeStatus = (event: ChangeEvent<HTMLInputElement>) => {
        changeStatus(obj.id, event.currentTarget.checked);
      };

      return (
        <li key={obj.id} className={obj.isDone ? 'isDone' : ''}>
          <input onChange={onChangeStatus} type="checkbox" checked={obj.isDone} />{' '}
          <span>{obj.title}</span>
          <button onClick={onChangeRemoveItem(obj.id)}>X</button>
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
        <input
          className={error ? 'error' : ''}
          value={valueTitle}
          onChange={onValueTitleTask}
          onKeyDown={onKeyDownAddTask}
        />
        <button onClick={onChangeAddedTask}>+</button>
        {error && <div style={{ color: 'tomato' }}>Title is required!!</div>}
      </div>
      <ul>{listItems}</ul>
      <div>
        <button className={filter === 'all' ? 'active' : ''} onClick={onChangeFilterHandler('all')}>
          All
        </button>
        <button
          className={filter === 'active' ? 'active' : ''}
          onClick={onChangeFilterHandler('active')}>
          Active
        </button>
        <button
          className={filter === 'completed' ? 'active' : ''}
          onClick={onChangeFilterHandler('completed')}>
          Completed
        </button>
      </div>
    </div>
  );
};

export default TodoList;
