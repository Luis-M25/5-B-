import { IsString, IsOptional, IsDateString, IsNumber, IsIn, Min, Max, MaxLength, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTemporadaDto {
  @IsString({ message: 'El nombre debe ser un texto válido' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @MaxLength(100, { message: 'El nombre no puede exceder 100 caracteres' })
  nombre: string;

  @IsOptional()
  @IsString({ message: 'La descripción debe ser un texto válido' })
  @MaxLength(1000, { message: 'La descripción no puede exceder 1000 caracteres' })
  descripcion?: string;

  @IsDateString({}, { message: 'La fecha de inicio debe tener un formato válido (YYYY-MM-DD)' })
  @IsNotEmpty({ message: 'La fecha de inicio es obligatoria' })
  fechaInicio: string;

  @IsDateString({}, { message: 'La fecha de fin debe tener un formato válido (YYYY-MM-DD)' })
  @IsNotEmpty({ message: 'La fecha de fin es obligatoria' })
  fechaFin: string;

  @IsString({ message: 'El tipo debe ser un texto válido' })
  @IsNotEmpty({ message: 'El tipo es obligatorio' })
  @IsIn(['alta', 'media', 'baja', 'especial'], { 
    message: 'El tipo debe ser: alta, media, baja o especial' 
  })
  tipo: string;

  @IsOptional()
  @IsNumber({}, { message: 'El factor de precio debe ser un número válido' })
  @Min(0.1, { message: 'El factor de precio mínimo es 0.1' })
  @Max(10, { message: 'El factor de precio máximo es 10' })
  @Type(() => Number)
  factorPrecio?: number;

  @IsOptional()
  @IsString()
  @IsIn(['activa', 'inactiva', 'programada'], { 
    message: 'El estado debe ser: activa, inactiva o programada' 
  })
  estado?: string;

  @IsOptional()
  @IsNumber({}, { message: 'La popularidad debe ser un número válido' })
  @Min(0, { message: 'La popularidad mínima es 0' })
  @Max(100, { message: 'La popularidad máxima es 100' })
  @Type(() => Number)
  popularidad?: number;

  @IsOptional()
  @IsString()
  @MaxLength(100, { message: 'La descripción del clima no puede exceder 100 caracteres' })
  clima?: string;
}
