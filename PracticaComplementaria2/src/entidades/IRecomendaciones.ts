import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Destino } from './IDestino';
import { PreferenciaTuristica } from './IPreferenciaturistica';

@Entity()
export class Recomendacion {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  titulo!: string;

  @Column({ type: 'text' })
  descripcion!: string;

  @Column({ nullable: true })
  puntuacion!: number;

  @CreateDateColumn()
  fechaCreacion!: Date;

  @ManyToOne(() => Destino, destino => destino.recomendaciones)
  destino!: Destino;

  @ManyToOne(() => PreferenciaTuristica, preferencia => preferencia.recomendaciones, { nullable: true })
  preferenciaTuristica!: PreferenciaTuristica;
}