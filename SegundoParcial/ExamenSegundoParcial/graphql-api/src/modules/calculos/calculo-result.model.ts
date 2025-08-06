import { ObjectType, Field, Float } from '@nestjs/graphql';

@ObjectType()
export class CalculoResultType {
  @Field()
  tipoGasolina: string;

  @Field(() => Float)
  litros: number;

  @Field(() => Float)
  precioLitro: number;

  @Field(() => Float)
  total: number;

  @Field()
  fechaCalculo: string;
}
