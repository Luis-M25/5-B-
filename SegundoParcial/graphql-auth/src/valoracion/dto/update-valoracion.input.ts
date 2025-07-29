import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateValoracionInput } from './create-valoracion.input';
import { IsOptional, IsInt, IsString } from 'class-validator';

@InputType()
export class UpdateValoracionInput extends PartialType(CreateValoracionInput) {
  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  puntuacion?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  comentario?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  usuarioId?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  lugarTuristicoId?: number;
}
