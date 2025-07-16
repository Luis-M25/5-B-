export class CreateLugarturisticoDto {
  nombre: string;
  descripcion: string;
  ubicacion: string;
  latitud: number;
  longitud: number;
  categoria: string;
  precioPromedio: number;
  imagenUrl?: string;
  horarios?: string;
  contacto?: string;
  activo?: boolean;
}
