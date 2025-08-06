import { IsNotEmpty, IsString, IsEnum, IsOptional, IsNumber } from 'class-validator';

export class GetSurtidoresDto {
  @IsOptional()
  @IsEnum(['disponible', 'ocupado', 'mantenimiento', 'fuera_servicio'])
  estado?: 'disponible' | 'ocupado' | 'mantenimiento' | 'fuera_servicio';

  @IsOptional()
  @IsString()
  ubicacion?: string;

  @IsOptional()
  @IsString()
  tipoGasolina?: string;

  @IsOptional()
  @IsNumber()
  capacidadMinima?: number;
}

export class SurtidorResponseDto {
  id: string;
  numero: number;
  nombre: string;
  estado: 'disponible' | 'ocupado' | 'mantenimiento' | 'fuera_servicio';
  ubicacion: string;
  capacidadMaxima: number;
  combustibleActual: number;
  tiposGasolinaDisponibles: string[];
  disponibleParaVenta: boolean;
  porcentajeLlenado: number;
}

export class SurtidorDetalleDto extends SurtidorResponseDto {
  ventasHoy: number;
  litrosVendidosHoy: number;
  ultimaVenta?: Date;
  ultimoMantenimiento?: Date;
  proximoMantenimiento?: Date;
}

export class AsignarSurtidorDto {
  @IsNotEmpty()
  @IsString()
  surtidorId: string;

  @IsNotEmpty()
  @IsString()
  operadorId: string;
}

export class LiberarSurtidorDto {
  @IsNotEmpty()
  @IsString()
  surtidorId: string;

  @IsOptional()
  @IsString()
  motivo?: string;
}
