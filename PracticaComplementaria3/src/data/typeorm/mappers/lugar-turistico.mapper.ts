import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { LugarTuristicoEntity } from '../../../domain/entities/lugar-turistico.entity';
import { ValoracionTypeOrm } from './valoracion.mapper';

@Entity('lugar_turistico')
export class LugarTuristicoTypeOrm {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('varchar')
    nombre!: string;

    @Column('text')
    descripcion!: string;

    @Column('varchar')
    ubicacion!: string;

    @Column('varchar')
    categoria!: string;

    @Column('boolean', { default: true })
    activo!: boolean;

    @CreateDateColumn()
    fechaCreacion!: Date;

    @OneToMany(() => ValoracionTypeOrm, valoracion => valoracion.lugarTuristico)
    valoraciones?: ValoracionTypeOrm[];

    toDomain(): LugarTuristicoEntity {
        return LugarTuristicoEntity.fromObject({
            id: this.id,
            nombre: this.nombre,
            descripcion: this.descripcion,
            ubicacion: this.ubicacion,
            categoria: this.categoria,
            activo: this.activo,
            fechaCreacion: this.fechaCreacion
        });
    }

    static fromDomain(lugarTuristico: LugarTuristicoEntity): LugarTuristicoTypeOrm {
        const lugarTuristicoTypeOrm = new LugarTuristicoTypeOrm();
        lugarTuristicoTypeOrm.id = Number(lugarTuristico.id);
        lugarTuristicoTypeOrm.nombre = lugarTuristico.nombre;
        lugarTuristicoTypeOrm.descripcion = lugarTuristico.descripcion;
        lugarTuristicoTypeOrm.ubicacion = lugarTuristico.ubicacion;
        lugarTuristicoTypeOrm.categoria = lugarTuristico.categoria;
        lugarTuristicoTypeOrm.activo = lugarTuristico.activo;
        if (lugarTuristico.fechaCreacion) {
            lugarTuristicoTypeOrm.fechaCreacion = lugarTuristico.fechaCreacion;
        }
        return lugarTuristicoTypeOrm;
    }
}
