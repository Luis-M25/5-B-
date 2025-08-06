import { InputType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsString, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateValoracionInput {
  @Field(() => Int)
  @IsInt()
  puntuacion: number;

  @Field()
  @IsString()
  comentario: string;

  @Field(() => Int)
  @IsInt()
  usuarioId: number;

  @Field(() => Int)
  @IsInt()
  lugarTuristicoId: number;
}
