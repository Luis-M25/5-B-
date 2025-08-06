import { appdatasource } from "./sqlite";

export const inicializar = async () => {
    try {
        await appdatasource.initialize();
        console.log("inicializado");
        return appdatasource
    }catch (error) {
        console.log("Error al inicializar la base de datos", error);
    }
}