import { ObjectType, Field, ID, Float, Int } from '@nestjs/graphql';
import { Venta as VentaInterface } from '../../../shared/interfaces';

@ObjectType()
export class VentaType implements VentaInterface {
  @Field(() => ID)
  id: string;

  @Field()
  operadorId: string;

  @Field()
  surtidorId: string;

  @Field({ nullable: true })
  clienteId?: string;

  @Field()
  tipoGasolina: string;

  @Field(() => Float)
  litros: number;

  @Field(() => Float)
  precioLitro: number;

  @Field(() => Float)
  montoTotal: number;

  @Field()
  formaPago: string;

  @Field()
  fechaVenta: Date;

  @Field({ defaultValue: 'pendiente' })
  estado: 'pendiente' | 'procesando' | 'completada' | 'cancelada' | 'error';

  @Field()
  numeroRecibo: string;

  @Field()
  fechaCreacion: Date;

  @Field({ nullable: true })
  fechaActualizacion?: Date;
}

export { VentaInterface as Venta };
