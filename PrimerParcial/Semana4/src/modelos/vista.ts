import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./Usuario";

@Entity()
export class vista {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    nombre!: string;
    @ManyToOne (() => Usuario, (Usuario:Usuario) => Usuario.vistas)
        Usuario!: Usuario
}

