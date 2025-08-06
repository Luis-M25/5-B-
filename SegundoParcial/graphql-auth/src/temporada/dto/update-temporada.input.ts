import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateTemporadaInput } from './create-temporada.input';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateTemporadaInput extends PartialType(CreateTemporadaInput) {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  nombre?: string;

  @Field({ nullable: true })
  @IsOptional()
  fechaInicio?: Date;

  @Field({ nullable: true })
  @IsOptional()
  fechaFin?: Date;
}
