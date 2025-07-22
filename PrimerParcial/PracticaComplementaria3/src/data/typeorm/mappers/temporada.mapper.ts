import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { TemporadaEntity } from '../../../domain/entities/temporada.entity';

@Entity('temporada')
export class TemporadaTypeOrm {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('varchar')
    nombre!: string;

    @Column('date')
    fechaInicio!: Date;

    @Column('date')
    fechaFin!: Date;

    @Column('text', { nullable: true })
    descripcion?: string;

    // Método para convertir de TypeORM a Entidad de Dominio
    toDomain(): TemporadaEntity {
        return TemporadaEntity.fromObject({
            id: this.id,
            nombre: this.nombre,
            fechaInicio: this.fechaInicio,
            fechaFin: this.fechaFin,
            descripcion: this.descripcion
        });
    }

    // Método para convertir de Entidad de Dominio a TypeORM
    static fromDomain(temporada: TemporadaEntity): TemporadaTypeOrm {
        const temporadaTypeOrm = new TemporadaTypeOrm();
        temporadaTypeOrm.id = temporada.id;
        temporadaTypeOrm.nombre = temporada.nombre;
        temporadaTypeOrm.fechaInicio = temporada.fechaInicio;
        temporadaTypeOrm.fechaFin = temporada.fechaFin;
        temporadaTypeOrm.descripcion = temporada.descripcion;
        return temporadaTypeOrm;
    }
}
