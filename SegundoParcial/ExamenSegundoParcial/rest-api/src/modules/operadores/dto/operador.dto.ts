import { IsNotEmpty, IsString, IsEnum, IsOptional } from 'class-validator';

export class GetOperadoresDto {
  @IsOptional()
  @IsEnum(['activo', 'inactivo', 'suspendido'])
  estado?: 'activo' | 'inactivo' | 'suspendido';

  @IsOptional()
  @IsEnum(['mañana', 'tarde', 'noche'])
  turno?: 'mañana' | 'tarde' | 'noche';
}

export class OperadorResponseDto {
  id: string;
  nombre: string;
  cedula: string;
  estado: 'activo' | 'inactivo' | 'suspendido';
  fechaIngreso: Date;
  turno: 'mañana' | 'tarde' | 'noche';
  disponible: boolean;
}

export class OperadorDetalleDto extends OperadorResponseDto {
  ventasHoy: number;
  montoVendidoHoy: number;
  ultimaVenta?: Date;
}
