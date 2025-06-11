"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatasourceConfig = exports.DatasourceType = void 0;
const todo_datasource_impl_1 = require("./todo.datasource.impl");
const todo_typeorm_datasource_impl_1 = require("./todo.typeorm.datasource.impl");
const todo_memory_datasource_impl_1 = require("./todo.memory.datasource.impl");
var DatasourceType;
(function (DatasourceType) {
    DatasourceType["PRISMA"] = "prisma";
    DatasourceType["TYPEORM"] = "typeorm";
    DatasourceType["MEMORY"] = "memory";
})(DatasourceType || (exports.DatasourceType = DatasourceType = {}));
// Datos de ejemplo para inicializar el datasource de memoria
const SAMPLE_TODOS = [
    {
        id: 1,
        text: 'Completar el proyecto de arquitectura limpia',
        completedAt: null
    },
    {
        id: 2,
        text: 'Implementar tests unitarios',
        completedAt: new Date('2024-01-15')
    },
    {
        id: 3,
        text: 'Documentar la API',
        completedAt: null
    },
    {
        id: 4,
        text: 'Revisar el código con el equipo',
        completedAt: new Date('2024-01-10')
    }
];
class DatasourceConfig {
    static getDatasource(type = DatasourceType.PRISMA) {
        if (!this.instance) {
            this.instance = this.createDatasource(type);
        }
        return this.instance;
    }
    static setDatasource(type) {
        this.instance = this.createDatasource(type);
    }
    /**
     * Crea un nuevo datasource de memoria con datos opcionales
     */
    static createMemoryDatasource(initialData) {
        return new todo_memory_datasource_impl_1.TodoMemoryDatasourceImpl(initialData || SAMPLE_TODOS);
    }
    /**
     * Crea un datasource de memoria vacío
     */
    static createEmptyMemoryDatasource() {
        return new todo_memory_datasource_impl_1.TodoMemoryDatasourceImpl([]);
    }
    static createDatasource(type) {
        switch (type) {
            case DatasourceType.TYPEORM:
                return new todo_typeorm_datasource_impl_1.TodoTypeOrmDatasourceImpl();
            case DatasourceType.MEMORY:
                return this.createMemoryDatasource();
            case DatasourceType.PRISMA:
            default:
                return new todo_datasource_impl_1.TodoDatasourceImpl();
        }
    }
    /**
     * Obtiene el tipo de datasource actual
     */
    static getCurrentDatasourceType() {
        if (this.instance instanceof todo_memory_datasource_impl_1.TodoMemoryDatasourceImpl) {
            return 'MEMORY';
        }
        else if (this.instance instanceof todo_typeorm_datasource_impl_1.TodoTypeOrmDatasourceImpl) {
            return 'TYPEORM';
        }
        else {
            return 'PRISMA';
        }
    }
}
exports.DatasourceConfig = DatasourceConfig;
