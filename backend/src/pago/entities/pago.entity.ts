import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import {Empleado} from '../../empleado/entities/empleado.entity'
import { Trabajo } from 'src/trabajo/entities/trabajo.entity';

@Entity()
export class Pago {
    @PrimaryGeneratedColumn()
    id_pago:number

    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    fechaPago: Date

    @Column()
    monto:number

    @ManyToOne(()=>Empleado, (empleado)=>empleado.pagos)
    id_empleado: Empleado

    @OneToMany(()=>Trabajo, (trabajo)=>trabajo.id_pago)
    trabajos: Trabajo[]
}
