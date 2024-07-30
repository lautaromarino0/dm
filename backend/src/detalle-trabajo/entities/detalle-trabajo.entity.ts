import { Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { Trabajo } from "src/trabajo/entities/trabajo.entity";
import { Tarea } from "src/tarea/entities/tarea.entity";

@Entity()
export class DetalleTrabajo {
    @PrimaryGeneratedColumn()
    id_detalle: number

    @Column()
    precioManoObra : number

    @Column()
    precioRepuestos : number

    @ManyToOne(()=>Trabajo, (trabajo)=>trabajo.detalles)
    id_trabajo : Trabajo
    
    @ManyToOne(()=>Tarea)
    id_tarea : Tarea
}
