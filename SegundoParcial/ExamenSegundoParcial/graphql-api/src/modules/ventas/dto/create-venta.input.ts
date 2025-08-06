import { InputType, Field, Float } from '@nestjs/graphql';
import { IsString, IsNumber, IsOptional, Min } from 'class-validator';

@InputType()
export class CreateVentaInput {
  @Field()
  @IsString()
  operadorId: string;

  @Field()
  @IsString()
  surtidorId: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  clienteId?: string;

  @Field()
  @IsString()
  tipoGasolina: string;

  @Field(() => Float)
  @IsNumber()
  @Min(0.1)
  litros: number;

  @Field()
  @IsString()
  formaPago: string;
}
