import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateVentaInput } from './create-venta.input';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateVentaInput extends PartialType(CreateVentaInput) {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  estado?: 'pendiente' | 'completada' | 'cancelada';
}
