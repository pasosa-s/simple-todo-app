import React, { useEffect, useState, useCallback } from 'react';

function App() {

  const [todoList, setTodoList] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    console.log('todos', todoList);
  }, [todoList]);

  const handleInputChange = useCallback((e => {
    setNewTodo(e.target.value);
  }), []);

  const handleSubmit = useCallback((e => {
    e.preventDefault();
    if(!newTodo.trim()) return;
    setTodoList([
      ...todoList, {
        id: todoList.length + 1,
        content: newTodo,
        done: false
      }
    ])
    setNewTodo("");
  }), [newTodo, todoList]);

  const handleCheckbox = useCallback((todo, index) => e => {
    const newTodoList = [...todoList];
    newTodoList.splice(index, 1, {
      ...todo,
      done: !todo.done
    })
    setTodoList(newTodoList);
  }, [todoList]);

  const handleMarkAll = useCallback(() => {
    const newTodoList = todoList.map(todo => {
      todo.done = true;
      return todo;
    })
    setTodoList(newTodoList);
  }, [todoList]);

  const handleRemoveTodo = useCallback((toRemove) => e => {
    const newTodoList = todoList.filter(todo => todo !== toRemove);
    setTodoList(newTodoList);
  }, [todoList]);

  const setColorRed = (todo) => {
    const style = {backgroundColor: "#008744"}
    if(todo.done) {
      style.backgroundColor = "#d62d20"
    }
    return style
  }

  return (
    <div className="App">
      <h1 className="title">ToDo.</h1>
      <form className="form-container" onSubmit={handleSubmit}>
        <input 
          type="text" 
          className="input"
          value={newTodo}
          onChange={handleInputChange}
        />
        <button>Add TODO</button>
      </form>
      <button className="markall-button" onClick={handleMarkAll}>Mark all done</button>
      <div className="todo-container">
        {todoList.map((todo, index) => 
        <div key={todo.id} className="todo-item" style={setColorRed(todo)}>
          <input 
            className="todo-checkbox" 
            type="checkbox"
            checked={todo.done}
            onChange={handleCheckbox(todo, index)}
          />
         <span className={todo.done ? "done" : ""}>{todo.content}</span>
          <button className="todo-button" onClick={handleRemoveTodo(todo)}>x</button>
        </div>)}
      </div>
    </div>
  );
}

export default App;
