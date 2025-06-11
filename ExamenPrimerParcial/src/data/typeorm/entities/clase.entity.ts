import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('clases')
export class Clase {
  
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  nombre!: string;

  @Column({ type: 'text', nullable: true })
  descripcion?: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  horario!: string;

  @Column({ type: 'int', nullable: false })
  cupoMaximo!: number;

  @Column({ type: 'uuid', nullable: false })
  instructorId!: string;

  @CreateDateColumn({ type: 'timestamp' })
  fechaCreacion!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  fechaActualizacion!: Date;
}