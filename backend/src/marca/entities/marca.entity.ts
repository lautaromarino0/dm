import { Modelo } from "src/modelo/entities/modelo.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity()
export class Marca {
    @PrimaryGeneratedColumn()
    id_marca: number

    @Column()
    nombre: string

    @OneToMany(()=>Modelo, (modelo)=>modelo.marca)
    modelos: Modelo[]
}
