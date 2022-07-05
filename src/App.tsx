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

  const changeFilter = (filter: FilterValuesType) => {
    setFilter(filter);
  };

  const addItems = (title: string) => {
    setItems([{ id: v1(), title, isDone: false }, ...items]);
  };

  //UI:
  return (
    <div className="App">
      <TodoList
        tasks={itemsFilter}
        title={title}
        removeItems={removeItems}
        addItems={addItems}
        changeFilter={changeFilter}
      />
    </div>
  );
}

export default App;
