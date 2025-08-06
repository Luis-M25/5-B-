import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class EstadisticasType {
  @Field(() => Int)
  totalVentas: number;

  @Field(() => Float)
  ingresosTotales: number;

  @Field(() => Float)
  litrosTotales: number;

  @Field(() => Float)
  promedioVentaPorLitro: number;

  @Field(() => Int)
  surtidoresActivos: number;

  @Field(() => Int)
  operadoresActivos: number;

  @Field()
  fechaConsulta: string;

  @Field({ nullable: true })
  operadorId?: string;

  @Field({ nullable: true })
  surtidorId?: string;

  @Field({ nullable: true })
  fechaFiltro?: string;
}
