// ========== INTERFACES BASE ==========
export interface BaseEntity {
  id: string;
  fechaCreacion?: Date;
  fechaActualizacion?: Date;
}

// ========== ENTIDADES ==========
export interface Operador extends BaseEntity {
  nombre: string;
  cedula: string;
  estado: 'activo' | 'inactivo' | 'suspendido';
  fechaIngreso: Date;
  turno: 'mañana' | 'tarde' | 'noche';
}

export interface Surtidor extends BaseEntity {
  numero: number;
  nombre: string;
  estado: 'disponible' | 'ocupado' | 'mantenimiento' | 'fuera_servicio';
  ubicacion: string;
  capacidadMaxima: number;
  combustibleActual: number;
  tiposGasolinaDisponibles: string[];
}

export interface TipoGasolina extends BaseEntity {
  tipo: string;
  nombre: string;
  octanaje: number;
  disponible: boolean;
  stock: number;
}

export interface Precio extends BaseEntity {
  tipoGasolina: string;
  precioLitro: number;
  fechaActualizacion: Date;
  activo: boolean;
}

export interface FormaPago extends BaseEntity {
  tipo: string;
  nombre: string;
  activo: boolean;
  requiereAutorizacion: boolean;
}

export interface Cliente extends BaseEntity {
  nombre: string;
  cedula: string;
  telefono?: string;
  email?: string;
  direccion?: string;
  fechaRegistro: Date;
  tipoCliente: 'nuevo' | 'frecuente' | 'vip';
}

export interface Venta extends BaseEntity {
  operadorId: string;
  surtidorId: string;
  clienteId?: string;
  tipoGasolina: string;
  litros: number;
  precioLitro: number;
  montoTotal: number;
  formaPago: string;
  fechaVenta: Date;
  estado: 'pendiente' | 'procesando' | 'completada' | 'cancelada' | 'error';
  numeroRecibo: string;
}

// ========== TIPOS DE RESPUESTA ==========
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  timestamp: Date;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ========== FILTROS Y CONSULTAS ==========
export interface VentaFilter {
  operadorId?: string;
  surtidorId?: string;
  clienteId?: string;
  tipoGasolina?: string;
  formaPago?: string;
  estado?: string;
  fechaDesde?: Date;
  fechaHasta?: Date;
}

export interface SurtidorFilter {
  estado?: string;
  ubicacion?: string;
  tipoGasolina?: string;
}

// ========== CÁLCULO DE COSTOS ==========
export interface CalculoCosto {
  tipoGasolina: string;
  litros: number;
  precioLitro: number;
  subtotal: number;
  impuestos: number;
  descuentos: number;
  total: number;
}
