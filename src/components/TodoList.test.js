import React from 'react';
import { render, screen } from '@testing-library/react';
import TodoList from './TodoList';
import { observable } from 'mobx';

// Имитация TodoStore
const mockTodoStore = {
    todos: observable([{ text: 'Задача 1', completed: false, editing: false }, { text: 'Задача 2', completed: true, editing: false }]),
    filteredTodos: observable([{ text: 'Задача 1', completed: false, editing: false }, { text: 'Задача 2', completed: true, editing: false }]),
    addTodo: jest.fn(),
    removeTodo: jest.fn(),
    toggleTodoCompletion: jest.fn(),
    editTodo: jest.fn((index, newText) => { mockTodoStore.todos[index].text = newText; }),
    setEditing: jest.fn((index, editing) => { mockTodoStore.todos[index].editing = editing; }),
    setFilter: jest.fn(),
};

describe('TodoList', () => {
    test('должен отображать список задач', () => {
        render(<TodoList todoStore={mockTodoStore} />);
        expect(screen.getByText('Задача 1')).toBeInTheDocument();
        expect(screen.getByText('Задача 2')).toBeInTheDocument();
    });

    test('должен добавлять новую задачу', () => {
        render(<TodoList todoStore={mockTodoStore} />);
        const input = screen.getByPlaceholderText('Добавьте новую задачу');
        const button = screen.getByText('Добавить');
        fireEvent.change(input, { target: { value: 'Новая задача' } });
        fireEvent.click(button);
        expect(mockTodoStore.addTodo).toHaveBeenCalledWith('Новая задача');
    });

    // ... другие тесты ...
});
