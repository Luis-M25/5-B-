import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsInt } from 'class-validator';

@InputType()
export class CreateLugarTuristicoInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @Field()
  @IsString()
  descripcion: string;

  @Field()
  @IsString()
  ubicacion: string;

  @Field(() => Int)
  @IsInt()
  temporadaId: number;
}
