import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import {Empleado} from '../../empleado/entities/empleado.entity'
import { Pago } from 'src/pago/entities/pago.entity';
import { Cobro } from 'src/cobro/entities/cobro.entity';
import { Vehiculo } from 'src/vehiculo/entities/vehiculo.entity';
import { Estado } from 'src/estado/entities/estado.entity';
import { DetalleTrabajo } from 'src/detalle-trabajo/entities/detalle-trabajo.entity';

@Entity()
export class Trabajo {
    @PrimaryGeneratedColumn()
    id_trabajo: number

    @ManyToOne(()=>Empleado, (empleado)=>empleado.trabajos)
    id_empleado: Empleado

    @ManyToOne(()=>Pago,  (pago)=>pago.trabajos)
    id_pago:Pago

    @ManyToOne(()=>Vehiculo, (vehiculo)=>vehiculo.trabajos)
    @JoinColumn({ name: 'vehiculo' })
    id_vehiculo: Vehiculo   

    @Column({nullable: true})
    kilometraje: string
    
    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    fechaIngreso: Date

    @OneToMany(()=>Cobro, (cobro)=>cobro.id_trabajo)
    cobros: Cobro[]

    @OneToMany(() => DetalleTrabajo, (detalleTrabajo) => detalleTrabajo.id_trabajo, { cascade: ['remove'] })
    detalles: DetalleTrabajo[]

    @ManyToOne(()=>Estado, (estado)=>estado.trabajos)
    id_estado: Estado
    @Column({nullable: true})
    total: number

    @Column({ default: 0 })
    totalEntregado: number
}
