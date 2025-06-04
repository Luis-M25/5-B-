import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { BusquedaEntity } from '../../../domain/entities/busqueda.entity';

@Entity('busqueda')
export class BusquedaTypeOrm {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('varchar')
    termino!: string;

    @CreateDateColumn()
    fechaBusqueda!: Date;

    @Column('int', { nullable: true })
    usuarioId?: number;

    // Método para convertir de TypeORM a Entidad de Dominio
    toDomain(): BusquedaEntity {
        return BusquedaEntity.fromObject({
            id: this.id,
            termino: this.termino,
            fechaBusqueda: this.fechaBusqueda,
            usuarioId: this.usuarioId
        });
    }

    // Método para convertir de Entidad de Dominio a TypeORM
    static fromDomain(busqueda: BusquedaEntity): BusquedaTypeOrm {
        const busquedaTypeOrm = new BusquedaTypeOrm();
        busquedaTypeOrm.id = Number(busqueda.id);
        busquedaTypeOrm.termino = busqueda.termino;
        busquedaTypeOrm.fechaBusqueda = busqueda.fechaBusqueda;
        busquedaTypeOrm.usuarioId = busqueda.usuarioId ? Number(busqueda.usuarioId) : undefined;
        return busquedaTypeOrm;
    }
}
