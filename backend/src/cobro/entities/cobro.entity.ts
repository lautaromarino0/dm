// cobro.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import {Trabajo} from '../../trabajo/entities/trabajo.entity'
import { Cheque } from 'src/cheque/entities/cheque.entity';

@Entity()
export class Cobro {
    @PrimaryGeneratedColumn()
    id_cobro: number;

    @Column()
    monto: number;

    @ManyToOne(()=>Trabajo, (trabajo)=>trabajo.cobros)
    id_trabajo: Trabajo

    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    fechaCobro: Date

    @OneToMany(()=>Cheque, (cheque)=>cheque.id_cobro,{cascade: true,nullable:true})
    cheques: Cheque[]
}