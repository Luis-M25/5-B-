import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, JoinTable } from 'typeorm';
import { CategoriaDestino } from './ICategoriadestino';
import { Recomendacion } from './IRecomendaciones';

@Entity()
export class PreferenciaTuristica {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column({ nullable: true })
  descripcion!: string;

  @Column({ nullable: true })
  nivelInteres!: number;

  @ManyToMany(() => CategoriaDestino, categoria => categoria.preferencias)
  @JoinTable({ name: 'preferencia_categoria' })
  categorias!: CategoriaDestino[];

  @OneToMany(() => Recomendacion, recomendacion => recomendacion.preferenciaTuristica)
  recomendaciones!: Recomendacion[];
}