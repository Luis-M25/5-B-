"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoDatasourceImpl = void 0;
const postgres_1 = require("../../data/postgres");
const domain_1 = require("../../domain");
class TodoDatasourceImpl {
    async create(createTodoDto) {
        const todo = await postgres_1.prisma.todo.create({
            data: createTodoDto
        });
        return domain_1.TodoEntity.fromObject(todo);
    }
    async getAll() {
        const todos = await postgres_1.prisma.todo.findMany();
        return todos.map(todo => domain_1.TodoEntity.fromObject(todo));
    }
    async findById(id) {
        const todo = await postgres_1.prisma.todo.findFirst({
            where: { id }
        });
        if (!todo)
            throw `Todo with id ${id} not found`;
        return domain_1.TodoEntity.fromObject(todo);
    }
    async updateById(updateTodoDto) {
        await this.findById(updateTodoDto.id);
        const updatedTodo = await postgres_1.prisma.todo.update({
            where: { id: updateTodoDto.id },
            data: updateTodoDto.values
        });
        return domain_1.TodoEntity.fromObject(updatedTodo);
    }
    async deleteById(id) {
        await this.findById(id);
        const deleted = await postgres_1.prisma.todo.delete({
            where: { id }
        });
        return domain_1.TodoEntity.fromObject(deleted);
    }
}
exports.TodoDatasourceImpl = TodoDatasourceImpl;
