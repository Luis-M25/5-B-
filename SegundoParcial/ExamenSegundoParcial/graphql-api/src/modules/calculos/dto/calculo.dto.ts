import { InputType, ObjectType, Field, Float, Int, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';

@ObjectType()
export class CalculoResultType {
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

  @Field()
  disponible: boolean;

  @Field(() => Float)
  stockDisponible: number;

  @Field(() => Date)
  fechaCalculo: Date;
}

@ObjectType()
export class ComparacionPreciosType {
  @Field()
  tipoGasolina: string;

  @Field(() => Float)
  precioActual: number;

  @Field(() => Float)
  precioAnterior: number;

  @Field(() => Float)
  diferencia: number;

  @Field(() => Float)
  porcentajeCambio: number;

  @Field()
  tendencia: string; // 'subida', 'bajada', 'estable'
}

@InputType()
export class CalcularCostoDetalladoInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  tipoGasolina: string;

  @Field(() => Float)
  @IsNumber()
  @Min(0.1)
  litros: number;

  @Field({ nullable: true })
  surtidorId?: string;

  @Field({ nullable: true })
  clienteId?: string;

  @Field({ nullable: true })
  aplicarDescuentos?: boolean;

  @Field({ nullable: true })
  incluirImpuestos?: boolean;
}

@InputType()
export class SimulacionVentaInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  tipoGasolina: string;

  @Field(() => Float)
  @IsNumber()
  @Min(0.1)
  litros: number;

  @Field({ nullable: true })
  surtidorId?: string;

  @Field({ nullable: true })
  operadorId?: string;
}
