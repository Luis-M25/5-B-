import { InputType, ObjectType, Field, Float, Int, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsNumber, IsBoolean, Min } from 'class-validator';

@ObjectType()
export class TipoGasolinaType {
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

  @Field(() => Float)
  precioActual: number;

  @Field(() => Date)
  fechaActualizacion: Date;
}

@ObjectType()
export class CalculoCostoType {
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
}

@InputType()
export class CalcularCostoInput {
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
  aplicarDescuentos?: boolean;
}

@InputType()
export class FiltroTiposGasolinaInput {
  @Field({ nullable: true })
  disponible?: boolean;

  @Field({ nullable: true })
  tipoGasolina?: string;

  @Field(() => Float, { nullable: true })
  stockMinimo?: number;
}
