export class CreateTemporadaDto {
  nombre: string;
  descripcion?: string;
  fechaInicio: Date;
  fechaFin: Date;
  multiplicadorPrecio: number;
  activo?: boolean;
}
