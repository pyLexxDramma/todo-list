// src/components/TodoList.js
import React, { useState } from "react";
import { observer } from "mobx-react";
import './TodoList.css';

const TodoList = observer(({ todoStore }) => { // todoStore теперь prop
    const [newTodo, setNewTodo] = useState("");
    const [editIndex, setEditIndex] = useState(-1);
    const [editText, setEditText] = useState("");

    const handleAddTodo = () => {
        if (newTodo.trim()) {
            todoStore.addTodo(newTodo);
            setNewTodo("");
        }
    };

    const handleEditTodo = (index, text) => {
        setEditIndex(index);
        setEditText(text);
    };

    const handleSaveEdit = (index) => {
        todoStore.editTodo(index, editText);
        setEditIndex(-1);
        setEditText("");
    };

    return (
        <div className="todo-container">
            <h1>To-Do List</h1>
            <div>
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Добавьте новую задачу"
                />
                <button onClick={handleAddTodo}>Добавить</button>
            </div>
            <h2>Активные задачи: {todoStore.todos.filter(todo => !todo.completed).length}</h2>
            <div>
                <button onClick={() => todoStore.setFilter("all")} className={todoStore.filter === "all" ? "active" : ""}>Все</button>
                <button onClick={() => todoStore.setFilter("active")} className={todoStore.filter === "active" ? "active" : ""}>Активные</button>
                <button onClick={() => todoStore.setFilter("completed")} className={todoStore.filter === "completed" ? "active" : ""}>Выполненные</button>
            </div>
            <ul>
                {todoStore.filteredTodos.map((todo, index) => (
                    <li key={index} className={todo.completed ? "completed" : ""}>
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => todoStore.toggleTodoCompletion(index)}
                        />
                        {todo.editing ? (
                            <input
                                type="text"
                                value={todo.text}
                                onChange={e => todoStore.editTodo(index, e.target.value)}
                                onBlur={() => todoStore.setEditing(index, false)}
                            />
                        ) : (
                            <>
                                {todo.text}
                                <button onClick={() => todoStore.setEditing(index, true)}>Редактировать</button>
                                <button onClick={() => todoStore.removeTodo(index)}>Удалить</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
});

export default TodoList;