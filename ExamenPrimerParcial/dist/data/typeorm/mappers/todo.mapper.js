"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var TodoTypeOrm_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoTypeOrm = void 0;
const typeorm_1 = require("typeorm");
const todo_entity_1 = require("../../../domain/entities/todo.entity");
let TodoTypeOrm = TodoTypeOrm_1 = class TodoTypeOrm {
    constructor() {
        this.completedAt = null;
    }
    // Método para convertir de TypeORM a Entidad de Dominio
    toDomain() {
        return todo_entity_1.TodoEntity.fromObject({
            id: this.id,
            text: this.text,
            completedAt: this.completedAt
        });
    }
    // Método para convertir de Entidad de Dominio a TypeORM
    static fromDomain(todo) {
        const todoTypeOrm = new TodoTypeOrm_1();
        todoTypeOrm.id = todo.id;
        todoTypeOrm.text = todo.text;
        todoTypeOrm.completedAt = todo.completedAt || null;
        return todoTypeOrm;
    }
};
exports.TodoTypeOrm = TodoTypeOrm;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], TodoTypeOrm.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar'),
    __metadata("design:type", String)
], TodoTypeOrm.prototype, "text", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp', { nullable: true }),
    __metadata("design:type", Object)
], TodoTypeOrm.prototype, "completedAt", void 0);
exports.TodoTypeOrm = TodoTypeOrm = TodoTypeOrm_1 = __decorate([
    (0, typeorm_1.Entity)('todo')
], TodoTypeOrm);
