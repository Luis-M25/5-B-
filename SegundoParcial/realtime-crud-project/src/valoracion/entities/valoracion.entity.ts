import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Lugarturistico } from '../../lugarturistico/entities/lugarturistico.entity';

@Entity()
export class Valoracion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombreUsuario: string;

  @Column({ length: 200, nullable: true })
  emailUsuario: string;

  @Column('int')
  calificacion: number; // 1-5

  @Column('text', { nullable: true })
  comentario: string;

  @Column('date')
  fechaVisita: Date;

  @Column({ default: true })
  activo: boolean;

  @CreateDateColumn()
  fechaCreacion: Date;

  @UpdateDateColumn()
  fechaActualizacion: Date;

  @ManyToOne(() => Lugarturistico, lugarTuristico => lugarTuristico.valoraciones)
  lugarTuristico: Lugarturistico;
}
