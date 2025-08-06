import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Busqueda {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  query: string;

  @Field()
  @Column()
  fecha: Date;

  @Field(() => Int)
  @Column()
  usuarioId: number;
}
