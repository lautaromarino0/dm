import { IsNotEmpty, IsNumber } from "class-validator";
import { Tarea } from "src/tarea/entities/tarea.entity";

export class CreateDetalleTrabajoDto {
    @IsNumber()
    precioManoObra : number
    @IsNumber()
    precioRepuestos : number
    @IsNumber()
    @IsNotEmpty()
    id_tarea : Tarea
    id_detalle?: number
}
