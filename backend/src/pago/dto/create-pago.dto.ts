import { IsArray, IsNotEmpty, IsNumber } from "class-validator";
import { Empleado } from "src/empleado/entities/empleado.entity";
import { Trabajo } from "src/trabajo/entities/trabajo.entity";

export class CreatePagoDto {
    @IsNumber()
    monto: number;
    @IsNumber()
    id_empleado: Empleado;
    @IsArray()
    @IsNotEmpty()
    trabajos: Trabajo[];
}
