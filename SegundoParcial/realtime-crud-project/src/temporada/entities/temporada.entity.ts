import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Temporada {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column('text', { nullable: true })
  descripcion: string;

  @Column('date')
  fechaInicio: Date;

  @Column('date')
  fechaFin: Date;

  @Column('decimal', { precision: 5, scale: 2 })
  multiplicadorPrecio: number; // 1.0 = precio normal, 1.5 = 50% más caro

  @Column({ default: true })
  activo: boolean;

  @CreateDateColumn()
  fechaCreacion: Date;

  @UpdateDateColumn()
  fechaActualizacion: Date;
}
