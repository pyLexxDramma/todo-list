//src/App.js
import React from 'react';
import TodoList from './components/TodoList';
import todoStore from './stores/TodoStore'; // Импорт TodoStore

function App() {
  return (
    <div className="App">
      <TodoList todoStore={todoStore} /> {/* Передача todoStore как prop */}
    </div>
  );
}

export default App;
