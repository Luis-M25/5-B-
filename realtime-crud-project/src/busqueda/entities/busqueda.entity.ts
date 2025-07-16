import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Lugarturistico } from '../../lugarturistico/entities/lugarturistico.entity';

@Entity()
export class Busqueda {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  terminoBusqueda: string;

  @Column({ length: 100, nullable: true })
  categoria: string;

  @Column('decimal', { precision: 10, scale: 8, nullable: true })
  latitudBusqueda: number;

  @Column('decimal', { precision: 11, scale: 8, nullable: true })
  longitudBusqueda: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  radioKm: number;

  @Column({ length: 100, nullable: true })
  usuarioIp: string;

  @Column('int', { default: 0 })
  cantidadResultados: number;

  @CreateDateColumn()
  fechaBusqueda: Date;

  @ManyToOne(() => Lugarturistico, lugarTuristico => lugarTuristico.busquedas, { nullable: true })
  lugarTuristico: Lugarturistico;
}
