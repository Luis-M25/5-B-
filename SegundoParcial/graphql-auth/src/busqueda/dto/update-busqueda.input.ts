import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateBusquedaInput } from './create-busqueda.input';
import { IsOptional, IsString, IsInt } from 'class-validator';

@InputType()
export class UpdateBusquedaInput extends PartialType(CreateBusquedaInput) {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  query?: string;

  @Field({ nullable: true })
  @IsOptional()
  fecha?: Date;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  usuarioId?: number;
}
