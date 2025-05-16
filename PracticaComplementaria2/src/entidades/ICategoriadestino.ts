import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Destino } from './IDestino';
import { PreferenciaTuristica } from './IPreferenciaturistica';

@Entity()
export class CategoriaDestino {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column({ nullable: true })
  descripcion!: string;

  @ManyToMany(() => Destino, destino => destino.categorias)
  destinos!: Destino[];

  @ManyToMany(() => PreferenciaTuristica, preferencia => preferencia.categorias)
  preferencias!: PreferenciaTuristica[];
}