import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, JoinTable } from 'typeorm';
import { CategoriaDestino } from './ICategoriadestino';
import { Experiencia } from './IExperiencia';
import { Recomendacion } from './IRecomendaciones';

@Entity()
export class Destino {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column()
  ubicacion!: string;
  
  @Column({ type: 'text' })
  descripcion!: string;
  
  @Column({ type: 'decimal', precision: 9, scale: 6, nullable: true })
  latitud!: number;
  
  @Column({ type: 'decimal', precision: 9, scale: 6, nullable: true })
  longitud!: number;

  @Column({ nullable: true })
  imagenUrl!: string;

  @ManyToMany(() => CategoriaDestino, categoria => categoria.destinos)
  @JoinTable({ name: 'destino_categoria' })
  categorias!: CategoriaDestino[];

  @OneToMany(() => Experiencia, experiencia => experiencia.destino)
  experiencias!: Experiencia[];

  @OneToMany(() => Recomendacion, recomendacion => recomendacion.destino)
  recomendaciones!: Recomendacion[];
}
