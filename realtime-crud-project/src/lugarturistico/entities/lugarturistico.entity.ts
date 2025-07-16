import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Valoracion } from '../../valoracion/entities/valoracion.entity';
import { Busqueda } from '../../busqueda/entities/busqueda.entity';

@Entity()
export class Lugarturistico {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  nombre: string;

  @Column('text')
  descripcion: string;

  @Column({ length: 300 })
  ubicacion: string;

  @Column('decimal', { precision: 10, scale: 8 })
  latitud: number;

  @Column('decimal', { precision: 11, scale: 8 })
  longitud: number;

  @Column({ length: 100 })
  categoria: string; // playa, montaña, ciudad, museo, etc.

  @Column('decimal', { precision: 10, scale: 2 })
  precioPromedio: number;

  @Column({ length: 500, nullable: true })
  imagenUrl: string;

  @Column('text', { nullable: true })
  horarios: string;

  @Column('text', { nullable: true })
  contacto: string;

  @Column({ default: true })
  activo: boolean;

  @CreateDateColumn()
  fechaCreacion: Date;

  @UpdateDateColumn()
  fechaActualizacion: Date;

  @OneToMany(() => Valoracion, valoracion => valoracion.lugarTuristico)
  valoraciones: Valoracion[];

  @OneToMany(() => Busqueda, busqueda => busqueda.lugarTuristico)
  busquedas: Busqueda[];
}
