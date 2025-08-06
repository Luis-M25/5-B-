//Filtrar Destino por Pais 
import { IDestino } from "../interfaces/IDestino";
import { destinos } from "../data/destino";
import { IPreferencias } from "../interfaces/IPreferencias";

export function filtrarDestinos(
  preferencias: IPreferencias,
  //Callback
  callback: (destinos: IDestino[]) => void
): void {
  const recomendados = destinos.filter(dest =>
    dest.actividades.some(act => preferencias.gustos.includes(act))
  );
  callback(recomendados);
}

