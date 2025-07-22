import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Temporada {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ type: 'date' })
  fechaInicio: Date;

  @Column({ type: 'date' })
  fechaFin: Date;

  @Column({ type: 'varchar', length: 50 })
  tipo: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  factorPrecio: number;

  @Column({ type: 'varchar', length: 20, default: 'activa' })
  estado: string;

  @Column({ type: 'int', default: 0 })
  popularidad: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  clima: string;

  @CreateDateColumn()
  fechaCreacion: Date;

  @UpdateDateColumn()
  fechaActualizacion: Date;
}
