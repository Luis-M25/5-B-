import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateTemporadaInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @Field()
  @IsNotEmpty()
  fechaInicio: Date;

  @Field()
  @IsNotEmpty()
  fechaFin: Date;
}
