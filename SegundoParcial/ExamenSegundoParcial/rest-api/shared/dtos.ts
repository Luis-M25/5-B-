import { IsString, IsNotEmpty, IsEmail, IsOptional, IsNumber, IsBoolean, IsEnum, IsDateString, Min, Max, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

// ========== OPERADOR DTOs ==========
export class CreateOperadorDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  cedula: string;

  @IsEnum(['activo', 'inactivo', 'suspendido'])
  estado: 'activo' | 'inactivo' | 'suspendido';

  @IsDateString()
  fechaIngreso: string;

  @IsEnum(['mañana', 'tarde', 'noche'])
  turno: 'mañana' | 'tarde' | 'noche';
}

export class UpdateOperadorDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  cedula?: string;

  @IsOptional()
  @IsEnum(['activo', 'inactivo', 'suspendido'])
  estado?: 'activo' | 'inactivo' | 'suspendido';

  @IsOptional()
  @IsEnum(['mañana', 'tarde', 'noche'])
  turno?: 'mañana' | 'tarde' | 'noche';
}

// ========== SURTIDOR DTOs ==========
export class CreateSurtidorDto {
  @IsNumber()
  numero: number;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsEnum(['disponible', 'ocupado', 'mantenimiento', 'fuera_servicio'])
  estado: 'disponible' | 'ocupado' | 'mantenimiento' | 'fuera_servicio';

  @IsString()
  @IsNotEmpty()
  ubicacion: string;

  @IsNumber()
  @Min(0)
  capacidadMaxima: number;

  @IsNumber()
  @Min(0)
  combustibleActual: number;

  @IsArray()
  @IsString({ each: true })
  tiposGasolinaDisponibles: string[];
}

export class UpdateSurtidorDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsEnum(['disponible', 'ocupado', 'mantenimiento', 'fuera_servicio'])
  estado?: 'disponible' | 'ocupado' | 'mantenimiento' | 'fuera_servicio';

  @IsOptional()
  @IsString()
  ubicacion?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  capacidadMaxima?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  combustibleActual?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tiposGasolinaDisponibles?: string[];
}

// ========== TIPO GASOLINA DTOs ==========
export class CreateTipoGasolinaDto {
  @IsString()
  @IsNotEmpty()
  tipo: string;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsNumber()
  @Min(0)
  octanaje: number;

  @IsBoolean()
  disponible: boolean;

  @IsNumber()
  @Min(0)
  stock: number;
}

export class UpdateTipoGasolinaDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  octanaje?: number;

  @IsOptional()
  @IsBoolean()
  disponible?: boolean;

  @IsOptional()
  @IsNumber()
  @Min(0)
  stock?: number;
}

// ========== PRECIO DTOs ==========
export class CreatePrecioDto {
  @IsString()
  @IsNotEmpty()
  tipoGasolina: string;

  @IsNumber()
  @Min(0)
  precioLitro: number;

  @IsBoolean()
  activo: boolean;
}

export class UpdatePrecioDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  precioLitro?: number;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}

// ========== FORMA PAGO DTOs ==========
export class CreateFormaPagoDto {
  @IsString()
  @IsNotEmpty()
  tipo: string;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsBoolean()
  activo: boolean;

  @IsBoolean()
  requiereAutorizacion: boolean;
}

export class UpdateFormaPagoDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;

  @IsOptional()
  @IsBoolean()
  requiereAutorizacion?: boolean;
}

// ========== CLIENTE DTOs ==========
export class CreateClienteDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  cedula: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  direccion?: string;

  @IsEnum(['nuevo', 'frecuente', 'vip'])
  tipoCliente: 'nuevo' | 'frecuente' | 'vip';
}

export class UpdateClienteDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  cedula?: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  direccion?: string;

  @IsOptional()
  @IsEnum(['nuevo', 'frecuente', 'vip'])
  tipoCliente?: 'nuevo' | 'frecuente' | 'vip';
}

// ========== VENTA DTOs ==========
export class CreateVentaDto {
  @IsString()
  @IsNotEmpty()
  operadorId: string;

  @IsString()
  @IsNotEmpty()
  surtidorId: string;

  @IsOptional()
  @IsString()
  clienteId?: string;

  @IsString()
  @IsNotEmpty()
  tipoGasolina: string;

  @IsNumber()
  @Min(0.01)
  litros: number;

  @IsString()
  @IsNotEmpty()
  formaPago: string;
}

export class UpdateVentaDto {
  @IsOptional()
  @IsEnum(['pendiente', 'procesando', 'completada', 'cancelada', 'error'])
  estado?: 'pendiente' | 'procesando' | 'completada' | 'cancelada' | 'error';
}

// ========== CÁLCULO COSTO DTOs ==========
export class CalcularCostoDto {
  @IsString()
  @IsNotEmpty()
  tipoGasolina: string;

  @IsNumber()
  @Min(0.01)
  litros: number;
}

export class CalcularCostoResponseDto {
  tipoGasolina: string;
  litros: number;
  precioLitro: number;
  subtotal: number;
  impuestos: number;
  descuentos: number;
  total: number;
}

// ========== QUERY DTOs ==========
export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number = 10;
}

export class VentaFilterDto extends PaginationDto {
  @IsOptional()
  @IsString()
  operadorId?: string;

  @IsOptional()
  @IsString()
  surtidorId?: string;

  @IsOptional()
  @IsString()
  clienteId?: string;

  @IsOptional()
  @IsString()
  tipoGasolina?: string;

  @IsOptional()
  @IsString()
  formaPago?: string;

  @IsOptional()
  @IsEnum(['pendiente', 'procesando', 'completada', 'cancelada', 'error'])
  estado?: string;

  @IsOptional()
  @IsDateString()
  fechaDesde?: string;

  @IsOptional()
  @IsDateString()
  fechaHasta?: string;
}

export class SurtidorFilterDto extends PaginationDto {
  @IsOptional()
  @IsEnum(['disponible', 'ocupado', 'mantenimiento', 'fuera_servicio'])
  estado?: string;

  @IsOptional()
  @IsString()
  ubicacion?: string;

  @IsOptional()
  @IsString()
  tipoGasolina?: string;
}
