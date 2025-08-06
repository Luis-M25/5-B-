import { InputType, Field, Int, Float } from '@nestjs/graphql';

@InputType()
export class CreateOperadorInput {
  @Field()
  nombre: string;

  @Field()
  cedula: string;

  @Field()
  estado: string;

  @Field()
  fechaIngreso: string;

  @Field()
  turno: string;
}

@InputType()
export class UpdateOperadorInput {
  @Field({ nullable: true })
  nombre?: string;

  @Field({ nullable: true })
  cedula?: string;

  @Field({ nullable: true })
  estado?: string;

  @Field({ nullable: true })
  turno?: string;
}

@InputType()
export class CreateSurtidorInput {
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
}

@InputType()
export class UpdateSurtidorInput {
  @Field({ nullable: true })
  nombre?: string;

  @Field({ nullable: true })
  estado?: string;

  @Field({ nullable: true })
  ubicacion?: string;

  @Field(() => Float, { nullable: true })
  capacidadMaxima?: number;

  @Field(() => Float, { nullable: true })
  combustibleActual?: number;

  @Field(() => [String], { nullable: true })
  tiposGasolinaDisponibles?: string[];
}

@InputType()
export class CreateClienteInput {
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
  tipoCliente: string;
}

@InputType()
export class CreateVentaInput {
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

  @Field()
  formaPago: string;
}

@InputType()
export class UpdateVentaInput {
  @Field({ nullable: true })
  estado?: string;
}

@InputType()
export class CalcularCostoInput {
  @Field()
  tipoGasolina: string;

  @Field(() => Float)
  litros: number;
}

@InputType()
export class VentaFilterInput {
  @Field({ nullable: true })
  operadorId?: string;

  @Field({ nullable: true })
  surtidorId?: string;

  @Field({ nullable: true })
  clienteId?: string;

  @Field({ nullable: true })
  tipoGasolina?: string;

  @Field({ nullable: true })
  formaPago?: string;

  @Field({ nullable: true })
  estado?: string;

  @Field({ nullable: true })
  fechaDesde?: string;

  @Field({ nullable: true })
  fechaHasta?: string;
}

@InputType()
export class SurtidorFilterInput {
  @Field({ nullable: true })
  estado?: string;

  @Field({ nullable: true })
  ubicacion?: string;

  @Field({ nullable: true })
  tipoGasolina?: string;
}

@InputType()
export class PaginationInput {
  @Field(() => Int, { nullable: true, defaultValue: 1 })
  page?: number;

  @Field(() => Int, { nullable: true, defaultValue: 10 })
  limit?: number;
}

@InputType()
export class UpdatePrecioInput {
  @Field(() => Float)
  precioLitro: number;

  @Field({ nullable: true })
  activo?: boolean;
}
