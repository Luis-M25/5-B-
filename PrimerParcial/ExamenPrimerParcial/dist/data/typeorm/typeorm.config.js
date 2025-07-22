"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeTypeORM = exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const dotenv_1 = require("dotenv");
const todo_mapper_1 = require("./mappers/todo.mapper");
(0, dotenv_1.config)(); // Carga las variables de entorno
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    url: process.env.POSTGRES_URL,
    synchronize: false,
    logging: process.env.NODE_ENV === 'development',
    entities: [todo_mapper_1.TodoTypeOrm],
    migrations: ['src/data/typeorm/migrations/**/*.ts'],
    subscribers: ['src/data/typeorm/subscribers/**/*.ts'],
});
// Para inicializar la conexión
const initializeTypeORM = async () => {
    try {
        await exports.AppDataSource.initialize();
        console.log('Data Source has been initialized!');
    }
    catch (error) {
        console.error('Error during Data Source initialization:', error);
        throw error;
    }
};
exports.initializeTypeORM = initializeTypeORM;
