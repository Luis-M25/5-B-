import { obtenerPreferencias } from './preferencia.service';
import { filtrarDestinos } from '../utils/filtrarDestino';
import { IRecomendacion } from '../interfaces/IRecomendacion';
//Async/Await
export async function generarRecomendaciones(usuarioId: number): Promise<IRecomendacion> {
  const preferencias = await obtenerPreferencias(usuarioId);
  //Operadores Spread y Rest
  //Promise
  return new Promise(resolve => {
    filtrarDestinos(preferencias, (destinosFiltrados) => {
      const recomendacion: IRecomendacion = {
        usuarioId: preferencias.usuarioId,
        destinosRecomendados: [...destinosFiltrados],
      };
      resolve(recomendacion);
    });
  });
}
