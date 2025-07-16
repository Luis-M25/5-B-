import { IsString, IsOptional, IsNumber, IsIn, Min, Max, MaxLength, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateLugarTurisitcoDto {
  @IsString({ message: 'El nombre debe ser un texto válido' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @MaxLength(255, { message: 'El nombre no puede exceder 255 caracteres' })
  nombre: string;

  @IsString({ message: 'La descripción debe ser un texto válido' })
  @IsNotEmpty({ message: 'La descripción es obligatoria' })
  @MaxLength(1000, { message: 'La descripción no puede exceder 1000 caracteres' })
  descripcion: string;

  @IsString({ message: 'La ubicación debe ser un texto válido' })
  @IsNotEmpty({ message: 'La ubicación es obligatoria' })
  @MaxLength(200, { message: 'La ubicación no puede exceder 200 caracteres' })
  ubicacion: string;

  @IsString({ message: 'La categoría debe ser un texto válido' })
  @IsNotEmpty({ message: 'La categoría es obligatoria' })
  @MaxLength(100, { message: 'La categoría no puede exceder 100 caracteres' })
  categoria: string;

  @IsNumber({}, { message: 'La latitud debe ser un número válido' })
  @Min(-90, { message: 'La latitud debe estar entre -90 y 90 grados' })
  @Max(90, { message: 'La latitud debe estar entre -90 y 90 grados' })
  @Type(() => Number)
  latitud: number;

  @IsNumber({}, { message: 'La longitud debe ser un número válido' })
  @Min(-180, { message: 'La longitud debe estar entre -180 y 180 grados' })
  @Max(180, { message: 'La longitud debe estar entre -180 y 180 grados' })
  @Type(() => Number)
  longitud: number;

  @IsOptional()
  @IsNumber({}, { message: 'El precio debe ser un número válido' })
  @Min(0, { message: 'El precio no puede ser negativo' })
  @Type(() => Number)
  precio?: number;

  @IsOptional()
  @IsString()
  @IsIn(['abierto', 'cerrado', 'mantenimiento'], { 
    message: 'El estado debe ser: abierto, cerrado o mantenimiento' 
  })
  estado?: string;

  @IsOptional()
  @IsNumber({}, { message: 'La valoración debe ser un número válido' })
  @Min(0, { message: 'La valoración mínima es 0' })
  @Max(5, { message: 'La valoración máxima es 5' })
  @Type(() => Number)
  valoracion?: number;
}
