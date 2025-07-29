import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsInt } from 'class-validator';

@InputType()
export class CreateBusquedaInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  query: string;

  @Field()
  @IsNotEmpty()
  fecha: Date;

  @Field(() => Int)
  @IsInt()
  usuarioId: number;
}
