import TodoStore from './TodoStore'; // Импорт TodoStore

let store; // Объявление переменной для хранения экземпляра

beforeEach(() => {
  store = TodoStore; // Назначение существующего синглтона
  store.todos = []; // Инициализация пустого массива задач
  store.filter = 'all';
});

describe('TodoStore', () => {
    test('должен добавлять задачу', () => {
        const initialCount = store.todos.length;
        store.addTodo('Новая задача');
        expect(store.todos.length).toBe(initialCount + 1);
        expect(store.todos[0].text).toBe('Новая задача');
        expect(store.todos[0].completed).toBe(false);
    });

    test('должен удалять задачу', () => {
        store.todos = [{ text: 'Задача 1', completed: false }];
        const initialCount = store.todos.length;
        store.removeTodo(0);
        expect(store.todos.length).toBe(initialCount - 1);
    });

    test('должен переключать статус выполнения задачи', () => {
        store.todos = [{ text: 'Задача 1', completed: false }];
        store.toggleTodoCompletion(0);
        expect(store.todos[0].completed).toBe(true);
        store.toggleTodoCompletion(0);
        expect(store.todos[0].completed).toBe(false);
    });

    test('должен редактировать задачу', () => {
        store.todos = [{ text: 'Задача 1', completed: false }];
        store.editTodo(0, 'Измененная задача');
        expect(store.todos[0].text).toBe('Измененная задача');
    });

    test('фильтрация задач', () => {
        store.todos = [{ text: 'Задача 1', completed: false }, { text: 'Задача 2', completed: true }];
        store.setFilter('active');
        expect(store.filteredTodos.length).toBe(1);
        expect(store.filteredTodos[0].text).toBe('Задача 1');
        store.setFilter('completed');
        expect(store.filteredTodos.length).toBe(1);
        expect(store.filteredTodos[0].text).toBe('Задача 2');
        store.setFilter('all');
        expect(store.filteredTodos.length).toBe(2);
    });
});

