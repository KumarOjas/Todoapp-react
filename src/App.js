import React, { useState } from 'react';
import './App.css';

function App() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);

  // Function to handle adding a new task
  const addTodo = () => {
    if (task.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        text: task,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setTask('');  // Clear input field after adding
    }
  };

  // Function to handle deleting a task
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Function to handle toggling the task's completion state
  const toggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <div className="App">
      <h1>To-Do App</h1>
      <div className="todo-input">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={addTodo}>Add Task</button>
      </div>

      <TodoList
        todos={todos}
        deleteTodo={deleteTodo}
        toggleComplete={toggleComplete}
      />
    </div>
  );
}

// TodoList Component
const TodoList = ({ todos, deleteTodo, toggleComplete }) => {
  return (
    <ul>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          deleteTodo={deleteTodo}
          toggleComplete={toggleComplete}
        />
      ))}
    </ul>
  );
};

// TodoItem Component
const TodoItem = ({ todo, deleteTodo, toggleComplete }) => {
  return (
    <li className={todo.completed ? 'completed' : ''}>
      <span
        onClick={() => toggleComplete(todo.id)}
        style={{ cursor: 'pointer' }}
      >
        {todo.text}
      </span>
      <button onClick={() => deleteTodo(todo.id)}>Delete</button>
    </li>
  );
};

export default App;
