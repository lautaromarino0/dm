import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import {Cliente} from '../../cliente/entities/cliente.entity'
import {Modelo} from '../../modelo/entities/modelo.entity'
import { Trabajo } from "src/trabajo/entities/trabajo.entity";


@Entity()
export class Vehiculo {
    @PrimaryGeneratedColumn()
    id_vehiculo: number

    @Column()
    año: number

    @Column({nullable: true})
    patente: string

    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    fechaIngreso: Date

    @ManyToOne(()=>Modelo, (modelo)=>modelo.vehiculos)
    @JoinColumn({ name: 'id_modelo' })
    id_modelo: Modelo

    @ManyToOne(()=> Cliente, (cliente)=>cliente.vehiculos)
    @JoinColumn({ name: 'id_cliente' })
    id_cliente : Cliente

    @OneToMany(()=>Trabajo, (trabajo)=>trabajo.id_vehiculo)
    trabajos: Trabajo[]

}