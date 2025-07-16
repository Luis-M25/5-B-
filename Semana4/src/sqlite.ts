import { DataSource } from "typeorm";
import { Usuario } from "./modelos/Usuario";
import "reflect-metadata";
import { vista } from "./modelos/vista";

export const appdatasource = new DataSource({
    type: "sqlite",
    database: "db.sqlite",
    entities: [Usuario, vista],
    synchronize: true,
    logging: true,
    migrations: [],
});