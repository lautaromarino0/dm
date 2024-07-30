import { DetalleTrabajo } from 'src/detalle-trabajo/entities/detalle-trabajo.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';

@Entity()
export class Tarea {
    @PrimaryGeneratedColumn()
    id_tarea: number;

    @Column()
    nombre: string;

    @Column()
    descripcion: string;

    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    fechaRegistro: Date

    @OneToMany(()=>DetalleTrabajo, (detalleTrabajo)=>detalleTrabajo.id_tarea)
    detalles: DetalleTrabajo[]
}