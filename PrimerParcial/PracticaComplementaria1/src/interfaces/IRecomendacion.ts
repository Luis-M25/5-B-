//Interfaz recomendacion
import { IDestino } from "./IDestino";

export interface IRecomendacion {
  usuarioId: number;
  destinosRecomendados: IDestino[];
}
