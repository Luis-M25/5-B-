import { IsString, IsOptional, IsDateString, IsInt, Min, MaxLength, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateBusquedaDto {
  @IsString({ message: 'El término de búsqueda debe ser un texto válido' })
  @IsNotEmpty({ message: 'El término de búsqueda es obligatorio' })
  @MaxLength(255, { message: 'El término de búsqueda no puede exceder 255 caracteres' })
  termino: string;

  @IsString({ message: 'La ubicación debe ser un texto válido' })
  @IsNotEmpty({ message: 'La ubicación es obligatoria' })
  @MaxLength(100, { message: 'La ubicación no puede exceder 100 caracteres' })
  ubicacion: string;

  @IsString({ message: 'La categoría debe ser un texto válido' })
  @IsNotEmpty({ message: 'La categoría es obligatoria' })
  @MaxLength(50, { message: 'La categoría no puede exceder 50 caracteres' })
  categoria: string;

  @IsOptional()
  @IsDateString({}, { message: 'La fecha de inicio debe tener un formato válido' })
  fechaInicio?: string;

  @IsOptional()
  @IsDateString({}, { message: 'La fecha de fin debe tener un formato válido' })
  fechaFin?: string;

  @IsOptional()
  @IsInt({ message: 'El número de resultados debe ser un entero' })
  @Min(0, { message: 'El número de resultados no puede ser negativo' })
  @Type(() => Number)
  resultados?: number;
}
