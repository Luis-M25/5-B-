"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoMemoryDatasourceImpl = void 0;
const domain_1 = require("../../domain");
class TodoMemoryDatasourceImpl {
    constructor(initialTodos = []) {
        // Arreglo en memoria para almacenar los todos
        this.todos = [];
        this.nextId = 1;
        // Permitir inicializar con datos predeterminados
        this.todos = [...initialTodos];
        // Calcular el siguiente ID basado en los datos existentes
        if (this.todos.length > 0) {
            this.nextId = Math.max(...this.todos.map(todo => todo.id)) + 1;
        }
    }
    async create(createTodoDto) {
        const newTodo = {
            id: this.nextId++,
            text: createTodoDto.text,
            completedAt: null
        };
        this.todos.push(newTodo);
        return domain_1.TodoEntity.fromObject(newTodo);
    }
    async getAll() {
        return this.todos.map(todo => domain_1.TodoEntity.fromObject(todo));
    }
    async findById(id) {
        const todo = this.todos.find(t => t.id === id);
        if (!todo)
            throw `Todo with id ${id} not found`;
        return domain_1.TodoEntity.fromObject(todo);
    }
    async updateById(updateTodoDto) {
        const todoIndex = this.todos.findIndex(t => t.id === updateTodoDto.id);
        if (todoIndex === -1)
            throw `Todo with id ${updateTodoDto.id} not found`;
        // Actualizar solo los campos que vienen en values
        const currentTodo = this.todos[todoIndex];
        const updatedTodo = {
            ...currentTodo,
            ...updateTodoDto.values
        };
        this.todos[todoIndex] = updatedTodo;
        return domain_1.TodoEntity.fromObject(updatedTodo);
    }
    async deleteById(id) {
        const todoIndex = this.todos.findIndex(t => t.id === id);
        if (todoIndex === -1)
            throw `Todo with id ${id} not found`;
        const deletedTodo = this.todos[todoIndex];
        this.todos.splice(todoIndex, 1);
        return domain_1.TodoEntity.fromObject(deletedTodo);
    }
    // Métodos adicionales para gestión de datos en memoria
    /**
     * Obtiene todos los datos como objetos literales (útil para debugging/testing)
     */
    getRawData() {
        return [...this.todos];
    }
    /**
     * Limpia todos los datos en memoria
     */
    clear() {
        this.todos = [];
        this.nextId = 1;
    }
    /**
     * Importa datos desde un arreglo de objetos literales
     */
    importData(data) {
        this.todos = [...data];
        if (this.todos.length > 0) {
            this.nextId = Math.max(...this.todos.map(todo => todo.id)) + 1;
        }
        else {
            this.nextId = 1;
        }
    }
    /**
     * Exporta los datos actuales como JSON
     */
    exportToJSON() {
        return JSON.stringify(this.todos, null, 2);
    }
    /**
     * Importa datos desde JSON
     */
    importFromJSON(jsonData) {
        try {
            const data = JSON.parse(jsonData);
            if (Array.isArray(data)) {
                this.importData(data);
            }
            else {
                throw new Error('JSON data must be an array of todos');
            }
        }
        catch (error) {
            throw new Error(`Invalid JSON format: ${error}`);
        }
    }
}
exports.TodoMemoryDatasourceImpl = TodoMemoryDatasourceImpl;
