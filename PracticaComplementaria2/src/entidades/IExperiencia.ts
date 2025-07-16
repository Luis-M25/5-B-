import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Destino } from './IDestino';

@Entity()
export class Experiencia {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  titulo!: string;

  @Column({ type: 'text' })
  descripcion!: string;

  @Column({ type: 'int' })
  calificacion!: number;

  @Column({ nullable: true })
  imagenUrl!: string;

  @CreateDateColumn()
  fechaCreacion!: Date;

  @Column({ nullable: true })
  nombreUsuario!: string;

  @ManyToOne(() => Destino, destino => destino.experiencias)
  destino!: Destino;
}
