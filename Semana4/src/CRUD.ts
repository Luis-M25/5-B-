import { Usuario } from "./modelos/Usuario";
import { appdatasource } from "./sqlite";
import { vista } from "./modelos/vista";

const  insert = async (nombre: string, correo: string ) => {
    const usuarionuevo = new Usuario();
    usuarionuevo.nombre = nombre;
    usuarionuevo.correo = correo;

    return await appdatasource.manager.save(usuarionuevo); 
}
const consultar = async () => {
    return await appdatasource.manager.find(Usuario)
}
const consultar1 = async (id: number) => {
    return await appdatasource.manager.findOne(Usuario, { where: { id } })
}
const  modificar = async (id: number, nombre: string, correo: string ) => {
    const usuarioencontrado = await consultar1(id);
    if (usuarioencontrado) {
        usuarioencontrado.nombre = nombre;
        usuarioencontrado.correo = correo;
        return await appdatasource.manager.save(usuarioencontrado);
    }
    return null;    
}
const eliminar = async (id: number) => {
    const usuarioencontrado = await consultar1(id);
    if (usuarioencontrado) {
        return await appdatasource.manager.remove(usuarioencontrado);
    }
    return null;
}
const insertarvista = async (nombre: string, idusuario: number) => {
    const usuarioencontrado = await consultar1(idusuario);
    if (usuarioencontrado) {
        const vistanueva = new vista();
        vistanueva.nombre = nombre;
        vistanueva.Usuario = usuarioencontrado;
        return await appdatasource.manager.save(vistanueva);
    }
}
const eliminarvista = async (id: number) => {
    const vistaencontrada = await appdatasource.manager.findOne(vista, { where: { id } });
    if (vistaencontrada) {
        return await appdatasource.manager.remove(vistaencontrada);
    }
    return null;
}
export{
    insert, consultar, consultar1, modificar, eliminar, insertarvista, eliminarvista
}