import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Busqueda {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  termino: string;

  @Column({ type: 'varchar', length: 100 })
  ubicacion: string;

  @Column({ type: 'varchar', length: 50 })
  categoria: string;

  @Column({ type: 'date', nullable: true })
  fechaInicio: Date;

  @Column({ type: 'date', nullable: true })
  fechaFin: Date;

  @Column({ type: 'int', default: 0 })
  resultados: number;

  @CreateDateColumn()
  fechaCreacion: Date;

  @UpdateDateColumn()
  fechaActualizacion: Date;
}
