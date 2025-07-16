import { eliminarvista, insert } from "./CRUD";
import { inicializar } from "./db";
import { consultar, consultar1, modificar, eliminar, insertarvista } from "./CRUD";


async function main (){
    await inicializar()
    const usuarionuevo = await insert("Juan", "juan@gmail.com");
    console.log(usuarionuevo)
    const usuarios = await consultar();
    console.log(usuarios)
    const usuario1 = await consultar1(usuarionuevo.id);
    console.log(usuario1)
    const usuariomodificado = await modificar(usuarionuevo.id, "Juanito", "juanito@gmail.com");
    console.log(usuariomodificado)
    const vistanueva= await insertarvista("Vista1", usuarionuevo.id);
    console.log(vistanueva)
    const vistaeliminada = await eliminarvista(vistanueva!.id);
    console.log(vistaeliminada)
    const usuarioeliminado = await eliminar(usuarionuevo.id);
    console.log(usuarioeliminado)
}

main()