// empleado.entity.ts
import { Pago } from 'src/pago/entities/pago.entity';
import { Trabajo } from 'src/trabajo/entities/trabajo.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Empleado {
    @PrimaryGeneratedColumn()
    id_empleado: number;

    @Column()
    nombre: string;

    @Column()
    apellido: string;

    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    fechaIngreso: Date;

    @Column()
    telefono: string;

    @Column()
    email: string;

    @OneToMany(()=>Trabajo, (trabajo)=>trabajo.id_empleado)
    trabajos: Trabajo[]

    @OneToMany(()=>Pago, (pago)=>pago.id_empleado)
    pagos: Pago[]
}