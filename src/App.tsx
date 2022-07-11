import React, { useState } from 'react';
import { v1 } from 'uuid';

import TodoList, { TaskType } from './TodoList';

import './App.css';

export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {
  //BLL:
  const title: string = 'What to learn';

  const [items, setItems] = useState<Array<TaskType>>([
    { id: v1(), title: 'Svelte', isDone: true },
    { id: v1(), title: 'React', isDone: true },
    { id: v1(), title: 'Angular', isDone: true },
    { id: v1(), title: 'Vue', isDone: false },
  ]);
  const [filter, setFilter] = useState<FilterValuesType>('all');

  const removeItems = (itemID: string) => {
    setItems(items.filter((item) => item.id !== itemID));
  };

  const changeFilter = (filter: FilterValuesType) => {
    setFilter(filter);
  };

  const addItems = (title: string) => {
    setItems([{ id: v1(), title, isDone: false }, ...items]);
  };

  const changeStatus = (itemID: string, isDone: boolean) => {
    setItems(items.map((item) => (item.id === itemID ? { ...item, isDone: isDone } : item)));
  };

  let itemsFilter;
  switch (filter) {
    case 'completed':
      itemsFilter = items.filter((item) => item.isDone);
      break;
    case 'active':
      itemsFilter = items.filter((item) => !item.isDone);
      break;
    default:
      itemsFilter = items;
  }

  //UI:
  return (
    <div className="App">
      <TodoList
        filter={filter}
        changeStatus={changeStatus}
        changeFilter={changeFilter}
        tasks={itemsFilter}
        title={title}
        removeItems={removeItems}
        addItems={addItems}
      />
    </div>
  );
}

export default App;
