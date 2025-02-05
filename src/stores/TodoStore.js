// src/stores/TodoStore.js
import { observable, action, computed, makeObservable } from "mobx";

class TodoStore {
    todos = [];
    filter = "all";

    constructor() {
        makeObservable(this, {
            todos: observable,
            filter: observable,
            addTodo: action,
            removeTodo: action,
            toggleTodoCompletion: action,
            editTodo: action,
            filteredTodos: computed
        });
        this.loadTodos(); // Загрузка из локального хранилища при инициализации
    }

    loadTodos() {
        const storedTodos = localStorage.getItem('todos');
        if (storedTodos) {
            this.todos = JSON.parse(storedTodos);
        }
    }

    saveTodos() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    addTodo(text) {
        this.todos.push({ text, completed: false });
        this.saveTodos();
    }

    removeTodo(index) {
        this.todos.splice(index, 1);
        this.saveTodos();
    }

    toggleTodoCompletion(index) {
        this.todos[index].completed = !this.todos[index].completed;
        this.saveTodos();
    }

    editTodo(index, newText) {
        if (newText.trim()) {
            this.todos[index].text = newText;
            this.saveTodos();
        }
    }

    get filteredTodos() {
        switch (this.filter) {
            case "active":
                return this.todos.filter((todo) => !todo.completed);
            case "completed":
                return this.todos.filter((todo) => todo.completed);
            default:
                return this.todos;
        }
    }

    setFilter(filter) {
        this.filter = filter;
    }
}

export default new TodoStore(); // Экспорт единственного экземпляра
