import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import {Marca} from '../../marca/entities/marca.entity'
import { Vehiculo } from "src/vehiculo/entities/vehiculo.entity";

@Entity()
export class Modelo {
    @PrimaryGeneratedColumn()
    id_modelo: number

    @Column()
    nombre:string

    @ManyToOne(()=>Marca, (marca)=>marca.modelos)
    marca : Marca
    
    @OneToMany(()=>Vehiculo, (vehiculo)=>vehiculo.id_modelo)
    vehiculos: Vehiculo[]
}
