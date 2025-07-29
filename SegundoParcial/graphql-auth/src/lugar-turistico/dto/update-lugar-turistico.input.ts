import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateLugarTuristicoInput } from './create-lugar-turistico.input';
import { IsOptional, IsString, IsInt } from 'class-validator';

@InputType()
export class UpdateLugarTuristicoInput extends PartialType(CreateLugarTuristicoInput) {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  nombre?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  ubicacion?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  temporadaId?: number;
}
