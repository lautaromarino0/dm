import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import {Cobro} from '../../cobro/entities/cobro.entity'

@Entity()
export class Cheque {
    @PrimaryGeneratedColumn()
    id_cheque: number;

    @Column()
    numero: string;

    @Column()
    banco: string;

    @ManyToOne(()=>Cobro , (cobro)=>cobro.cheques)
    id_cobro: Cobro

    @Column()
    fechaRetiro: Date

    @Column()
    paguese_a: string

    @Column()
    monto:number
}