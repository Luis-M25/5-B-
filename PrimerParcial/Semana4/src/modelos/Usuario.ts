import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { vista } from "./vista";
@Entity()
export class Usuario {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    nombre!: string;
    @Column()
    correo!: string;
    @OneToMany(() => vista, (vista:vista) => vista.Usuario)
    vistas!: vista[]
}

