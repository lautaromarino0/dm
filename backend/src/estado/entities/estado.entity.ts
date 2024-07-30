import { Trabajo } from 'src/trabajo/entities/trabajo.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Estado {
    @PrimaryGeneratedColumn()
    id_estado: number;

    @Column()
    nombre: string;

    @OneToMany(()=>Trabajo, (trabajo)=>trabajo.id_estado)
    trabajos: Trabajo[]
}
