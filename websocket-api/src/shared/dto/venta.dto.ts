import { IsNotEmpty, IsString, IsNumber, IsOptional, IsEmail, IsEnum } from 'class-validator';

export class FormaPagoDto {
  @IsNotEmpty()
  @IsString()
  tipo: string;

  @IsNotEmpty()
  @IsString()
  nombre: string;

  activo: boolean;
  requiereAutorizacion: boolean;
}

export class ClienteDto {
  id?: string;

  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
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

  fechaRegistro?: Date;
}

export class ProcesarVentaDto {
  @IsNotEmpty()
  @IsString()
  operadorId: string;

  @IsNotEmpty()
  @IsString()
  surtidorId: string;

  @IsOptional()
  @IsString()
  clienteId?: string;

  @IsNotEmpty()
  @IsString()
  tipoGasolina: string;

  @IsNotEmpty()
  @IsNumber()
  litros: number;

  @IsNotEmpty()
  @IsNumber()
  precioLitro: number;

  @IsNotEmpty()
  @IsNumber()
  montoTotal: number;

  @IsNotEmpty()
  @IsString()
  formaPago: string;
}

export class VentaEnProcesoDto {
  id: string;
  operadorId: string;
  surtidorId: string;
  clienteId?: string;
  tipoGasolina: string;
  litros: number;
  precioLitro: number;
  montoTotal: number;
  formaPago: string;
  estado: 'pendiente' | 'procesando' | 'completada' | 'cancelada' | 'error';
  fechaInicio: Date;
  progreso: number; // 0-100
  tiempoEstimado: number; // segundos
  numeroRecibo?: string;
}

export class RegistrarClienteDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
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

  @IsOptional()
  @IsEnum(['nuevo', 'frecuente', 'vip'])
  tipoCliente?: 'nuevo' | 'frecuente' | 'vip';
}

export class BuscarClienteDto {
  @IsOptional()
  @IsString()
  cedula?: string;

  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  telefono?: string;
}
