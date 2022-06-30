import React, { useState } from 'react';

import TodoList, { TaskType } from './TodoList';

import './App.css';

export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {
  //BLL:
  const title: string = 'What to learn';

  const [items, setItems] = useState<Array<TaskType>>([
    { id: 1, title: 'Svelte', isDone: true },
    { id: 2, title: 'React', isDone: true },
    { id: 3, title: 'Angular', isDone: true },
    { id: 4, title: 'Vue', isDone: false },
  ]);

  const [filter, setFilter] = useState<FilterValuesType>('all');

  const removeItems = (itemID: number) => {
    setItems(items.filter((item) => item.id !== itemID));
  };

  let itemsFilter;
  switch (filter) {
    case 'completed':
      itemsFilter = items.filter((item) => item.isDone === true);
      break;
    case 'active':
      itemsFilter = items.filter((item) => item.isDone === false);
      break;
    default:
      itemsFilter = items;
  }

  const changeFilter = (filter: FilterValuesType) => {
    setFilter(filter);
  };

  const addItems = () => {
    console.log('add');
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
