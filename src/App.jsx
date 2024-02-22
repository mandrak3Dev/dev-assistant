// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import TodoForm from './Components/TodoForm';
import TodoList from './Components/TodoList';
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('http://localhost:3001/todos');
        setTodos(response.data);
      } catch (error) {
        console.error('Error al cargar la lista de to-dos:', error);
      }
    };

    fetchTodos();
  }, []);

  const handleTodoAdded = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  const handleTodoDeleted = async (deletedTodoId) => {
    try {
      await axios.delete(`http://localhost:3001/todos/${deletedTodoId}`);
      setTodos(todos.filter((todo) => todo._id !== deletedTodoId));
    } catch (error) {
      console.error('Error al eliminar el todo:', error);
    }
  };

  const handleTodoUpdated = (updatedTodoId, updatedTask) => {
    const updatedTodos = todos.map((todo) =>
      todo._id === updatedTodoId ? { ...todo, task: updatedTask } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <Router>
      <div className="container mt-5">
        <h1>Todo List</h1>
        <Route path="/" exact>
          <TodoForm onTodoAdded={handleTodoAdded} />
          <TodoList
            todos={todos}
            onTodoDeleted={handleTodoDeleted}
            onTodoUpdated={handleTodoUpdated}
          />
        </Route>
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
      </div>
    </Router>
  );
}

export default App;
