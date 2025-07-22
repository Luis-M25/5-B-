import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ValoracionEntity } from '../../../domain/entities/valoracion.entity';
import { LugarTuristicoTypeOrm } from './lugar-turistico.mapper';

@Entity('valoracion')
export class ValoracionTypeOrm {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('int')
    puntuacion!: number;

    @Column('text')
    comentario!: string;

    @CreateDateColumn()
    fechaValoracion!: Date;

    @Column('int')
    lugarTuristicoId!: number;

    @Column('int', { nullable: true })
    usuarioId?: number;

    @ManyToOne(() => LugarTuristicoTypeOrm)
    @JoinColumn({ name: 'lugarTuristicoId' })
    lugarTuristico?: LugarTuristicoTypeOrm;

    // Método para convertir de TypeORM a Entidad de Dominio
    toDomain(): ValoracionEntity {
        return ValoracionEntity.fromObject({
            id: this.id,
            puntuacion: this.puntuacion,
            comentario: this.comentario,
            fechaValoracion: this.fechaValoracion,
            lugarTuristicoId: this.lugarTuristicoId,
            usuarioId: this.usuarioId
        });
    }

    // Método para convertir de Entidad de Dominio a TypeORM
    static fromDomain(valoracion: ValoracionEntity): ValoracionTypeOrm {
        const valoracionTypeOrm = new ValoracionTypeOrm();
        valoracionTypeOrm.id = valoracion.id;
        valoracionTypeOrm.puntuacion = valoracion.puntuacion;
        valoracionTypeOrm.comentario = valoracion.comentario;
        valoracionTypeOrm.fechaValoracion = valoracion.fechaValoracion;
        valoracionTypeOrm.lugarTuristicoId = valoracion.lugarTuristicoId;
        valoracionTypeOrm.usuarioId = valoracion.usuarioId;
        return valoracionTypeOrm;
    }
}
