export class CreateBusquedaDto {
  terminoBusqueda: string;
  categoria?: string;
  latitudBusqueda?: number;
  longitudBusqueda?: number;
  radioKm?: number;
  usuarioIp?: string;
  cantidadResultados?: number;
  lugarTuristicoId?: number;
}
