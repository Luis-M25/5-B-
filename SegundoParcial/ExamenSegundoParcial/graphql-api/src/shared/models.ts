import { ObjectType, Field, ID, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class Operador {
  @Field(() => ID)
  id: string;

  @Field()
  nombre: string;

  @Field()
  cedula: string;

  @Field()
  estado: string;

  @Field()
  fechaIngreso: Date;

  @Field()
  turno: string;

  @Field({ nullable: true })
  fechaCreacion?: Date;

  @Field({ nullable: true })
  fechaActualizacion?: Date;
}

@ObjectType()
export class Surtidor {
  @Field(() => ID)
  id: string;

  @Field(() => Int)
  numero: number;

  @Field()
  nombre: string;

  @Field()
  estado: string;

  @Field()
  ubicacion: string;

  @Field(() => Float)
  capacidadMaxima: number;

  @Field(() => Float)
  combustibleActual: number;

  @Field(() => [String])
  tiposGasolinaDisponibles: string[];

  @Field({ nullable: true })
  fechaCreacion?: Date;

  @Field({ nullable: true })
  fechaActualizacion?: Date;
}

@ObjectType()
export class TipoGasolina {
  @Field(() => ID)
  id: string;

  @Field()
  tipo: string;

  @Field()
  nombre: string;

  @Field(() => Int)
  octanaje: number;

  @Field()
  disponible: boolean;

  @Field(() => Float)
  stock: number;

  @Field({ nullable: true })
  fechaCreacion?: Date;

  @Field({ nullable: true })
  fechaActualizacion?: Date;
}

@ObjectType()
export class Precio {
  @Field(() => ID)
  id: string;

  @Field()
  tipoGasolina: string;

  @Field(() => Float)
  precioLitro: number;

  @Field()
  fechaActualizacion: Date;

  @Field()
  activo: boolean;

  @Field({ nullable: true })
  fechaCreacion?: Date;
}

@ObjectType()
export class FormaPago {
  @Field(() => ID)
  id: string;

  @Field()
  tipo: string;

  @Field()
  nombre: string;

  @Field()
  activo: boolean;

  @Field()
  requiereAutorizacion: boolean;

  @Field({ nullable: true })
  fechaCreacion?: Date;

  @Field({ nullable: true })
  fechaActualizacion?: Date;
}

@ObjectType()
export class Cliente {
  @Field(() => ID)
  id: string;

  @Field()
  nombre: string;

  @Field()
  cedula: string;

  @Field({ nullable: true })
  telefono?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  direccion?: string;

  @Field()
  fechaRegistro: Date;

  @Field()
  tipoCliente: string;

  @Field({ nullable: true })
  fechaCreacion?: Date;

  @Field({ nullable: true })
  fechaActualizacion?: Date;
}

@ObjectType()
export class Venta {
  @Field(() => ID)
  id: string;

  @Field()
  operadorId: string;

  @Field()
  surtidorId: string;

  @Field({ nullable: true })
  clienteId?: string;

  @Field()
  tipoGasolina: string;

  @Field(() => Float)
  litros: number;

  @Field(() => Float)
  precioLitro: number;

  @Field(() => Float)
  montoTotal: number;

  @Field()
  formaPago: string;

  @Field()
  fechaVenta: Date;

  @Field()
  estado: string;

  @Field()
  numeroRecibo: string;

  @Field({ nullable: true })
  fechaCreacion?: Date;

  @Field({ nullable: true })
  fechaActualizacion?: Date;

  // Campos relacionados
  @Field(() => Operador, { nullable: true })
  operador?: Operador;

  @Field(() => Surtidor, { nullable: true })
  surtidor?: Surtidor;

  @Field(() => Cliente, { nullable: true })
  cliente?: Cliente;
}

@ObjectType()
export class CalculoCosto {
  @Field()
  tipoGasolina: string;

  @Field(() => Float)
  litros: number;

  @Field(() => Float)
  precioLitro: number;

  @Field(() => Float)
  subtotal: number;

  @Field(() => Float)
  impuestos: number;

  @Field(() => Float)
  descuentos: number;

  @Field(() => Float)
  total: number;
}

@ObjectType()
export class PaginatedVentas {
  @Field(() => [Venta])
  items: Venta[];

  @Field(() => Int)
  total: number;

  @Field(() => Int)
  page: number;

  @Field(() => Int)
  limit: number;

  @Field(() => Int)
  totalPages: number;
}

@ObjectType()
export class Estadisticas {
  @Field(() => Int)
  ventasHoy: number;

  @Field(() => Float)
  totalVentasHoy: number;

  @Field(() => Float)
  totalLitrosHoy: number;

  @Field(() => Int)
  surtidoresDisponibles: number;

  @Field(() => Int)
  surtidoresTotal: number;

  @Field(() => Int)
  operadoresActivos: number;

  @Field(() => Int)
  clientesRegistrados: number;
}

@ObjectType()
export class Dashboard {
  @Field(() => Int)
  ventasHoy: number;

  @Field(() => Float)
  totalVentasHoy: number;

  @Field(() => Float)
  totalLitrosHoy: number;

  @Field(() => Int)
  surtidoresDisponibles: number;

  @Field(() => Int)
  surtidoresTotal: number;

  @Field(() => Int)
  operadoresActivos: number;

  @Field(() => Int)
  clientesRegistrados: number;

  @Field(() => [Precio])
  preciosActivos: Precio[];

  @Field()
  ultimaActualizacion: Date;
}
