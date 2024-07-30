/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Vehiculo } from "src/vehiculo/entities/vehiculo.entity";
@Entity()
export class Cliente {
    @PrimaryGeneratedColumn()
    id_cliente: number

    @Column()
    nombre: string

    @Column()
    apellido:string

    @Column()
    telefono:string

    @Column()
    email: string

    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    fechaIngreso: Date


    @OneToMany(()=>Vehiculo, (vehiculo)=>vehiculo)
    vehiculos: Vehiculo[]
}
