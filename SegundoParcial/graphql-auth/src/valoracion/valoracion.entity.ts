import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Valoracion {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column()
  puntuacion: number;

  @Field()
  @Column()
  comentario: string;

  @Field(() => Int)
  @Column()
  usuarioId: number;

  @Field(() => Int)
  @Column()
  lugarTuristicoId: number;
}
