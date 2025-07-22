"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoTypeOrmDatasourceImpl = void 0;
const typeorm_config_1 = require("../../data/typeorm/typeorm.config");
const todo_mapper_1 = require("../../data/typeorm/mappers/todo.mapper");
class TodoTypeOrmDatasourceImpl {
    constructor() {
        this.repository = typeorm_config_1.AppDataSource.getRepository(todo_mapper_1.TodoTypeOrm);
        // Asegurarnos de que la conexión esté inicializada
        if (!typeorm_config_1.AppDataSource.isInitialized) {
            typeorm_config_1.AppDataSource.initialize()
                .then(() => {
                console.log('TypeORM DataSource has been initialized!');
            })
                .catch((error) => {
                console.error('Error during TypeORM DataSource initialization:', error);
                throw error;
            });
        }
    }
    async create(createTodoDto) {
        // Esperar a que la conexión esté inicializada
        if (!typeorm_config_1.AppDataSource.isInitialized) {
            await typeorm_config_1.AppDataSource.initialize();
        }
        const todoTypeOrm = new todo_mapper_1.TodoTypeOrm();
        todoTypeOrm.text = createTodoDto.text;
        const todo = await this.repository.save(todoTypeOrm);
        return todo.toDomain();
    }
    async getAll() {
        // Esperar a que la conexión esté inicializada
        if (!typeorm_config_1.AppDataSource.isInitialized) {
            await typeorm_config_1.AppDataSource.initialize();
        }
        const todos = await this.repository.find();
        return todos.map(todo => todo.toDomain());
    }
    async findById(id) {
        // Esperar a que la conexión esté inicializada
        if (!typeorm_config_1.AppDataSource.isInitialized) {
            await typeorm_config_1.AppDataSource.initialize();
        }
        const todo = await this.repository.findOneBy({ id });
        if (!todo)
            throw `Todo with id ${id} not found`;
        return todo.toDomain();
    }
    async updateById(updateTodoDto) {
        // Esperar a que la conexión esté inicializada
        if (!typeorm_config_1.AppDataSource.isInitialized) {
            await typeorm_config_1.AppDataSource.initialize();
        }
        await this.findById(updateTodoDto.id);
        const todo = await this.repository.findOneBy({ id: updateTodoDto.id });
        if (!todo)
            throw `Todo with id ${updateTodoDto.id} not found`;
        // Actualizar solo los campos que vienen en values
        Object.assign(todo, updateTodoDto.values);
        const updatedTodo = await this.repository.save(todo);
        return updatedTodo.toDomain();
    }
    async deleteById(id) {
        // Esperar a que la conexión esté inicializada
        if (!typeorm_config_1.AppDataSource.isInitialized) {
            await typeorm_config_1.AppDataSource.initialize();
        }
        const todo = await this.findById(id);
        await this.repository.delete({ id });
        return todo;
    }
}
exports.TodoTypeOrmDatasourceImpl = TodoTypeOrmDatasourceImpl;
